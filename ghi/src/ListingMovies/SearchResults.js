import React, { useState } from "react";
import MovieColumn from "./MovieColumns";
import { useEffect } from "react";


class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            MovieColumn: [[], [], [], []],
            search_results: [],
            search_query: '',
        }
    }

    async componentDidMount() {
        const currentURL = window.location.href;
        const urlWords = currentURL.split("/")
        const search_query = urlWords[4]
        console.log(search_query)
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${search_query}&page=1&include_adult=false`
        const response = await fetch(url)
        if (response.ok) {
            const search = await response.json()
            const search_results = search["results"]

            
            for (let movie of search_results){
                if (movie.poster_path === null){
                    movie.poster_path = "/couchr-no-photo.png"
                } else {
                    movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path
                }
                movie.vote_average = movie.vote_average.toFixed(1)
                movie.release_date = movie.release_date.slice(0,4)
            }
        this.setState({ search_results: search_results})
        this.setState({ search_query: search_query})

        const MovieColumn = [[], [], [], []]
        let i = 0
        for (let data of search_results) {
            MovieColumn[i].push(data)
            i = i + 1
            if (i > 3) { i = 0 }
        }
        this.setState({ MovieColumn: MovieColumn });
        }
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
            
            </>
        )
    }
}
export default SearchResults;