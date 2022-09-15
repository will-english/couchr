import React, { useState, useEffect } from "react";
import ListCard from "./ListCard";
import { useAuthContext } from '../auth/auth_provider';
import MovieVOList from "../ListingMovies/MovieVOList";
import NewList from '../Watchlists/CreateNewListForm';


function UserPageLists() {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();
    const [defaultLists, setDefaultlists] = useState([]);
    const [selected, setSelected] = useState(false);
    const [list, setList] = useState([])

    const getDefaultLists = async () => {
        let defaultList = [];
        let defaultArr = [{}, {}, {}, {}];
        // console.log(userName)
        if (userName && token) {
            // console.log(token);
            // * grabing the liked list information from our API
            const liked_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/liked/`;
            const liked_request = await fetch(liked_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            // console.log("liked request")
            if (liked_request.ok) {
                const liked_response = await liked_request.json();
                // console.log('*******************', liked_response);
                let liked_movies = liked_response.list.movies
                const difference = 4 - liked_movies.length
                if (difference > 0) {
                    liked_response.list.movies = liked_movies.concat(defaultArr.slice(0, difference))
                } else {
                    liked_response.list.movies = liked_movies.slice(0, 4)
                }
                // console.log(liked_response)
                defaultList.push(liked_response);
                defaultList[0]['list']['name']='liked';
                // console.log(defaultList)
            }

            // ? grabing the watched list information from our API
            const watched_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/watched/`;
            const watched_request = await fetch(watched_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("watched request")
            if (watched_request.ok) {
                const watched_response = await watched_request.json();
                // console.log('*******************', watched_response);
                let watched_movies = watched_response.list.movies
                const difference = 4 - watched_movies.length
                if (difference > 0) {
                    watched_response.list.movies = watched_movies.concat(defaultArr.slice(0, difference))
                } else {
                    watched_response.list.movies = watched_movies.slice(0, 4)
                }
                defaultList.push(watched_response);
                defaultList[1]['list']['name']='watched';
                // console.log(defaultList)
            }

            // ! grabing the wish list information from our API
            const wish_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/wish/`;
            const wish_request = await fetch(wish_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("wish request")
            if (wish_request.ok) {
                const wish_response = await wish_request.json();
                // console.log('*******************', wish_response);
                let wish_movies = wish_response.list.movies
                const difference = 4 - wish_movies.length
                if (difference > 0) {
                    wish_response.list.movies = wish_movies.concat(defaultArr.slice(0, difference))
                } else {
                    wish_response.list.movies = wish_movies.slice(0, 4)
                }
                defaultList.push(wish_response);
                defaultList[2]['list']['name']='want-to-watch';
                // console.log(defaultList)
                // console.log(defaultList);
            }

            // * grabing the custom list information from our API
            const custom_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/`;
            const custom_request = await fetch(custom_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("custom request")
            if (custom_request.ok) {
                const custom_response = await custom_request.json();
                console.log('*******************', custom_response);
                for (const list of custom_response.lists) {
                    let custom_movies = list.movies
                    const difference = 4 - custom_movies.length
                    if (difference > 0) {
                        list.movies = custom_movies.concat(defaultArr.slice(0, difference))
                    } else {
                        list.movies = custom_movies.slice(0, 4)
                    }
                    defaultList.push({list: list});
                }
                setDefaultlists(defaultList);
                console.log(defaultList);
            }

        }
    }

    useEffect(() => {
        // getUserPageListsContent();
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
        // console.log(e.currentTarget.value);
        // console.log(e.currentTarget.id);
        console.log(new_list.li);
    }

    function addList(new_list) {
        let lists = list;
        console.log('list in state', list);
        console.log('lists local variable',lists);
        console.log('new list to add to local',new_list);
        getDefaultLists();
    }

    function renderLists() {
        if (selected) {
            return (
                <div>
                    <div className="userpage_list_button_area">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-box-arrow-in-left userpage_list_button-arrow" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
                            <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                        </svg>
                        <i><p className="userpage_list_button" onClick={handleBack} >back to lists</p></i>
                    </div>
                    <MovieVOList id={list[0]} name={list[1]}/>
                </div>
            )

        } else {
            return (
                <div>
                    {defaultLists.map(list => {
                        console.log(list.list.name, list.list.movies)
                        console.log([list.list.id, list.list.name]);
                        const li = JSON.stringify({li: [list.list.id, list.list.name]})
                        return (
                            <div key={list.list.name} onClick={handleListSelect} id={li} className="movie_user_list_card">
                                <ListCard  title={list.list.name} movies={list.list.movies} />
                            </div>
                        )
                    })}
                    <div data-bs-toggle="modal" data-bs-target="#listForm" className="movie_user_list_card movie_create_user_list_card">
                        <div className="movie_create_user_list_card_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </div>
                    </div>
                    <NewList afterSubmit={addList} />
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
export default UserPageLists;