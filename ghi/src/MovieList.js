import React from 'react';
import "./index.css";
import MovieColumn from './MovieColumns';
import Pagination from './pagination';

class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            MovieColumn: [[], [], [], []],
            currentPage: 1,
            moviesPerPage: 28,
            indexOfLastMovie: 0,
            indexOfFirstMovie: 0,
            currentMovies: 0,
            totalMovies: 0,
            movies: [],
        }
        this.paginate = this.paginate.bind(this);
    }

    async componentDidMount() {
        let movie_id;
        // const MTDB_KET = "742276fc88b89a452ad9c04ac04df00e"
        const movies = []
        for (let i = 2; i < 500; i++) {
            movie_id = i;
            const movie_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
            const response = await fetch(movie_url);
            if (response.ok && response.status === 200) {
                const data = await response.json();
                // set movie picture url
                if (data.poster_path === null) {
                    data.poster_path = "/couchr-no-photo.png"
                } else {
                    data.poster_path = "https://image.tmdb.org/t/p/original" + data.poster_path
                }
                data.vote_average = data.vote_average.toFixed(1)
                data.release_date = data.release_date.slice(0, 4)

                movies.push(data)
            };
        }
        this.setState({ movies: movies })
        this.setState({ totalMovies: movies.length })
        const indexOfLastMovie = this.state.currentPage * this.state.moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - this.state.moviesPerPage;
        const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);
        this.setState({ currentMovies: currentMovies })

        const MovieColumn = [[], [], [], []]
        let i = 0
        for (let data of currentMovies) {
            MovieColumn[i].push(data)
            i = i + 1
            if (i > 3) { i = 0 }
        }
        this.setState({ MovieColumn: MovieColumn });
    }
    paginate(pageNumber) {
        this.setState({ currentPage: pageNumber });
        const indexOfLastMovie = pageNumber * this.state.moviesPerPage;
        const indexOfFirstMovie = indexOfLastMovie - this.state.moviesPerPage;
        const movies = this.state.movies;
        console.log(movies);
        console.log(indexOfFirstMovie);
        const currentMovies = movies?.slice(indexOfFirstMovie, indexOfLastMovie);
        console.log(currentMovies)
        const MovieColumn = [[], [], [], []]
        let i = 0
        for (let data of currentMovies) {
            MovieColumn[i].push(data)
            i = i + 1
            if (i > 3) { i = 0 }
        }
        this.setState({ MovieColumn: MovieColumn });
    }


    render() {
        return (
            <>
                <div className="row">
                    {this.state.MovieColumn.map((movie, index) => {
                        return (
                            <MovieColumn key={index} list={movie} />
                        );
                    })}
                </div>
                <Pagination moviesPerPage={this.state.moviesPerPage} totalMovies={this.state.totalMovies} paginate={this.paginate} />
            </>
        )
    }
}


export default MovieList;