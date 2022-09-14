import React, { useState, useEffect } from "react";
import UserPageLists from "./UserPageLists";
import UserPageProfile from "./UserPageProfile";
import UserPageSubscription from "./UserPageSubscription";
import UserPageReview from "./UserPageReview";
import UserPageContact from "./UserPageContact";
import { useAuthContext } from '../auth/auth_provider';
import "../CSSfile/UserPage.css";


function UserPage() {
    const { userName } = useAuthContext();
    const [UserPageContent, setUserPageContent] = useState([]);

    const list = [
        <UserPageProfile />,
        <UserPageLists />,
        <UserPageReview />,
        <UserPageSubscription />,
        <UserPageContact />
    ]

    const getUserPageContent = async () => {
        //     const currentUrl = window.location.href
        //     const list1 = currentUrl.split("/")
        //     const instructorId = list1[5]
        //     const detailUrl = `http://localhost:8100/api/instructors/${instructorId}`;
        //     const response = await fetch(detailUrl)
        //     if (response.ok) {
        //         const data = await response.json()
        //         console.log(data)
        //         setUserPageContent(data)
        //     }
        setUserPageContent(list[1])
    }


    const handleClick = (e) => {
        e.preventDefault();
        const list = [
            <UserPageProfile />,
            <UserPageLists />,
            <UserPageReview />,
            <UserPageSubscription />,
            <UserPageContact />
        ]
        const value = Number(e.target.id);
        console.log(e.target.id)
        setUserPageContent(list[value])

        for (const num of [0, 1, 2, 3, 4]) {
            const option = document.getElementById(num)
            if (num !== value) {
                option.className = "userpage_right_option_area_option"
            }else{
                option.className = "userpage_right_option_area_option_pick"
            }
        }
    }



    useEffect(() => {
        getUserPageContent()
    }, []);

    return (
        <div className="user_page">
            <div>
                <div className="user_imfo_area mt-5">
                    <div className="">
                        <img className="user_avatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXPI745tFSS8cjMg-joaypGsVzQPpRTGWetg&usqp=CAU" alt="UserImage" />
                    </div>
                    <h3 className="">{userName}</h3>
                    <p>most like geners</p>
                    <p>Hello</p>
                </div>

                <div className="userpage_right_option_area">
                    <i><p onClick={handleClick} id="0" className="userpage_right_option_area_option">Profile</p></i>
                    <i><p onClick={handleClick} id="1" className="userpage_right_option_area_option">My Lists</p></i>
                    <i><p onClick={handleClick} id="2" className="userpage_right_option_area_option">My Reviews</p></i>
                    <i><p onClick={handleClick} id="3" className="userpage_right_option_area_option">Subscription</p></i>
                    <i><p onClick={handleClick} id="4" className="userpage_right_option_area_option">Contact Us</p></i>
                </div>

                <div className="user_page_blockline"></div>

                <div className="user_list_area mt-5">
                    {UserPageContent}
                </div>

            </div>
            {/* <div>
                <footer className="user_page_footer">
                    <p>@Coucher team&nbsp;&nbsp;2022</p>
                    <p>Contact us :</p>
                    <p>HR-couchr@gmail.com</p>
                </footer>
            </div> */}
        </div>


    )
}
export default UserPage;

