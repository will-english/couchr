// import React from 'react'
// import { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuthContext } from '../auth/auth_provider';


// export default function MyMovieLists() {
//     // User props
//     const { token } = useAuthContext();
//     const { userName } = useAuthContext();

//     // Review props
//     const [name, setName] = useState([])
//     const [description, setDescription] = useState([])

//     // fetch user and review data
//     const fetchData = async () => {
//         if (userName && token) {

//             // get all reviews from a user
//             const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/reviews/${userName}/`;

//             const request = await fetch(url, {
//                 credentials: "include",
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//             });
//             const response = await request.json();
//             setName(response.reviews[0].name)
//         }
//     }

//     useEffect(() => {
//         fetchData();
//     }, [{ token }]);

//     const handleNavigate = (event) => {
//         event.preventDefault();
//         Navigate(event.target.name);
//     }

//     return (
//         <>
//             <div className="my-reviews-page">
//                 <h1>Reviews: {name}</h1>
//                 <button
//                     name="newreview/"
//                     onClick={handleNavigate}
//                     >Create new review
//                 </button>
//             </div>
//         </>
//     )
// }
