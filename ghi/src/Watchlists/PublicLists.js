import React from 'react'
import { useState, useEffect } from 'react';
import { useAuthContext } from '../auth/auth_provider';
import MovieVOList from '../ListingMovies/MovieVOList';
import ListCard from '../UserPageTest/ListCard';


export default function PublicLists() {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();
    const [lists, setLists] = useState([]);
    const [selected, setSelected] = useState(false);
    const [list, setList] = useState([])

    const getDefaultLists = async () => {
        console.log("get default lists")
        console.log(userName, token)
        let Lists = [];
        let defaultArr = [{}, {}, {}, {}];
        // console.log(userName)
        if (userName && token) {

            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/public/`;
            const request = await fetch(url);
            console.log("request***********", request)
            if (request.ok) {
                const response = await request.json();
                console.log('*******************', response);
                for (const list of response.lists) {
                    let custom_movies = list.movies
                    const difference = 4 - custom_movies.length
                    if (difference > 0) {
                        list.movies = custom_movies.concat(defaultArr.slice(0, difference))
                    } else {
                        list.movies = custom_movies.slice(0, 4)
                    }
                    Lists.push({ list: list });
                }
                setLists(Lists);
                console.log(Lists);
            }

        }
    }

    useEffect(() => {
        getDefaultLists();
    }, [token]);

    function handleBack() {
        setSelected(false);
    }

    function handleListSelect(e) {
        setSelected(true)
        const json_list = e.currentTarget.id
        const new_list = JSON.parse(json_list);
        setList(new_list.li)
        console.log(new_list.li);
    }

    function renderLists() {
        if (selected) {
            return (
                <div>
                    <button onClick={handleBack} >Back to lists</button>
                    <MovieVOList id={list[0]} name={list[1]} />
                </div>
            )

        } else {
            return (
                <div>
                    {lists.map(list => {
                        console.log(list.list.name, list.list.movies)
                        console.log([list.list.id, list.list.name]);
                        const li = JSON.stringify({ li: [list.list.id, list.list.name] })
                        return (
                            <div onClick={handleListSelect} id={li} className="movie_user_list_card">
                                <ListCard title={list.list.name} movies={list.list.movies} />
                            </div>
                        )
                    })}
                </div>
            )
        }

    }


    return (
        <div className="userpage_left_content_area">
            {renderLists()}
        </div>
    )
}