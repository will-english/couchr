import React from 'react';
import { useState } from 'react';
import { useToken } from './auth_provider';

export default function Signup() {
    const funcs = useToken();
    const signup = funcs[3];
    const createLists = funcs[6];

    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault()
        console.log('signup try')
        // setErrors(validation(values))
        // console.log('login inside', login)
       
        await signup(username, password, email, firstName, lastName, createLists);

        };
    
    
    
    
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit} id="create-location-form">
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setUsername(e.target.value)} placeholder="username" required type="text" name="username" id="username" className="form-control" />
                            <label htmlFor="username">username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setPassword(e.target.value)} placeholder="password" required type="text" name="password" id="password" className="form-control" />
                            <label htmlFor="password">password</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setEmail(e.target.value)} placeholder="email" required type="text" name="email" id="email" className="form-control" />
                            <label htmlFor="email">email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setFirstName(e.target.value)} placeholder="firstName" required type="text" name="firstName" id="firstName" className="form-control" />
                            <label htmlFor="firstName">first name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={(e) => setLastName(e.target.value)} placeholder="lastName" required type="text" name="lastName" id="lastName" className="form-control" />
                            <label htmlFor="lastName">last name</label>
                        </div>
                        <button className="btn btn-primary submitButton" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
