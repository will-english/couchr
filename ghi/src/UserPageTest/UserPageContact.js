import React, { useState, useEffect } from "react";

function UserPageContact() {
    const [UserPageContactContent, setUserPageContactContent] = useState([]);
    const getUserPageContactContent = async () => {
    //     const listsUrl = ``;
    //     const response = await fetch(listsUrl)
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setUserPageContent(data)
    //     }
    }
    useEffect(() => {
        getUserPageContactContent()
    }, []);

    return (
        <div className="userpage_left_content_area">
                <div className="userpage_left_content_area_content">
                    <p>Contact Page</p>

                </div>
                
        </div>
    )
}
export default UserPageContact;