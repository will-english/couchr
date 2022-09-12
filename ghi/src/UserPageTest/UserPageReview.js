import React, { useState, useEffect } from "react";

function UserPageReview() {
    const [UserPageReviewContent, setUserPageReviewContent] = useState([]);
    const getUserPageReviewContent = async () => {
    //     const listsUrl = ``;
    //     const response = await fetch(listsUrl)
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setUserPageContent(data)
    //     }
    }
    useEffect(() => {
        getUserPageReviewContent()
    }, []);

    return (
        <div className="userpage_left_content_area">
                <div className="userpage_left_content_area_content">
                    <p>Review Page</p>

                </div>
                
        </div>
    )
}
export default UserPageReview;