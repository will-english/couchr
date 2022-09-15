import React from 'react'
import { useState, useEffect } from 'react';
import PublicListColumn from './PublicListColumn';
import { useAuthContext } from '../auth/auth_provider';
import MovieVOList from "../ListingMovies/MovieVOList";
import ListCard from "../UserPageTest/ListCard";


function PublicLists() {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();
    const [lists, setLists] = useState([]);
    const [selected, setSelected] = useState(false);
    const [list, setList] = useState([])

    // fetch all public lists
    const getPublicLists = async () => {
        let lists = [];
        let defaultArr = [{}, {}, {}, {}];
        // console.log(token);
        // * grabing the public lists
        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/public/`;
        const request = await fetch(url, {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        console.log("&&&&&&&&&&& request")
        if (request.ok) {
            const response = await request.json();
            console.log('*******************', response);
            for (const list of response.lists) {
                let movies = list.movies
                const difference = 4 - movies.length
                if (difference > 0) {
                    list.movies = movies.concat(defaultArr.slice(0, difference))
                } else {
                    list.movies = movies.slice(0, 4)
                }
                lists.push({ list: list });
            }
            setLists(lists);
            console.log(lists);

        }
    }
    useEffect(() => {
        // getUserPageListsContent();
        getPublicLists();
    }, [token]);

    function handleBack() {
        setSelected(false);
    }

    function handleListSelect(e) {
        setSelected(true)
        const json_list = e.currentTarget.id
        const new_list = JSON.parse(json_list);
        setList(new_list.li)
        // console.log(e.currentTarget.value);
        // console.log(e.currentTarget.id);
        console.log(new_list.li);
    }

    function renderLists() {
        if (selected) {
            return (
                <div>
                    <button onClick={handleBack} >Back to lists</button>
                    <MovieVOList public = {true} id={list[0]} name={list[1]} username={list[2] }/>
                </div>
            )

        } else {
            return (
                <div>
                    {lists.map(list => {
                        console.log(list.list.name, list.list.movies)
                        console.log([list.list.id, list.list.name]);
                        const li = JSON.stringify({ li: [list.list.id, list.list.name, list.list.user] })
                        return (
                            <div key={list.list.name} onClick={handleListSelect} id={li} className="movie_user_list_card">
                                <ListCard title={list.list.name} movies={list.list.movies} />
                            </div>
                        )
                    })}

                </div>
            )
        }

    }

    return (
        // <div>
        <div className="userpage_left_content_area">
            {renderLists()}
        </div>

    )

}
export default PublicLists;