import React from 'react';

export default function ListCard(props) {


    return (
        <>
            <div className='movie_user_list_card_content'>
                {props.movies.map(movie => {
                    let default_pic = '/default_blank_img.png';
                    console.log(movie)
                    if (movie.poster) {
                        default_pic = movie.poster
                    }
                    return <img key={movie.id} src={default_pic} className="user_list_card_image" alt="img" />
                })}
            </div>

            <div className="movie_user_list_card_content">
                {/* movie title */}
                <p className="">
                    <i>{props.title}</i>
                </p>
            </div>
        </>
    )
}