import * as React from "react";
import "./index.css";


class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie_detail: {},
            movie_credit: {},
            genres: "",
            actors: [],
            movie_list_id: '',
            movie_lists: [],
            add_movie_success: false,
        }
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);
    }
    
    async componentDidMount() {
        const currentURL = window.location.href
        const words = currentURL.split("/")
        const movie_id = words[5]
        
        const movie_detail_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const movie_credit_rul = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const movie_lists_url = `http://localhost:8000/api/lists/`

        const response_detail = await fetch(movie_detail_url);
        const response_credit = await fetch(movie_credit_rul);
        const response_lists = await fetch(movie_lists_url);

        if (response_detail.ok && response_credit.ok) {
            const detail_data = await response_detail.json();
            const credit_data = await response_credit.json();
            const lists_data = await response_lists.json();
            //set geners
            let genres_list = "";
            for (const genre of detail_data.genres) {
                genres_list += " " + genre.name + " "
            }
            genres_list = genres_list.slice(1,-1)
            //set movie picture url
            if (detail_data.poster_path !== null){
                detail_data.poster_path = "https://image.tmdb.org/t/p/original" + detail_data.poster_path
            } else {
                detail_data.poster_path = "/couchr-no-photo.png"
            }

            detail_data.vote_average = detail_data.vote_average.toFixed(1)
            detail_data.release_date = detail_data.release_date.slice(0,4)
            
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
        // console.log("event.target: ", event.target)
        const id = event.target.id;
        // console.log("id: ", id)
        const value = event.target.value;
        // console.log("value: ", value)
        this.setState({[id]: value});
    }

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
            this.setState({add_movie_success: true})

        }
    }

    async handleCreateList(event) {
        event.preventDefault();
    }

    render() {
        return(
            <div className="detail-page">
                {/* LOGO area */}
                <div className="detail-head-area">
                    <img className="header-logo" src="/couchr-logo.png" alt="MovieImage" />
                    <h1>Couchr</h1>
                </div>
                <div className="detail-content-area">
                    {/* movie image area */}
                    <div className="image-area">
                        <img className="image-area-image" src={ this.state.movie_detail.poster_path } alt="movie_image"/>
                    </div>
                    {/* movie detail area */}
                    <div className="detail-information-area">
                        <div className="detail-movie-name-area">
                            {/* movie title */}
                            <div className="detail-movie-name">
                                <h3>{ this.state.movie_detail.title }</h3>
                            </div>
                            {/* movie rating */}
                            <div className="detail-movie-rating">
                                <p>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg> { this.state.movie_detail.vote_average }
                                </p>
                            </div>
                        </div>
                        {/* movie original title */}
                        <p className="detail-movie-originaltitle">Original title: { this.state.movie_detail.original_title }</p>
                        {/* movie release year */}
                        <div className="detail-movie-year">
                            <p>Release year : { this.state.movie_detail.release_date }</p>
                        </div>
                       
                        <div>
                            {/* watch trailer button */}
                            <button className="btn btn-danger detail-movie-button">Watch trailer&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                                </svg>
                            </button>
                            {/* add to list button */}
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="16" fill="currentColor" className="bi bi-bookmark-heart detail-movie-addtolist" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                    </svg> */}
                            <div className="btn-group detail-add-button">
                                {/* <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Add to My Movies
                                </button> */}
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className="bi bi-bookmark-heart detail-movie-addtolist" viewBox="0 0 16 16" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <path fillRule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                    </svg>
                                <div className="dropdown-menu">
                                    {this.state.movie_lists.map(list => {
                                        return (
                                            <a onClick={this.handleAddMovie} className="dropdown-item" key={list.id} id={list.id}>
                                                {list.name}
                                            </a>
                                        );
                                    })}
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Create New list</a>
                                </div>
                            </div>
                            {/* add review button */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-pencil-square detail-movie-addtolist" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </div >
                        {/* pop-up message */}
                        <div  id="popup_message_id" className={this.state.add_movie_success? "alert alert-success popup_message" : "d-none"} role="alert">
                            You just added a new movie to your list!
                        </div>
                        {/* movie description */}
                        <p className="detail-movie-plot">{ this.state.movie_detail.overview }</p>
                        <div>
                            <div className="detail-movie-name">
                                <h5>Details</h5>
                            </div>
                            {/* movie runtime */}
                            <p>Runtime:&nbsp;&nbsp;{ this.state.movie_detail.runtime }&nbsp;mins</p>
                        </div>
                    </div>
                    {/* actors and geners area */}
                    <div className="detail-right-area">
                        <div className="detail-movie-name mb-2">
                            <h5>Actors</h5>
                        </div>
                        {/* list actors */}
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                           </svg> actor
                        </p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            </svg> actor
                        </p>
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            </svg> actor
                        </p>
                        <div className="detail-movie-name mt-3 mb-2">
                            <h5>Genres</h5>
                        </div>
                        {/* list geners */}
                        <p>{ this.state.genres }</p>

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