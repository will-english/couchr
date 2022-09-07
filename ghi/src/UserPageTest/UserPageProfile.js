import React, { useState, useEffect } from "react";

function UserPageProfile() {
    const [UserPageProfileContent, setUserPageProfileContent] = useState([]);
    const getUserPageProfileContent = async () => {
    //     const listsUrl = ``;
    //     const response = await fetch(listsUrl)
    //     if (response.ok) {
    //         const data = await response.json()
    //         console.log(data)
    //         setUserPageContent(data)
    //     }
    }
    useEffect(() => {
        getUserPageProfileContent()
    }, []);
    return (

            <div className="userpage_left_content_area">
                <div className="userpage_left_content_area_content">
                    <div className="userpage_left_content_area_content_each">
                        <h5>User Name</h5>
                        name
                    </div>
                    <div className="userpage_left_content_area_content_each">
                        email
                    </div>
                    <div className="userpage_left_content_area_content_each">
                        avatar
                    </div>
                    <div className="userpage_left_content_area_content_each">
                        headline
                    </div>
                    <button className="userpage_left_content_area_content_each">Save</button>

                </div>
                
        </div>
    )
}
export default UserPageProfile;

