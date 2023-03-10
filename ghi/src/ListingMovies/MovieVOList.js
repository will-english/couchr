import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../auth/auth_provider';
import MovieColumn from './MovieColumns';

export default function MovieVOList(props) {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();

    const [MovieColumns, setMovieColumns] = useState([[], [], [], []])
    async function fetchMovies() {
        let url = '';
        if (props.username) {
            url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${props.username}/${props.id}/${props.name}/`;
        } else {
            url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/${props.id}/${props.name}/`;
        }
        
        const request = await fetch(url, {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        if (request.ok) {
            const response = await request.json();
            let mc = [[], [], [], []]
            let i = 0
            for (let data of response.movies) {
                console.log(data)
                mc[i].push(data)
                i = i + 1
                if (i > 3) { i = 0 }
            }
            console.log('******************',mc)
            setMovieColumns(mc)
        }

    }
    async function handleRemove(e) {
        console.log(e.currentTarget.id)
        const body = {api_id:Number(e.currentTarget.id), add: false}
        const defaults = ['liked', 'watched', 'want-to-watch']
        console.log(body)
        let def = false;
        for (const item of defaults) {
            if (item == props.name){
                def = true;
            }
        }
        if (def) {
            console.log('default list movie remove try')
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/${props.name}/`;
            const request = await fetch(url, {
                credentials: "include",
                method: 'put',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(request)
            fetchMovies();
        } else {
            console.log('custom list movie remove try')
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/${props.id}/movies/`;
            const request = await fetch(url, {
                credentials: "include",
                method: 'put',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log(request)
            props.afterSubmit();
            fetchMovies();

        }
    }

    useEffect(() => {
        fetchMovies();
    }, [])

    let trash = true;

    if (props.public) {
        trash = false;
    }

    return (
        <div className='container' >
            <div className="row">
                {MovieColumns.map((movie, index) => {
                    return (
                        <MovieColumn key={index} list={movie} delete={trash} handleRemove={handleRemove}/>
                    );
                })}
            </div>
        </div>
    )
}
