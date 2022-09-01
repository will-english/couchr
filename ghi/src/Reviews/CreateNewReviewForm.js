import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../auth/auth_provider';

function NewReviewForm() {
    // get token and userName from Auth Context
    const { token, userName } = useAuthContext();
    const [input, setInput] = useState({
        name: '',
        description: '',
        movie_id: 1,
    })

    function handleInput(e) {
        setInput({...input, [e.target.name]:e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/reviews/${userName}/`;
        const response = await fetch(
            url, {
            method: 'POST',
            body: JSON.stringify(input),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
        
        if (response.ok) {
            console.log("response ok")
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">name</label>
                    <input onChange={handleInput} value={input.name} type="text" className="form-control" name="name" placeholder="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">description</label>
                    <input onChange={handleInput} value={input.description} type="text" className="form-control" name="description" placeholder="description"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default NewReviewForm;