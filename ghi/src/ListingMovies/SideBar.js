import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const Sidebar = () => {
    const [genres, setGenres] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [stepHeight, setStepHeight] = useState(0);
    const sidebarRef = useRef();
    const indicatorRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const getGenres = async () => {
        const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setGenres(data["genres"])
        }
        else {
            console.log("Error fetching genres")
        }
    }


    useEffect(() => {
        setTimeout(() => {
            const sidebarItem = sidebarRef.current.querySelector('.sidebar__menu__item');
            indicatorRef.current.style.height = `${sidebarItem.clientHeight}px`;
            setStepHeight(sidebarItem.clientHeight);
        }, 50);
    }, []);

    // change active index
    useEffect(() => {
        const curPath = window.location.pathname.split('/')[1];
        const activeItem = sidebarNavItems.findIndex(item => item.section === curPath);
        setActiveIndex(curPath.length === 0 ? 0 : activeItem);

    }, [location]);

    useEffect(() => {
        getGenres()
    }, [genres.length],
    // console.log(genres)
    )
    
    const sidebarNavItems = []
    for (let genre of genres) { 
        const d = {
            display: genre.name,
            icon: <i className='bx bx-home'></i>,
            to: `/movies/${genre.id}/`,
            section: ''
        }
        sidebarNavItems.push(d)
    }

    return <div id='sticky-sidebar' className='position-fixed'>
        <div className="sidebar__logo">
            Movie Genres
        </div>
        <div ref={sidebarRef} className="sidebar__menu">
            <div
                ref={indicatorRef}
                className="sidebar__menu__indicator"
                style={{
                    transform: `translateX(-50%) translateY(${activeIndex * stepHeight}px)`
                }}
            ></div>
            {
                sidebarNavItems.map((item, index) => (
                            <Link to={item.to} key={index}>
                                <div className={`sidebar__menu__item ${activeIndex === index ? 'active' : ''}`}>
                                    <div className="sidebar__menu__item__icon">
                                        {item.icon}
                                    </div>
                                    <div className="sidebar__menu__item__text">
                                        {item.display}
                                    </div>
                                </div>
                        </Link>
                ))
            }
        </div>
    </div>;
};

export default Sidebar;

