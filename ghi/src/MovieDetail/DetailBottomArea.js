import * as React from "react";
import { useAuthContext } from '../auth/auth_provider';
import { useState, useEffect } from "react";

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

    console.log("reviews: ", reviews)

    return (
        <>
            <div className="review_area">
                <div className="review">
                    <div>
                        {reviews.reviews?.map((review, index) => {
                        return (
                            <li className="review" key={index}>
                                {review.user}
                                {review.title}
                                {review.description}
                            </li>
                        );
                    })}
                    </div>
                </div>
            </div>
        </>
    ); 
}
    
export default DetailBottomArea;
