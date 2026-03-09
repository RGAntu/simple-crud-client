import React, { use, useState } from "react";
import { Link } from "react-router";
import "./Users.css";

const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);

  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };
    console.log(newUser);

    // create user in the db
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data after creating user in the db", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUsers(newUsers);
          alert("Users added successfully.");
          e.target.reset();
        }
      });
  };
  const handleUserDelete = (id) => {
    console.log("Delete user", id);

    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingUsers = users.filter((user) => user._id !== id);
          setUsers(remainingUsers);
          console.log("After Delete", data);
        }
      });
  };

  return (
    <div>
      {/* add user */}
      <div>
        <h4>Users: {users.length}</h4>
        <form onSubmit={handleAddUser}>
          <input className="input-box" type="text" name="name" placeholder="name" />
          <br />
          <input className="input-box" type="email" name="email" placeholder="email" />
          <br />
          <input type="submit" value="Add User" />
        </form>
      </div>
      {/* view users  */}
      <div style={{ textAlign: "left" }}>
        {users.map((user) => (
          <p className="box" key={user._id}>
            {" "}
            Name: {user.name} <br /> Email: {user.email} <br />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                margin: "20px 0 0 0",
              }}
            >
              <Link to={`/users/${user._id}`}>Details</Link>
              <Link to={`/update/${user._id}`}>Edit</Link>
              <button onClick={() => handleUserDelete(user._id)}>X</button>
            </div>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
