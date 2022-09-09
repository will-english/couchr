import * as React from "react";
import NewList from "../Watchlists/CreateNewListForm";
import NewReviewForm from "../Reviews/CreateNewReviewForm";

function DetailMiddleArea(props) {

    console.log("props: ", props)

    return (
        <div className="detail-information-area">
            <div className="">

                {/* movie title */}
                <div className="detail_movie_name">
                    <h3>{props.movie?.title}</h3>
                </div>

                {/* movie rating */}
                <div className="detail_movie_rating">
                    <p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                        </svg> {props.movie?.vote_average}
                    </p>
                </div>
            </div>

            {/* movie original title */}
            <p className="detail_movie_originaltitle">Original title: {props.movie?.original_title}</p>

            {/* movie release year */}
            <div className="detail_movie_year">
                <p>Release year : {props.movie?.release_date}</p>
            </div>

            <div>
                {/* watch trailer button */}
                <button className="btn btn-danger">Watch trailer&nbsp;&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                    </svg>
                </button>

                {/* add to list dropdown */}
                <div className="detail_movie_addtolist_area">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-bookmark-heart detail_movie_addtolist" viewBox="0 0 16 16" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                        <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                        <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>

                    <ul className="dropdown-menu detail_dropdown_list_ul">
                        {props.movie_lists?.map((list, index) => {
                            return (
                                <li className="detail_dropdown_list_li" key={index}><p onClick={props.handleAddMovie} key={list.id} id={list.id}>
                                    {list.name}
                                </p></li>
                            );
                        })}

                        <li><div className="dropdown-divider"></div></li>
                        <li>
                            <button type="button" className="btn detail_dropdown_list_button" data-bs-toggle="modal" data-bs-target="#listForm">
                                + New list
                            </button>
                        </li>
                    </ul>
                            <NewList afterSubmit={props.add_list} />
                </div>

                 {/* add review button */}
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square detail_movie_addtolist" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#reviewForm" aria-haspopup="true" aria-expanded="false">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg>
                <NewReviewForm movie={props.movie}/>
            </div>

            {/* pop-up message */}
            <div>
                <div id="popup_message_id" className="d-none" role="alert">
                    You just added a new movie to your list!
                </div>
                <div id="popup_error_message_id" className="d-none" role="alert">
                    Movie is already in list!
                </div>
            </div>

            {/* movie description */}
            <p className="detail_movie_plot">{props.movie?.overview}</p>
            <div>
                <div className="">
                    <h5>Details</h5>
                </div>

                {/* movie runtime */}
                <p>Runtime:&nbsp;&nbsp;{props.movie?.runtime}&nbsp;mins</p>
            </div>
        </div>
    ); 
}
    
export default DetailMiddleArea;
