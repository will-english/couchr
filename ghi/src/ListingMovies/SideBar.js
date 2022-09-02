// import { useEffect, useRef, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';


// const sidebarNavItems = [
//     {
//         display: 'Dashboard',
//         icon: <i className='bx bx-home'></i>,
//         to: '/',
//         section: ''
//     },
//     {
//         display: 'Getting Started',
//         icon: <i className='bx bx-star'></i>,
//         to: '/started',
//         section: 'started'
//     },
//     {
//         display: 'Calendar',
//         icon: <i className='bx bx-calendar'></i>,
//         to: '/movies',
//         section: 'calendar'
//     },
//     {
//         display: 'User',
//         icon: <i className='bx bx-user'></i>,
//         to: '/user',
//         section: 'user'
//     },
//     {
//         display: 'Orders',
//         icon: <i className='bx bx-receipt'></i>,
//         to: '/order',
//         section: 'order'
//     },
// ]

// const Sidebar = () => {
//     const [activeIndex, setActiveIndex] = useState(0);
//     const [stepHeight, setStepHeight] = useState(0);
//     const sidebarRef = useRef();
//     const indicatorRef = useRef();
//     const location = useLocation();

//     useEffect(() => {
//         setTimeout(() => {
//             const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
//             indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
//             setStepHeight(sidebarItem.clientHeight);
//         }, 50);
//     }, []);

//     // change active index
//     useEffect(() => {
//         const curPath = window.location.pathname.split('/')[1];
//         const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
//         setActiveIndex(curPath.length === 0 ? 0 : activeItem);
//     }, [location]);

//     return <div className='sidebar'>
//         <div className="sidebar__logo">
//             Animate
//         </div>
//         <div ref={sidebarRef} className="sidebar__menu">
//             <div
//                 ref={indicatorRef}
//                 className="sidebar__menu__indicator"
//                 style={{
//                     transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
//                 }}
//             ></div>
//             {
//                 sidebarNavItems.map((item, index) => (
//                     <Link to={item.to} key={index}>
//                         <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
//                             <div className="sidebar__menu__item__icon">
//                                 {item.icon}
//                             </div>
//                             <div className="sidebar__menu__item__text">
//                                 {item.display}
//                             </div>
//                         </div>
//                     </Link>
//                 ))
//             }
//         </div>
//     </div>;
// };

// export default Sidebar;







// import React from 'react'
// import { useState, useEffect } from 'react';




// function SideBar() {
//     const [genres, setGenres] = useState([]);

//     const getGenres = async () => {
//         const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
//         const response = await fetch(url);
//         if (response.ok) {
//             const data = await response.json();
//             setGenres(data["genres"])
//         }
//         else {
//             console.log("Error fetching genres")
//         }
//     }

//     useEffect(() => {
//         getGenres()
//     }, [genres.length],
//     console.log(genres)
//     )
 
//     return (
//         <div>
//             {genres.map((genre, index) => {
//                 return (
//                    <div key={index} list={genre} />
//                 );
//             })}
//         </div>
//     )
// }


// export default SideBar






// import { GenreResponseProps } from "../App";
// import { Button } from "./Button";


// interface sideBarProps {
//   genres: GenreResponseProps[];
//   handleClickButton: (id: number) => void;
//   selectedGenreId: number;
// }

// export function SideBar({ genres, handleClickButton, selectedGenreId }: sideBarProps) {
//   return (
//     <nav className="sidebar">
//       <span>Watch<p>Me</p></span>

//       <div className="buttons-container">
//         {genres.map(genre => (
//           <Button
//             key={String(genre.id)}
//             title={genre.title}
//             iconName={genre.name}
//             onClick={() => handleClickButton(genre.id)}
//             selected={selectedGenreId === genre.id}
//           />
//         ))}
//       </div>

//     </nav>
//   )
// }