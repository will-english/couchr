import React, { useState, useEffect } from "react";
import UserPageLists from "./UserPageLists";
import UserPageProfile from "./UserPageProfile";


function UserPage() {
    const [UserPageContent, setUserPageContent] = useState([]);

    const list = [
        <UserPageProfile />,
        <UserPageLists />,

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

        ]
        const value = Number(e.target.id);
        console.log(e.target.id)
        setUserPageContent(list[value])
    }


    useEffect(() => {
        getUserPageContent()
    }, []);

    return (
        <>
            <div>
                <div className="user_imfo_area mt-5">
                    <div className="">
                        <img className="user_avatar" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADhCAMAAADmr0l2AAAA2FBMVEVjhZYAAADI+/tRUVE1NTWOn6iFURRWfI/l6u5dgZKsvMXy9fib4OBkh5j6/P4/VF5oPAgyQ0vV//8wNzeTra0MDAw8PDxZeYdNTU1aaGgoLi5EW2ZPandpeXnJ8/MSCgOQqalzjpxsQhCy7u4dJiuqycmFmqQTExNbNw1fbm55ShIfIyOIUxQpNj1PT08dEgS53NwWHSFUMAY6Iwifu7sZGRl+k5NDKQkuGwcZIyhJc4clMjk1PkKsxMR7h4dBRUU6KhswRVBfPhlJPjJBKAlwQwxOMhZulKaB3axMAAAEQklEQVR4nO3de1faMBjH8bJ56xybIkUUFG9cBjKt1206mVPm+39Hc548Tz2EZk2bQlJ/3/kX1Cyf03NsoKV4qyvFzlv5sVzkPngry16B8wF0PABdD0DXA9D1AHQ9AF0PQNcD0PUAdD0AXQ9A1wPQ9QB0PQBdD0DXA9D1AHQ9s8DNrBmbCWcWGJQy5hubCmUUWO4CCKDpANSp8ECv4EC/sMAylRnIQ5mwvWQCuBmE3ed/zy1Qo3q6wm73308YNI3oPENA3gEMrL9PFy+FAEwagAkCEEAA05cFSAdlg0AeqWnqiJ8B2ByuiwbUSBzgR2mBNeqWxm5kJKYHlj/LO+5rSpfcgMZetwAYAAgggAACaDEw0xHfCHBEh2cZWK+l65IGv2lS6YgmgF3FnqiVTBWkmqVDwBBAAAEEEMBMwFQnLnIC8nvxtcBUYborFXIC8krrcsFYvC+1hAACCCCAAAIIYDZgqTu56nh1tYWxlUwwR+CMAxBAAAEEEECbgIOq+UY0+E2zMZnWezMmgBuVd8bbosFtOH0GIIAAAggggOziiwLW+UB/keOBXgUs71MmgWFppqmAnUVRJ35xow88sge4DyCAAALoGtAvfy8okK4A8G+3RXxBYLAtNeWTkvJG3EDeWgXkj1REx8H4D1YmBfr8P7Z3RVf0yEZld7Iv0kQH0jZRP7WA/qIiE0BaLr4CTq4kK9OA8QvPth6wAyCAAAIIoMXAioiB20UAyiuZwd0pJc3YRSAVrUWv4mfsNJBfTQAIIIAAApgJGH9KorIlTTQwB1T4jAJrO6K7KVPem6zKzx1y9MiptPWe6tzEviKTQE5eqin7SB0qNprj2SUZqHn6DEAAAQTwTQPlcxMFA97TzYiO5g7M5SKE6FaUjbkDc7kIIYKmvU7GHDCXE6AAAggggAAC6AgwSQACCCCAAAJYWKBPWQVMVMKVTEdk1UrGJNDKpRqAAAIIIIB2AG14Z7u9o9WuFlBx7cHMgNWSVqdawCQBCCCAAAJYIKDecdAGYHsrPr4dY+tc9Fi9ENVlYFMrWtvkvlSrxMefLPl2TMn7lIGb8nOq6LvF5rkWjYBLVKugwGMAAQQQwDyBRf0rGly+fC1j+Gup/8LrL520RCpgS5FVwCl3QqA9eXyuAPaX4rMKyEWffAEQQAABBDAfoG8rUPGCl4uA/MqXgfdPdDOjJMDoFfOsgBeDjf8X3dPphOr1Rb9DijdaoyIpPzRzoOabTtwBTf1Afq4HIIAAAgjgWweu0RHfGWAgfauCsodr0VlPakyLgP5YtEYnN855APpSipkBu1pnicpD+r1HfsdNbkz77Yx3nDSS9cBrAAEEEEAAAZQHH4oexgex9c5Ef2jroSvA6H4LzVKCbp4y34Z61kAuEfAofnDbgcn2IIAAAghg4f+KBp7W9yJyjemkSWDs4M/A1U9ZW40v89jZJ+cppleI/gKujB9x2dQYlQAAAABJRU5ErkJggg==" alt="UserImage" />
                    </div>
                    <h3 className="">User name</h3>
                    <p>most like geners</p>
                    <p>Hello</p>
                </div>

                <div className="user_page_blockline"></div>


                <div className="user_list_area mt-5">
                    <div className="userpage_right_option_area">

                        <h5 onClick={handleClick} id="0" className="userpage_right_option_area_option">Profile</h5>
                        <h5 onClick={handleClick} id="1" className="userpage_right_option_area_option">My Lists</h5>
                        <h5 value="2" className="userpage_right_option_area_option">My Reviews</h5>
                        <h5 value="3" className="userpage_right_option_area_option">Subscription</h5>
                        <h5 value="4" className="userpage_right_option_area_option">Contact Us</h5>

                    </div>
                    {UserPageContent}
                </div>

            </div>
            <footer className="">
                <p>@Coucher team&nbsp;&nbsp;2022</p>
                <p>Contact us :</p>
                <p>HR-couchr@gmail.com</p>
            </footer>
        </>


    )
}
export default UserPage;

