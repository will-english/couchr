import React from 'react'
import { useState, useEffect } from 'react';
// import { useAuthContext } from '../auth/auth_provider';
import PublicListColumn from './PublicListColumn';


export default function PublicLists() {
    // const { token } = useAuthContext();
    // const { userName } = useAuthContext();
    const [publicLists, setPublicLists] = useState([])

    // fetch user auth credentials

    // const fetchData = async () => {
    //     console.log(userName)
    //     if (userName && token) {

    //         const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/wish/`;
    //         const request = await fetch(url, {
    //             credentials: "include",
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             },
    //         });
    //         const response = await request.json();
    //     }
    // }

    // useEffect(() => {
    //     fetchData();
    // }, [{token}]);

    // fetch all public lists

    const fetchData = async () => {
        const url = `http://localhost:8000/api/lists/public/`
        const fetchConfig = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);

        if (response.ok) {
            const data = await response.json();
            // console.log("data: ", data)
            setPublicLists(data.lists)
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    console.log("publicLists: ", publicLists)

    const ListColumn = [[], [], [], []]
    let i = 0;
    for (let publicList of publicLists) {
        ListColumn[i].push(publicList)
        i += 1
        if (i > 3) {
            i = 0;
        };
    };
    console.log("ListColumn: ", ListColumn)
    // setPublicLists(ListColumn);


    return (
        <>
            <div className="row">
                {ListColumn.map((list, index) => {
                    return (
                        <PublicListColumn key={index} list={list}/>
                    )
                })}
            </div>
        </>
    )
}