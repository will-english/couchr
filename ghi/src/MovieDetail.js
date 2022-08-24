import { Link } from "react-router-dom";
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
                genres_list += " " + genre.name + ","
            }
            genres_list = genres_list.slice(1,-1)
            // console.log(genres_list)

            // let actors_list = "";
            // for (const actor of credit_data.actors) {
            //     actors_list += " " + genre.name + ","
            // }
            // actors_list = actors_list.slice(1,-1)
            // console.log(actors_list)
            

            this.setState({movie_detail: detail_data});
            this.setState({movie_credit: credit_data});
            this.setState({genres: genres_list});


        };
    }

    render() {
        return(
            <div>
                <p>##################</p>
                <p>name: { this.state.movie_detail.title }</p>
                <p>year: { this.state.movie_detail.release_date }</p>
                <p>rating: { this.state.movie_detail.vote_average }</p>
                <p>picture_url: https://image.tmdb.org/t/p/original{ this.state.movie_detail.poster_path }</p>
                <p>genres: { this.state.genres }</p>
                <p>year: { this.state.movie_detail.release_date }</p>
                
            </div>
        )
    }
}



export default MovieDetail;
