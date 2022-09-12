import React from 'react';

export default function ListCardDetail(props) {


    return (
        <div className="movie_user_list_card">
            <div className='movie_user_list_card_content'>
                {props.movies.map(movie => {
                    let default_pic = 'https://image.tmdb.org/t/p/original/r7XifzvtezNt31ypvsmb6Oqxw49.jpg';
                    console.log(movie)
                    if (movie.poster){
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
        </div>
    )
}
