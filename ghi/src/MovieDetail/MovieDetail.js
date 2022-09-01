import * as React from "react";
import "../index.css";
import { NavLink } from 'react-router-dom';
import NewList from "../Watchlists/CreateNewListForm";
// import { Wrap, Center } from "./style";
// import { Popover } from 'rsuite';
import { AuthContext } from '../auth/auth_provider';

class MovieDetail extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            movie_detail: {},
            movie_credit: {},
            genres: [],
            actors: [],
            movie_list_id: '',
            movie_lists: [],
        }
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);
        this.addList = this.addList.bind(this);
    }

    async componentDidMount() {
        const userName = this.context.userName;
        const currentURL = window.location.href
        const words = currentURL.split("/")
        const movie_id = words[5]

        const movie_detail_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const movie_credit_rul = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const movie_lists_url = `http://localhost:8000/api/lists/${userName}/`;

        const response_detail = await fetch(movie_detail_url);
        const response_credit = await fetch(movie_credit_rul);
        const response_lists = await fetch(movie_lists_url);

        if (response_detail.ok && response_credit.ok) {
            const detail_data = await response_detail.json();
            const credit_data = await response_credit.json();
            const lists_data = await response_lists.json();
            // console.log(credit_data)

            //set actors
            let actors = [];
            for (const actor of credit_data.cast.slice(0, 5)) {
                let actor_detail = {};
                actor_detail["name"] = actor.name;
                actor_detail["profile_path"] = "https://image.tmdb.org/t/p/original" + actor.profile_path;
                actor_detail["character"] = actor.character
                actors.push(actor_detail)
                console.log(actor.character)
            }
            this.setState({ actors: actors })

            //set geners
            let genres_list = [];
            for (const genre of detail_data.genres) {
                genres_list.push(genre)
            }
            this.setState({ genres: genres_list })

            //set movie picture url
            if (detail_data.poster_path !== null) {
                detail_data.poster_path = "https://image.tmdb.org/t/p/original" + detail_data.poster_path
            } else {
                detail_data.poster_path = "/couchr-no-photo.png"
            }

            detail_data.vote_average = detail_data.vote_average.toFixed(1)
            detail_data.release_date = detail_data.release_date.slice(0, 4)

            this.setState(
                {
                    movie_detail: detail_data,
                    movie_credit: credit_data,
                    genres: genres_list,
                    movie_lists: lists_data.lists,
                });
        };
    }

    handleStateChange(event) {
        const id = event.target.id;
        const value = event.target.value;
        this.setState({ [id]: value });
    }


//How to add the current move to one of the lists
    async handleAddMovie(event) {
        event.preventDefault();

        // get the URL to send the JSON to
        const list_id = event.target.id;
        const movie_list_url = `http://localhost:8000/api/lists/${list_id}/movies/`;

        // get the movie ID
        const currentURL = window.location.href
        const words = currentURL.split("/")
        const api_id = words[5]

        // create the JSON object body
        const movie = {
            "title": this.state.movie_detail.title,
            "api_id": api_id,
            "add": true
        }

        // Turn the JSON object into a JSON string and then send it in the PUT method
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(movie),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // call the PUT method
        const response = await fetch(movie_list_url, fetchConfig)
        if (response.ok) {
            console.log("response ok")
            document.getElementById("popup_message_id").className = "alert alert-success popup_message"
            setTimeout(function () {
                document.getElementById("popup_message_id").className = "d-none";
            }, 5000);
        } else {
            document.getElementById("popup_error_message_id").className = "alert alert-danger popup_message"
            setTimeout(function () {
                document.getElementById("popup_error_message_id").className = "d-none";
            }, 3000);
        }
    }

    async handleCreateList(event) {
        event.preventDefault();
        alert("Hello")
    }
