import React from 'react';
import "../index.css";
import MovieColumn from './MovieColumns';
// import Sidebar from './SideBar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DetailLeftArea from '../MovieDetail/DetailLeftArea';

class MovieList extends React.Component {
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
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this)
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
            this.setState({ genres: genreData["genres"]})
            for ( let genre of genreData["genres"]){
                if (genre["id"] == this.state.genre_id){
                    this.setState({genreTitle: genre["name"]})
                }
            }
        } else {
            console.log("Error fetching genres")
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
        let previous = "btn btn-secondary"
        if (this.state.currentPage === 1) {
            previous = previous + "d-none"
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
                    <h1>{this.state.genreTitle}</h1>
                    <div className="row">
                        {this.state.MovieColumn.map((movie, index) => {
                            return (
                                <MovieColumn key={index} list={movie} />
                                );
                            })}
                        <div className='list-btn-div'>
                            <div className="btn-group" role="group" aria-label="Basic example">
                                <button type="button" className={previous} onClick={this.handleClickBack}>Previous Page</button>
                                <button type="button" className="btn btn-secondary" onClick={this.handleClick}>Next Page</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default MovieList;