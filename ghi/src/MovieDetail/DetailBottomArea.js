import * as React from "react";
import { useAuthContext } from '../auth/auth_provider';
import { useState, useEffect } from "react";

function DetailBottomArea(props) {

    console.log("props: ", props)

    const [reviews, setReviews] = useState([]);
    const { token } = useAuthContext();
    const { userName } = useAuthContext();

    useEffect(() => {
        const movie_api_id = 5
        const url = `http://localhost:8000/api/reviews/all/${movie_api_id}/`
        fetch(
            url
        )
            .then((res) => res.json())
            .then((res) => setReviews(res))
    },[])


    return (
        <>
            <div className="review_area">
                <div className="review_headers">
                    <h5>Reviews</h5>
                </div>
            </div>
        </>
    ); 
}
    
export default DetailBottomArea;
