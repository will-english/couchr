import * as React from "react";
import { useAuthContext } from '../auth/auth_provider';
import { useState, useEffect } from "react";

function DetailLeftArea(props) {
    const [Status, setStatus] = useState([]);
    const { token } = useAuthContext();
    const { userName } = useAuthContext();

    async function handleAddList(e) {
        
        const dict = { 'liked': 'is_in_liked_list', 'watched': 'is_in_watched_list', 'want-to-watch': 'is_in_wished_list', }
        const dict2 = {'is_in_liked_list': props.is_in_liked_list, 'is_in_watched_list': props.is_in_watched_list, 'is_in_wished_list': props.is_in_wished_list,}
        const is_in = dict[e.currentTarget.id];
        props.afterSubmit(dict[e.currentTarget.id])
        let movie = props.movie_obj;
        if(dict2[is_in]) {
            movie['add'] = false
        }
        if (userName && token) {
            const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/${e.currentTarget.id}/`;
            const request = await fetch(url, {
                method: 'put',
                credentials: "include",
                body: JSON.stringify(movie),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });
            const response = await request.json();            
        }
    }


    return (
        <div className="detail_image_area">
            <img className="detail_image_area_image" src={props.movie?.poster_path} alt="movie_image" />
            <div>
                <span className="detail_icon_my-tip">
                    <svg onClick={handleAddList} id='liked' xmlns="http://www.w3.org/2000/svg" width="50" height="23" fill="currentColor" className="bi bi-heart detail_image_area_icon" viewBox="0 0 16 16">
                        {props.is_in_liked_list ? <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" /> : <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />}
                    </svg>
                    <span className="detail_icon_tip"><i>Liked</i></span>
                </span>

                <span className="detail_icon_my-tip">
                    {
                        props.is_in_watched_list ?
                            <svg onClick={handleAddList} id='watched' xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-eye-fill detail_image_area_icon" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg> :
                            <svg onClick={handleAddList} id='watched' xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-eye detail_image_area_icon" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                    }
                    <span className="detail_icon_tip"><i>Watched</i></span>
                </span>

                <span className="detail_icon_my-tip">
                    <svg onClick={handleAddList} id="want-to-watch" xmlns="http://www.w3.org/2000/svg" width="50" height="23" fill="currentColor" className="bi bi-bookmark detail_image_area_icon" viewBox="0 0 16 16">
                        {props.is_in_wished_list ? <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" /> : <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />}
                    </svg>
                    <span className="detail_icon_tip"><i>want-to-watch</i></span>
                </span>
            </div>
        </div>
    );
}

export default DetailLeftArea;
