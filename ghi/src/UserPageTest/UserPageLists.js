import React, { useState, useEffect } from "react";

function UserPageLists() {
    const [UserPageListsContent, setUserPageListsContent] = useState([]);
    const getUserPageListsContent = async () => {
    //     const listsUrl = ``;
    //     const response = await fetch(listsUrl)
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setUserPageContent(data)
    //     }
    }
    useEffect(() => {
        getUserPageListsContent()
    }, []);
    return (
        // <div>
            <div className="userpage_left_content_area">
                <div>
                    <div className="movie_user_list_card">
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/14lQfkLDgEIrEtyUMfj5rJEKVlS.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/kDC9Q3kiVaxrJijaGeZ8ZB2ZoiX.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div className="">
                            {/* movie title */}
                            <p className="">
                                <i>favorite</i>
                            </p>
                        </div>
                    </div>
                    {/* ------------------------------------ */}
                    <div className="movie_user_list_card">
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/ipn8khVVC4eToWiGf89WF9J5PJn.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div>
                            <img src="https://image.tmdb.org/t/p/original/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg" className="user_list_card_image" alt="img" />
                            <img src="https://image.tmdb.org/t/p/original/ffX0TL3uKerLXACkuZGWhAPMbAq.jpg" className="user_list_card_image" alt="img" />
                        </div>
                        <div className="">
                            {/* movie title */}
                            <p className="">
                                <i>wish list</i>
                            </p>
                        </div>
                    </div>
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
                                <i>history</i>
                            </p>
                        </div>
                    </div>

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

