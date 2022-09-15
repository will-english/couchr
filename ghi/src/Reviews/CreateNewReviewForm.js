import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAuthContext } from '../auth/auth_provider';


function NewReviewForm(props) {
    // props coming from DetailMiddleArea.js

    // get token and userName from Auth Context
    const { token, userName } = useAuthContext();
    const [state, setState] = useState({
        // review detail
        title: '',
        description: '',
    })
    

    // automatically changes state when typing in modal form
    function handleChange(event) {
        const value = event.target.value
        setState({...state, [event.target.name]: value})
    }

    // call POST method for reviews
    async function handleSubmit(e) {
        e.preventDefault()

        const body = {
            ...state,
            movie_title: props.movie.title,
            api_id: props.movie.id,
            poster: props.movie.poster_path,
        }

        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/reviews/user/${userName}/`;
        const fetchConfig = {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(
            url,
            fetchConfig,
        )
        const data = await response.json()
        
        if (response.ok) {
            console.log("response ok")
            setState(data)
            const cleared = {
                name: '',
                description: '',
            };
            setState(cleared);
        }
    }

    return (
        <>
            <div className="modal fade create_list_form" id="reviewForm" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">New Review</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="col-form-label">Title</label>
                                    <input onChange={handleChange} value={state.title} type="text" className="form-control" name="title" placeholder="Title"/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description">Description</label>
                                    <textarea onChange={handleChange} value={state.description} type="text" className="form-control" name="description" placeholder="Description" rows="10"></textarea>
                                </div>
                                <button type="button" className="btn btn-danger create_list_form_close_button" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-primary create_list_form_create_button" data-bs-dismiss="modal">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewReviewForm;