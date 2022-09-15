import * as React from "react";
import { AuthContext } from '../auth/auth_provider';
import DetailLeftArea from "./DetailLeftArea";
import DetailMiddleArea from "./DetailMiddleArea";
import DetailRightArea from "./DetailRightArea";
import "../CSSfile/DetailPage.css";


class MovieDetail extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            movie_detail: {},
            movie_credit: {},
            movie_list_id: '',
            movie_lists: [],
            movie: {},
            genres: [],
            actors: [],
            poster: '',
            is_in_liked_list: false,
            is_in_watched_list: false,
            is_in_wished_list: false,

        }

        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleAddMovie = this.handleAddMovie.bind(this);
        this.addList = this.addList.bind(this);
        this.changeIcon = this.changeIcon.bind(this);
    }


    async componentDidMount() {
        const currentURL = window.location.href
        const words = currentURL.split("/")
        const movie_id = words[5]
        
        const movie_detail_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;
        const movie_credit_rul = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

        const response_detail = await fetch(movie_detail_url);
        const response_credit = await fetch(movie_credit_rul);
        
        
        try {
            const movie_lists_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${this.context.userName}/`;
            const request = await fetch(movie_lists_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${this.context.token}`
                },
            });
            if (request.ok) {
                const users_movie_lists = await request.json();
                this.setState({ movie_lists: users_movie_lists.lists });
            }
        }
        catch (err) {
            console.log("error")
        }
        
        const userName = this.context.userName
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
            let poster = ''
            if (detail_data.poster_path !== null) {
                detail_data.poster_path = "https://image.tmdb.org/t/p/original" + detail_data.poster_path
                console.log(detail_data.poster_path)
                this.setState({ 'poster': detail_data.poster_path })
                poster  = detail_data.poster_path;
            } else {
                detail_data.poster_path = "/couchr-no-photo.png"
            }

            detail_data.vote_average = detail_data.vote_average.toFixed(1)
            detail_data.release_date = detail_data.release_date.slice(0, 4)

            const title = detail_data.title
            this.setState(
                {
                    movie_detail: detail_data,
                    movie_credit: credit_data,
                    genres: genres_list,
                });
            console.log(this.state.poster)
            const movie = {
                "title": title,
                'poster': poster,
                "api_id": movie_id,
                "add": true,
                "release_date": detail_data.release_date,
                "vote_average": detail_data.vote_average
            }
            console.log(movie)

            this.setState({ movie: movie })
        };

        
        try {
            const liked_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/liked/`;
            const wished_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/want-to-watch/`;
            const watched_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${userName}/watched/`;
            
            const likedrequest = await fetch(liked_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${this.context.token}`
                },
            });
            const wishedrequest = await fetch(wished_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${this.context.token}`
                },
            });
            const watchedrequest = await fetch(watched_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${this.context.token}`
                },
            });
            if (likedrequest.ok && watchedrequest.ok && wishedrequest.ok) {
                const users_liked = await likedrequest.json();
                const users_wished = await wishedrequest.json();
                const users_watched = await watchedrequest.json();
                const liked_movies = users_liked.list.movies
                const watched_movies = users_watched.list.movies
                const wished_movies = users_wished.list.movies
                for(let movie of liked_movies){
                    console.log(movie)
                    if (movie.poster == this.state.poster){
                        this.setState({is_in_liked_list: true})
                    }
                }
                for (let movie of watched_movies){
                    if (movie.poster == this.state.poster){
                        this.setState({is_in_watched_list: true})
                    }
                }
                for (let movie of wished_movies){
                    if(movie.poster == this.state.poster){
                        this.setState({is_in_wished_list: true})
                    }
                }
            }
        }
        catch (err) {
            console.log(err)
        }

        
    }

    handleStateChange(event) {
        const id = event.target.id;
        const value = event.target.value;
        this.setState({ [id]: value });
    }


    //How to add the current move to one of the lists
    async handleAddMovie(event) {
        event.preventDefault();
        console.log(('inside add movie movie detail'))
        // get the URL to send the JSON to
        const list_id = event.target.id;
        const movie_list_url = `http://localhost:8000/api/lists/user/${this.context.userName}/${list_id}/movies/`;

        // get the movie ID
        const currentURL = window.location.href
        const words = currentURL.split("/")
        const api_id = words[5]

        // create the JSON object body
        const movie = {
            "title": this.state.movie_detail.title,
            'poster': this.state.poster,
            "api_id": api_id,
            "add": true,
            "release_date": this.state.movie.release_date,
            "vote_average": this.state.movie.vote_average
        }

        this.setState({ movie: movie })

        // Turn the JSON object into a JSON string and then send it in the PUT method
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(movie),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.token}`
            },
        };

        // call the PUT method
        const response = await fetch(movie_list_url, fetchConfig)
        console.log(response)
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

    changeIcon(icon) {
        const dict = { [icon] : true }
        this.setState(dict);
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
                    <DetailLeftArea movie={this.state.movie_detail} movie_obj={this.state.movie} afterSubmit={this.changeIcon} is_in_liked_list={this.state.is_in_liked_list} is_in_watched_list={this.state.is_in_watched_list} is_in_wished_list={this.state.is_in_wished_list}/>
                    <DetailMiddleArea movie={this.state.movie_detail} movie_lists={this.state.movie_lists} add_list={this.addList} handleAddMovie={this.handleAddMovie} movie_add={this.state.movie}/>
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