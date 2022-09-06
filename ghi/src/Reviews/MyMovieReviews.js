import React from 'react'
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import NewReviewForm from './CreateNewReviewForm';


export default function MyMovieReviews() {
    const [input, setInput] = useState({
        name: '',
        email: '',
        book: '',
    })

    function handleInput(e) {
        setInput({...input, [e.target.name]:e.target.value})
    }

    function handleSubmit(e) {
        return
    }

    return (
        <>  
            <NewReviewForm/>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="col-form-label">name</label>
                    <input onChange={handleInput} value={input.name} type="text" className="form-control" name="name" placeholder="name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description">email</label>
                    <input onChange={handleInput} value={input.email} type="text" className="form-control" name="email" placeholder="email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description">book</label>
                    <input onChange={handleInput} value={input.book} type="text" className="form-control" name="book" placeholder="book"/>
                    <button type="button" data-bs-toggle="modal" data-bs-target="#reviewForm">Search books</button>
                </div>
                <button className="btn btn-primary" data-bs-dismiss="modal">Create</button>
            </form>
        </>
    )
}
