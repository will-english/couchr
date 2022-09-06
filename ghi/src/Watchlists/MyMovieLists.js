import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../auth/auth_provider';


export default function MyMovieLists() {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();
    const [title, setTitle] = useState([])

    const fetchData = async () => {
        console.log(userName)
        if (userName && token) {

            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/${userName}/`;
            const request = await fetch(url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const response = await request.json();
            console.log(response.lists[0].name);
            setTitle(response.lists[0].name)
        }
    }

    useEffect(() => {
        fetchData();
    }, [{ token }]);

    return (
        <h1>{title}</h1>
    )
}
