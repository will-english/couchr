import * as React from "react";
import { useState, useEffect } from "react";
import "../CSSfile/DetailBottomArea.css";


function DetailBottomArea(props) {
    const [reviews, setReviews] = useState([]);
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
                    {reviews.reviews?.map((review, index) => {
                    return (
                        <div className="review" key={index}>
                            <div className="review_user">
                                <img className="review_user_img" src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXPI745tFSS8cjMg-joaypGsVzQPpRTGWetg&usqp=CAU' alt=""></img>
                                <div className="review_info">
                                    <h5 className="review_title">
                                        {review.title}
                                    </h5>
                                    <p className="review_user_name"><i>{review.user}</i></p>
                                </div>
                            </div>
                            <div className="review_body">
                                <p><i>{review.description}</i></p>
                            </div>
                        </div>
                    );
                })}  
            </div>
        </>
    ); 
}
    
export default DetailBottomArea;