//create a new list
    addList (list) {
        const lists = this.state.movie_lists
        lists.push(list)
        this.setState({movie_lists: lists});
    }

    render() {
        return (
            <div className="detail-page">
                {/* LOGO area */}
                <div className="detail-head-area">
                    <img className="header-logo" src="/couchr-logo.png" alt="MovieImage" />
                    <h1>Couchr</h1>
                </div>
                <div className="detail-content-area">
                    {/* movie image area */}
                    <div className="image-area">
                        <img className="image-area-image" src={this.state.movie_detail.poster_path} alt="movie_image" />
                        <div>
                        
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-star image_area_icon" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                    
                            
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="22" fill="currentColor" className="bi bi-heart image_area_icon" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-clock image_area_icon" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                        </div>
                    </div>
                    {/* movie detail area */}
                    <div className="detail-information-area">
                        <div className="detail-movie-name-area">
                            {/* movie title */}
                            <div className="detail-movie-name">
                                <h3>{this.state.movie_detail.title}</h3>
                            </div>
                            {/* movie rating */}
                            <div className="detail-movie-rating">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                                    </svg> {this.state.movie_detail.vote_average}
                                </p>
                            </div>
                        </div>
                        {/* movie original title */}
                        <p className="detail-movie-originaltitle">Original title: {this.state.movie_detail.original_title}</p>
                        {/* movie release year */}
                        <div className="detail-movie-year">
                            <p>Release year : {this.state.movie_detail.release_date}</p>
                        </div>

                        <div>
                            {/* watch trailer button */}
                            <button className="btn btn-danger detail-movie-button">Watch trailer&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                                </svg>
                            </button>

                            {/* add to list dropdown */}
                            <div className="btn-group detail-add-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-bookmark-heart detail-movie-addtolist" viewBox="0 0 16 16" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <path fillRule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z"/>
                                    <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                    <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                </svg>

                                <ul className="dropdown-menu dropdown_list_ul">
                                    {this.state.movie_lists?.map((list, index) => {
                                        return (
                                            <li className="dropdown_list_li" key={index}><p onClick={this.handleAddMovie} key={list.id} id={list.id}>
                                                {list.name}
                                            </p></li>
                                        );
                                    })}

                                    <li><div className="dropdown-divider"></div></li>
                                    {/* <NavLink onClick={this.handleCreateList} className="dropdown-item" to="#">Create New list</NavLink> */}
                                    <li>
                                        <button type="button" className="btn dropdown_list_button" data-bs-toggle="modal" data-bs-target="#listForm">
                                            + New list
                                        </button>
                                    </li>
                                </ul>
                                        <NewList afterSubmit={this.addList} />
                            </div>

                            {/* add review button */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square detail-movie-addtolist" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
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
                        <p className="detail-movie-plot">{this.state.movie_detail.overview}</p>
                        <div>
                            <div className="detail-movie-name">
                                <h5>Details</h5>
                            </div>
                            {/* movie runtime */}
                            <p>Runtime:&nbsp;&nbsp;{this.state.movie_detail.runtime}&nbsp;mins</p>
                        </div>
                    </div>


                    {/* actors and geners area */}
                    <div className="detail-right-area">
                        <div className="detail-movie-name mb-2">
                            <h5>Actors</h5>
                        </div>
                        {/* list actors */}
                        <div>
                            {this.state.actors.map((actor, index) => {
                                return (
                                    <div className="list_actors_area" key={index}>
                                        <div className="detail_actor_img_div">
                                            <img className="detail_actor_img" src={actor.profile_path} alt="ActorImage" />
                                        </div>
                                        <div className="detail_actor_name_div">
                                            &nbsp;&nbsp;{actor.name}&nbsp;&nbsp;... <br /> &nbsp;&#40;{actor.character}&#41;
                                        </div>
                                        {/* &nbsp: space, &#40: left parenthesis, &#41: right parenthesis */}
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <NavLink className="all_actors_link" to="#">&nbsp;&nbsp;&nbsp;&nbsp;More...</NavLink>
                        </div>

                        <div className="detail-movie-name mt-3 mb-2">
                            <h5>Genres</h5>
                        </div>
                        {/* list geners */}

                        {this.state.genres.map((genre, index) => {
                            return (
                                <div className="" key={index}>
                                    <NavLink className="all_actors_link" to="#">{genre.name}</NavLink>
                                </div>
                            );
                        })}

                    </div>
                </div>

                <footer className="detail-footer">
                    <p>@Coucher team&nbsp;&nbsp;2022</p>
                    <p>Contact us :</p>
                    <p>HR-couchr@gmail.com</p>
                </footer>
            </div>
        )
    }
}


export default MovieDetail;