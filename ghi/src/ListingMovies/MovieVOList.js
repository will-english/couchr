import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../auth/auth_provider';
import MovieColumn from './MovieColumns';

export default function MovieVOList(props) {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();

    const [MovieColumns, setMovieColumns] = useState([[], [], [], []])
    async function fetchMovies() {
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/${props.id}/${props.name}/`;
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
                mc[i].push(data)
                i = i + 1
                if (i > 3) { i = 0 }
            }
            setMovieColumns(mc)
        }

    }

    useEffect(() => {
        fetchMovies();
    }, [])

    return (
        <div className='container' >
            <div className="row">
                {MovieColumns.map((movie, index) => {
                    return (
                        <MovieColumn key={index} list={movie} />
                    );
                })}
            </div>
        </div>
    )
}
