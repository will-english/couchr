import * as React from "react";
import { useAuthContext } from '../auth/auth_provider';
import { useState, useEffect } from "react";
import "../CSSfile/DetailBottomArea.css";

function DetailBottomArea(props) {

    const [reviews, setReviews] = useState([]);
    const { token } = useAuthContext();
    const { userName } = useAuthContext();

    useEffect(() => {
        const movie_api_id = props.movie.id
        const url = `http://localhost:8000/api/reviews/all/${movie_api_id}/`
        fetch(
            url
        )
            .then((res) => res.json())
            .then((res) => setReviews(res))
    },[props])


    return (
        <>
            <div className="review_area">
                <div>
                    {reviews.reviews?.map((review, index) => {
                    return (
                        <div className="review" key={index}>
                            <div className="review_user">
                                <img style={{width: '100px'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXPI745tFSS8cjMg-joaypGsVzQPpRTGWetg&usqp=CAU'>
                                </img>
                                <div>
                                    {review.user}
                                </div>
                            </div>
                            <div className="review_body">
                                <h4>
                                    {review.title}
                                </h4>
                                <p>
                                    {review.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
                </div>
            </div>
        </>
    ); 
}
    
export default DetailBottomArea;
