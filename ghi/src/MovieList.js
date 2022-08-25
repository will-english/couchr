import React from 'react';
import "./index.css";
import MovieColumn from './MovieColumns';


class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            MovieColumn: [[], [], [], []],
        }
    }
    
    async componentDidMount() {
        let movie_id;
        // const MTDB_KET = "742276fc88b89a452ad9c04ac04df00e"
        const result = []
        for (let i=2; i<30; i++){
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
                data.release_date = data.release_date.slice(0,4)

                result.push(data)
            };
        }
        const MovieColumn= [[], [], [], []]
        let i = 0
        for (let data of result) {
            MovieColumn[i].push(data)
            i = i + 1
            if (i > 3) { i = 0 }
        }
        this.setState({MovieColumn: MovieColumn});
    }


    render() {
        return(
            <div className="row">
                {this.state.MovieColumn.map((movie, index) => {
                    return (
                        <MovieColumn key={index} list={movie} />
                    );
                })}
            </div>
        )}}


export default MovieList;