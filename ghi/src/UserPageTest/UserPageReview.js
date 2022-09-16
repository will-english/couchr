import React, { useState, useEffect } from "react";
import { useAuthContext } from '../auth/auth_provider';

function UserPageReview() {
    const { userName } = useAuthContext();
    const { token } = useAuthContext();
    const [UserPageReviewContent, setUserPageReviewContent] = useState([]);
    const getUserPageReviewContent = async () => {

        if (userName && token) {
            const review_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/reviews/user/${userName}/`;
            const review_request = await fetch(review_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
    
            if (review_request.ok) {
                const review_response = await review_request.json();
               
                setUserPageReviewContent(review_response.reviews)
                console.log('********SUCCESS***********', review_response.reviews);
            }
        }
    }





    useEffect(() => {
        getUserPageReviewContent()
    }, []);

    return (
        <>
            <div className="review_area">
            
                    {UserPageReviewContent?.map((review, index) => {
                        let movie_url = "movies/movie/" + review.movie_id + "/"
                    return (
                        <div className="review" key={index}>
                            <div className="review_user">
                                <img className="review_movie_img" src={review.movie_poster} alt="">
                                </img>
                                <div className="review_info">
                                    <h5 className="review_title">
                                        {review.title}
                                    </h5>
                                    <a className="review_page_movie_title" href={movie_url}>
                                        <p><i>{review.movie_title}</i></p>
                                    </a>
                                </div>
                            </div>
                            <div className="review_body">
                                <p>
                                    <i>{review.description}</i>
                                </p>
                            </div>
                        </div>
                    );
                })}
                
            </div>
        </>
    )
}
export default UserPageReview;

                          
                              
                           