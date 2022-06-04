import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    useEffect(() => {
        fetch(`http://localhost:5000/user/${id}`)
            .then(res => res.json())
            .then(data => setUser(data))
    }, [id]);

    // eslint-disable-next-line no-unused-vars
    const handleUpdatedUser = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const updatedUser = { name, email };

        // send data to the server 
        const url = `http://localhost:5000/user/${id}`
        fetch(url,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log('success',data);
            alert('updated user successfully!!!');
            event.target.reset();
            if (data.modifiedCount > 0) {
                console.log('updated');
                setUser(updatedUser);
            }
        })
    }
        return (
            <div>
                <h2>Updating User: {user.name}</h2>
                <form onSubmit={handleUpdatedUser}>
                    <input type="text" name='name' placeholder='Name' required/>
                    <br />
                    <input type="email" name='email' placeholder='Email' required/>
                    <br />
                    <input type="submit" value="Update User" />
                </form>
            </div>
        );
    }

export default UpdateUser;