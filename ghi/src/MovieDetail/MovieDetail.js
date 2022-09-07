import * as React from "react";
import "../index.css";
import { AuthContext } from '../auth/auth_provider';
import DetailLeftArea from "./DetailLeftArea";
import DetailMiddleArea from "./DetailMiddleArea";
import DetailRightArea from "./DetailRightArea";

class MovieDetail extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props)
        this.state = {
            movie_detail: {},
            movie_credit: {},
            movie_list_id: '',
            movie_lists: [],
            genres: [],
            actors: [],
        }

        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);
        this.addList = this.addList.bind(this);
    }


    async componentDidMount() {
        
        const currentURL = window.location.href
        const words = currentURL.split("/")
        const movie_id = words[5]


        const movie_detail_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const movie_credit_rul = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

        const response_detail = await fetch(movie_detail_url);
        const response_credit = await fetch(movie_credit_rul);

        
        const movie_lists_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${this.context.userName}/`;
        // console.log("movie_lists_url: ", movie_lists_url)
        const request = await fetch(movie_lists_url, {
            credentials: "include",
            headers: {
                Authorization: `Bearer ${this.context.token}`
            },
        });
        // console.log("request: ", request)

        const response_lists = await request.json();
        if (response_lists.ok) {
            // console.log("~~~~~response_lists.ok~~~~~")
            const lists_data = await response_lists.json();
            this.setState({ movie_lists: lists_data.lists });

        }


        if (response_detail.ok && response_credit.ok) {
            const detail_data = await response_detail.json();
            const credit_data = await response_credit.json();


            //set actors
            let actors = [];
            for (const actor of credit_data.cast.slice(0, 5)) {
                let actor_detail = {};
                actor_detail["name"] = actor.name;
                actor_detail["profile_path"] = "https://image.tmdb.org/t/p/original" + actor.profile_path;
                actor_detail["character"] = actor.character
                actors.push(actor_detail)
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
                console.log(detail_data.poster_path)
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
        const movie_list_url = `http://localhost:8000/api/lists/users/${list_id}/movies/`;

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
            // console.log("response ok")
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
    addList(list) {
        const lists = this.state.movie_lists
        lists.push(list)
        this.setState({ movie_lists: lists });
    }

    render() {
        return (
            <div className="detail_page">

                {/* LOGO area */}
                <div className="detail_logo_area">
                    <img className="detail_header_logo" src="/couchr-logo.png" alt="LogoImage" />
                    <h1>Couchr</h1>
                </div>

                {/* Detail area */}
                <div className="detail_content_area">
                    <DetailLeftArea movie={this.state.movie_detail} />
                    <DetailMiddleArea movie={this.state.movie_detail} movie_lists={this.state.movie_lists} add_list={this.addList} handleAddMovie={this.handleAddMovie} />
                    <DetailRightArea actors={this.state.actors} genres={this.state.genres} />
                </div>

                {/* Footer area */}
                <footer className="detail_footer">
                    <p>@Coucher team&nbsp;&nbsp;2022</p>
                    <p>Contact us :</p>
                    <p>HR-couchr@gmail.com</p>
                </footer>

            </div>
        )
    }
}


export default MovieDetail;