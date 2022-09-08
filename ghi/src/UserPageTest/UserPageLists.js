import React, { useState, useEffect } from "react";
import ListCard from "./ListCard";
import { useAuthContext } from '../auth/auth_provider';

function UserPageLists() {
    const { token } = useAuthContext();
    const { userName } = useAuthContext();
    const [UserPageListsContent, setUserPageListsContent] = useState([]);
    const [defaultLists, setDefaultlists] = useState([]);

    // const getUserPageListsContent = async () => {
    //     const listsUrl = ``;
    //     const response = await fetch(listsUrl)
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setUserPageContent(data)
    //     }
    // }

    const getDefaultLists = async () => {
        const defaultList = []
        console.log(userName)
        if (userName && token) {
            console.log(token);
            // * grabing the liked list information from our API
            const liked_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/liked/`;
            const liked_request = await fetch(liked_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("liked request")
            console.log(liked_request)
            if (liked_request.ok) {
                const liked_response = await liked_request.json();
                console.log('*******************',liked_response);
                defaultList.push(liked_response);
                console.log(defaultList)
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
                console.log('*******************',watched_response);
                defaultList.push(watched_response);
                console.log(defaultList)
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
                console.log('*******************',wish_response);
                defaultList.push(wish_response);
                console.log(defaultList)
                setDefaultlists(defaultList);
                console.log(defaultList);
            }
        }
    }

    useEffect(() => {
        // getUserPageListsContent();
        getDefaultLists();
    }, [token]);

    return (
        // <div>
            <div className="userpage_left_content_area">
                <div>
                    <ListCard title={defaultLists[0]?.list.name} />
                    <ListCard title={defaultLists[1]?.list.name} />
                    <ListCard title={defaultLists[2]?.list.name} />
                    {/* ------------------------------------ */}
                    <div className="movie_user_list_card">
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div className="">
                            {/* movie title */}
                            <p className="">
                                <i>list 1</i>
                            </p>
                        </div>
                    </div>
                    {/* ------------------------------------ */}
                    <div className="movie_user_list_card">
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/ujr5pztc1oitbe7ViMUOilFaJ7s.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/lr11mCT85T1JanlgjMuhs9nMht4.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/rugyJdeoJm7cSJL1q4jBpTNbxyU.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div className="">
                            {/* movie title */}
                            <p className="">
                                <i>list 2</i>
                            </p>
                        </div>
                    </div>
                    {/* ------------------------------------ */}
                    <div className="movie_user_list_card movie_create_user_list_card">
                        <div className="movie_create_user_list_card_icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
           
    )
}
export default UserPageLists;

