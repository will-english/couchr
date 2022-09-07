import React from 'react'

export default function ListCard(props) {

    
    return (
        <div className="movie_user_list_card">
            <div>
                <img src="https://image.tmdb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg" className="user_list_card_image" alt="img" />
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
