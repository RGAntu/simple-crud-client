import React from 'react';
import { useLoaderData } from 'react-router';
import './Users'

const UpdateUser = () => {
    const user = useLoaderData();
    const handleUpdateUser = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const updatedUser = {name, email}
        console.log(updatedUser)

        // update user info in the db
        fetch(`http://localhost:3000/users/${user._id}`,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data.modifiedCount){
                console.log('update done', data)
            }
        })
    }
    return (
        <div>
            <form onSubmit={handleUpdateUser}>
                <input className='input-box' type="text" name="name" defaultValue={user.name}  /> <br />
                <input className='input-box' type="email" name="email" defaultValue={user.email}/><br />
                <input type="submit" value="Update User" />
            </form>
        </div>
    );
};

export default UpdateUser;