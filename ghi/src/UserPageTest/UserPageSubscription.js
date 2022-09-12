import React, { useState, useEffect } from "react";

function UserPageSubscription() {
    const [UserPageSubscriptionContent, setUserPageSubscriptionContent] = useState([]);
    const getUserPageSubscriptionContent = async () => {
    //     const listsUrl = ``;
    //     const response = await fetch(listsUrl)
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setUserPageContent(data)
    //     }
    }
    useEffect(() => {
        getUserPageSubscriptionContent()
    }, []);

    return (
        <div className="userpage_left_content_area">
                <div className="userpage_left_content_area_content">
                    <p>Subscription Page</p>

                </div>
                
        </div>
    )
}
export default UserPageSubscription;