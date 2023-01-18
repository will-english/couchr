import React from 'react'
import { useEffect } from 'react';
import { useAuthContext } from '../auth/auth_provider';


export default function MyMovieLists() {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();

    const fetchData = async () => {
        if (userName && token) {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/wish/`;
            const request = await fetch(url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const response = await request.json();
        }
    }

    useEffect(() => {
        fetchData();
    }, [{token}]);


    return (
        <h1>title</h1>
    )
}
