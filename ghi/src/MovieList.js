import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";

class MovieList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: []
        }
    }

    
    async componentDidMount() {
        let movie_id;
        // const MTDB_KET = "742276fc88b89a452ad9c04ac04df00e"
        const result = []
        for (let i=2; i<10; i++){
            movie_id = i;
            const movie_url = `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
            console.log(movie_url)
            const response = await fetch(movie_url);
            if (response.ok && response.status === 200) {
                const data = await response.json();
                // data.movie_detail_url = `movie/${data.id}/`
                result.push(data)
                console.log(movie_id)
                console.log(data)
            };
            this.setState({movies: result});
        }
    }


    render() {
        return(
        <div>
            {this.state.movies.map(movie => {
                return (
                    <Link to={"movie/" + movie.id + "/"} key={movie.id} className="btn btn-primary m-2">
                        <div>
                            <p>##################</p>
                            <p>movie_name: { movie.title }</p>
                            <p>movie_rate: { movie.vote_average }</p>
                            <p>movie_id: { movie.id }</p>
                         
                        </div>
                    </Link>
                );
            })}
        </div>
        )
    }
}


export default MovieList;