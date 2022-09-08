import React, { useEffect, useState } from 'react'

export default function ListCard(props) {

    const [posters, setPosters] = useState([]);
    console.log(props.movies);
    const posterList = (e) => {
        const posters = [];
        const movies = props.movies;
        if (movies != undefined) {
            console.log(movies)
            for (const movie of movies) {
                if (movie.poster != undefined) {
                    posters.push(movie.poster)
                } else {
                    posters.push(0);
                }
                if (posters.length == 4) {
                    break;
                }
            }
        }
        setPosters(posters);
    }

    useEffect(() => {
        posterList();
    }, []);

    return (
        <div className="movie_user_list_card">
            <div>
                <img src={posters[0] ? 'https://image.tmdb.org/t/p/original/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg' : 'https://image.tmdb.org/t/p/original/14lQfkLDgEIrEtyUMfj5rJEKVlS.jpg'} id='0' className="user_list_card_image" alt="img" />
                {/* <img src="https://image.tmdb.org/t/p/original/14lQfkLDgEIrEtyUMfj5rJEKVlS.jpg" className="user_list_card_image" alt="img" /> */}
                <img src="https://image.tmdb.org/t/p/original/14lQfkLDgEIrEtyUMfj5rJEKVlS.jpg" className="user_list_card_image" alt="img" />
            </div>
            <div>
                <img src="https://image.tmdb.org/t/p/original/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg" className="user_list_card_image" alt="img" />
                <img src="https://image.tmdb.org/t/p/original/kDC9Q3kiVaxrJijaGeZ8ZB2ZoiX.jpg" className="user_list_card_image" alt="img" />
            </div>
            <div className="">
                {/* movie title */}
                <p className="">
                    <i>{props.title}</i>
                </p>
            </div>
        </div>
    )
}
