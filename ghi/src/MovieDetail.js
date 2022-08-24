import { Link } from "react-router-dom";
import * as React from "react";
import "./movieDetail.css";


class MovieDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movie_detail: {},
            movie_credit: {},
            genres: "",
            actors: [],
        }
    }

    async componentDidMount() {
        const currentURL = window.location.href
        console.log(currentURL)
        const movie_id = currentURL.slice(-2,-1)
        console.log(movie_id)

        const movie_detail_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const movie_credit_rul = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

        const response_detail = await fetch(movie_detail_url);
        const response_credit = await fetch(movie_credit_rul);

        if (response_detail.ok && response_credit.ok) {
            const detail_data = await response_detail.json();
            const credit_data = await response_credit.json();

            let genres_list = "";
            for (const genre of detail_data.genres) {
                genres_list += " " + genre.name + " "
            }
            genres_list = genres_list.slice(1,-1)
            // console.log(genres_list)

            // let actors_list = "";
            // for (const actor of credit_data.actors) {
            //     actors_list += " " + genre.name + ","
            // }
            // actors_list = actors_list.slice(1,-1)
            // console.log(actors_list)
            
            detail_data.poster_path = "https://image.tmdb.org/t/p/original" + detail_data.poster_path
            detail_data.vote_average = detail_data.vote_average.toFixed(1)
            detail_data.release_date = detail_data.release_date.slice(0,4)

            this.setState({movie_detail: detail_data});
            this.setState({movie_credit: credit_data});
            this.setState({genres: genres_list});


        };
    }

    render() {
        return(
            <div className="detail-page">
                <div className="detail-head-area">
                    <h1>Couchr heading area...</h1>
                </div>
                <div className="detail-content-area">
                    <div className="image-area">
                        <img className="image-area-image" src={ this.state.movie_detail.poster_path } alt="movie_image"/>
                    </div>
                    <div className="detail-information-area">
                        <div className="detail-movie-name-area">
                            <div className="detail-movie-name">
                                <h3>{ this.state.movie_detail.title }</h3>
                            </div>
                            <div className="detail-movie-rating">
                                <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                                    </svg> { this.state.movie_detail.vote_average }</p>
                            </div>
                        </div>
                        <p className="detail-movie-originaltitle">Original title: { this.state.movie_detail.original_title }</p>

                        <div className="detail-movie-year">
                            <p>Release year : { this.state.movie_detail.release_date }</p>
                        </div>
                       
                        <div>
                            <button className="btn btn-danger detail-movie-button">Watch trailer&nbsp;&nbsp;
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play" viewBox="0 0 16 16">
                                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                                </svg>
                            </button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-bookmark-heart detail-movie-addtolist" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil-square detail-movie-addtolist" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </div>


                        <p className="detail-movie-plot">{ this.state.movie_detail.overview }</p>
                        
                        <div>
                            <div className="detail-movie-name">
                                <h5>Details</h5>
                            </div>
                            <p>Runtime:&nbsp;&nbsp;{ this.state.movie_detail.runtime }&nbsp;mins</p>
                        </div>
                        
                        
                        {/* <p>year: { this.state.movie_detail.release_date }</p>
                        <p>picture_url: { this.state.movie_detail.poster_path }</p>
                        <p>genres: { this.state.genres }</p>
                        <p>plot: { this.state.movie_detail.overview }</p>
                        <p>runtime: { this.state.movie_detail.runtime }</p>
                        <p>year: { this.state.movie_detail.release_date }</p>
                        <button className="btn btn-danger m-2">Add to list</button> */}
                    </div>
                    <div className="detail-right-area">
                        <div className="detail-movie-name mb-2">
                            <h5>Actors</h5>
                        </div>
                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                           </svg> actor</p>
                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                           </svg> actor</p>
                        <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                            <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                           </svg> actor</p>
                        <div className="detail-movie-name mt-3 mb-2">
                            <h5>Genres</h5>
                        </div>
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
