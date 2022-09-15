import React from 'react';
import "../index.css";
import MovieColumn from './MovieColumns';
// import Sidebar from './SideBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DetailLeftArea from '../MovieDetail/DetailLeftArea';
import { AuthContext } from '../auth/auth_provider';
import DropdownItem from "react-bootstrap/DropdownItem";
import "../CSSfile/MovieColumns.css";

class MovieList extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            MovieColumn: [[], [], [], []],
            currentPage: 1,
            moviesPerPage: 20,
            movies: [],
            genre_id: '',
            prevPage: 1,
            prevGenre: "",
            genres: [],
            genreTitle: "",
            movie_lists: []
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this)
        this.handleAddMovie = this.handleAddMovie.bind(this)
        this.handleAddMovie2 = this.handleAddMovie2.bind(this)
    }

    async componentDidMount() {

        
        const currentURL = window.location.href;
        const urlWords = currentURL.split("/")
        const getgenre_id = urlWords[4]
        this.setState({ genre_id: getgenre_id })
        this.setState({ prevGenre: getgenre_id})
        const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
        const genreResponse = await fetch(genreUrl);
        if( genreResponse.ok){
            const genreData = await genreResponse.json();
            const genres = genreData["genres"]
            for (let i = 0; i < genres.length; i++){
                if (genres[i]["name"] === "Romance" || genres[i]["name"]==="Documentary"){
                    genres.splice(i,1)
                }
            }
            this.setState({ genres: genres})
            for ( let genre of genreData["genres"]){
                if (genre["id"] == this.state.genre_id){
                    this.setState({genreTitle: genre["name"]})
                }
            }
        } else {
            console.log("Error fetching genres")
        }
        try {
            const movie_lists_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${this.context.userName}/`;
            const request = await fetch(movie_lists_url, {
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${this.context.token}`
                },
            });
            if (request.ok) {
                const response_lists = await request.json();
                this.setState({ movie_lists: response_lists.lists });
            }
        }
        catch (err) {
            console.log("error")
        }
        
        const listByGenreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currentPage}&with_genres=${this.state.genre_id}&with_watch_monetization_types=flatrate`
        const response = await fetch(listByGenreUrl);
        if (response.ok) {
            const data = await response.json()

            const movielist = data["results"]

            for (let movie of movielist) {
                if (movie.poster_path === null) {
                    movie.poster_path = "/couchr-no-photo.png"
                } else {
                    movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path
                }
                movie.vote_average = movie.vote_average.toFixed(1)
                movie.release_date = movie.release_date.slice(0, 4)
            }
            this.setState({ movies: movielist })

            const MovieColumn = [[], [], [], []]
            let i = 0
            for (let data of movielist) {
                MovieColumn[i].push(data)
                i = i + 1
                if (i > 3) { i = 0 }
            }
            this.setState({ MovieColumn: MovieColumn });
        }
    }
    handleClick() {
        let newPage = this.state.currentPage + 1
        this.setState({ currentPage: newPage })
    }
    handleClickBack() {
        let newPage = this.state.currentPage - 1
        this.setState({currentPage: newPage})
    }

    handleClickGenre(id) {
        let newGenreId = id
        this.setState({genre_id: newGenreId})
    }

    async handleAddMovie(e, movie) {
        e.preventDefault();

        const list_id = e.target.accessKey;
        const movie_list_url =  `http://localhost:8000/api/lists/user/${this.context.userName}/${list_id}/movies/`;
        const movieVO = {
            "title": movie.title,
            "poster": movie.poster_path,
            "api_id": movie.id,
            "add": true,
            "release_date": movie.release_date,
            "vote_average": movie.vote_average
        }
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(movieVO),
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.context.token}`
            },
        };
        const response = await fetch(movie_list_url, fetchConfig)
        if (response.ok) {
            document.getElementById(`confirmation-check ${list_id} ${movie.id}`).className = ""
            setTimeout(function () {
                document.getElementById(`confirmation-check ${list_id} ${movie.id}`).className = "d-none";
            }, 3000);
        }
    };

    async handleAddMovie2(e, movie) {
        e.preventDefault();

        const url = `${process.env.REACT_APP_ACCOUNTS_HOST}/api/lists/user/${this.context.userName}/${e.target.id}/`;
        const movieObj= {
            "title": movie.title,
            "poster": movie.poster_path,
            "api_id": movie.id,
            "add": true,
            "release_date": movie.release_date,
            "vote_average": movie.vote_average
        }
        const request = await fetch(url, {
            method: "put",
            credentials: "include",
            body: JSON.stringify(movieObj),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.context.token}`
            },
        });
        if (request.ok) {
            document.getElementById(`${e.target.id} ${movie.id}`).className = ""
            setTimeout(function () {
                document.getElementById(`${e.target.id} ${movie.id}`).className = "d-none";
            }, 3000);
        }

        }

    async componentDidUpdate() {
        if (this.state.prevPage !== this.state.currentPage || this.state.genre_id !== this.state.prevGenre ) {
            this.setState({ prevGenre: this.state.genre_id})
            this.setState({prevPage: this.state.currentPage})
            for (let genre of this.state.genres){
                if ( genre["id"] == this.state.genre_id){
                    this.setState({genreTitle: genre["name"]})
                }
            }
            const listByGenreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.currentPage}&with_genres=${this.state.genre_id}&with_watch_monetization_types=flatrate`
            const response = await fetch(listByGenreUrl);
            if (response.ok) {
                const data = await response.json()

                const movielist = data["results"]
                for (let movie of movielist) {
                    if (movie.poster_path === null) {
                        movie.poster_path = "couchr-no-photo.png"
                    } else {
                        movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path
                    }
                    movie.vote_average = movie.vote_average.toFixed(1)
                    movie.release_date = movie.release_date.slice(0, 4)
                }
                this.setState({ movies: movielist })

                const MovieColumn = [[], [], [], []]
                let i = 0
                for (let data of movielist) {
                    MovieColumn[i].push(data)
                    i = i + 1
                    if (i > 3) { i = 0 }
                }
                this.setState({ MovieColumn: MovieColumn });
                this.setState({prevPage: this.state.currentPage})
                this.setState({ prevGenre: this.state.genre_id})
            }

        }
    }
    render() {
        let previous = "btn btn-primary"
        if (this.state.currentPage === 1) {
            previous = "d-none"
        }
        return (
            <>
                <div className='container'>
                    <DropdownButton className="dropdown-basic-button " title="Explore Other Genres">
                        {this.state.genres.map((genre, index) => {
                            return (
                                <Dropdown.Item key={index} onClick={() => this.handleClickGenre(genre.id)}>{genre.name}</Dropdown.Item>
                            )
                        })}
                    </DropdownButton>
                </div>
                <div className='container' >
                    <h1 className='genre-title'>{this.state.genreTitle}</h1>
                    <div className="row">
                        {this.state.MovieColumn.map((movie, index) => {
                            return (
                                <MovieColumn key={index} list={movie} default={true} movie_lists={this.state.movie_lists} handleAddMovie={this.handleAddMovie} handleAddMovie2={this.handleAddMovie2}/>
                                );
                            })}
                        <div className='list-btn-div'>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className={previous} onClick={this.handleClickBack}>Previous Page</button>
                                <button type="button" className="btn btn-primary" onClick={this.handleClick}>Next Page</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default MovieList;