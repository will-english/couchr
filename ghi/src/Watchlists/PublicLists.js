import React from 'react'
import { useState, useEffect } from 'react';
import PublicListColumn from './PublicListColumn';


export default function PublicLists() {
    const [publicLists, setPublicLists] = useState([])

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
            setPublicLists(data.lists)
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    const ListColumn = [[], [], [], []]
    let i = 0;
    for (let publicList of publicLists) {
        ListColumn[i].push(publicList)
        i += 1
        if (i > 3) {
            i = 0;
        };
    };


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