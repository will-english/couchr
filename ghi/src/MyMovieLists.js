import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthContext } from './auth/auth_provider';


export default function MyMovieLists() {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();
    const [title, setTitle] = useState([])

    const fetchData = async () => {

        console.log(`Bearer ${token}`);
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/list/${userName}/`;
        const request = await fetch(url, {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        const response = await request.json();
        console.log(response);
        setTitle(response.name)
    }

    useEffect(() => {
        fetchData();
    }, [{token}]);

    return (
        <h1>{title}</h1>
    )
}
