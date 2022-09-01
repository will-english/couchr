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
            const cleared = {
                name: '',
                description: '',
                movie_id: 1,
            };
            setInput(cleared);
        }
    }

    return (
        <>
            <button type="button" className="btn dropdown_list_button" data-bs-toggle="modal" data-bs-target="#reviewForm">
                + New review
            </button>
            <div className="modal fade create_list_form" id="reviewForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New List</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">name</label>
                                    <input onChange={handleInput} value={input.name} type="text" className="form-control" name="name" placeholder="name"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description">description</label>
                                    <input onChange={handleInput} value={input.description} type="text" className="form-control" name="description" placeholder="description"/>
                                </div>
                                <button type="button" className="btn btn-danger create_list_form_close_button" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary" data-bs-dismiss="modal">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewReviewForm;