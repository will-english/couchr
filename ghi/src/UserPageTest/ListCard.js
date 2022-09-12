import React from 'react';

export default function ListCard(props) {


    return (
        // <div className="movie_user_list_card">
        <>
            <div className='movie_user_list_card_content'>
                {props.movies.map(movie => {
                    let default_pic = 'https://image.tmdb.org/t/p/original/14lQfkLDgEIrEtyUMfj5rJEKVlS.jpg';
                    console.log(movie)
                    if (movie.poster) {
                        default_pic = movie.poster
                    }
                    return <img src={default_pic} className="user_list_card_image" alt="img" />
                })}
            </div>

            <div className="">
                {/* movie title */}
                <p className="">
                    <i>{props.title}</i>
                </p>
            </div>
        </>
        // </div>
    )
}
