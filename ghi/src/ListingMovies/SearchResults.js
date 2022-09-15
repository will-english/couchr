import React, { useState } from "react";
import MovieColumn from "./MovieColumns";
import { useEffect } from "react";
import Sidebar from "./SideBar"
import { AuthContext } from '../auth/auth_provider';



class SearchResults extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props)
        this.state = {
            MovieColumn: [[], [], [], []],
            search_results: [],
            search_query: '',
            movie_lists: []
        }
        this.handleAddMovie = this.handleAddMovie.bind(this)
        this.handleAddMovie2 = this.handleAddMovie2.bind(this)
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


            for (let movie of search_results) {
                if (movie.poster_path === null) {
                    movie.poster_path = "/couchr-no-photo.png"
                } else {
                    movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path
                }
                movie.vote_average = movie.vote_average.toFixed(1)
                movie.release_date = movie.release_date.slice(0, 4)
            }
            this.setState({ search_results: search_results })
            this.setState({ search_query: search_query })

            const MovieColumn = [[], [], [], []]
            let i = 0
            for (let data of search_results) {
                MovieColumn[i].push(data)
                i = i + 1
                if (i > 3) { i = 0 }
            }
            this.setState({ MovieColumn: MovieColumn });
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
    }
    async handleAddMovie(e, movie) {
        e.preventDefault();

        const list_id = e.target.accessKey;
        const movie_list_url = `http://localhost:8000/api/lists/user/${this.context.userName}/${list_id}/movies/`;
        const movieVO = {
            "title": movie.title,
            "poster": movie.poster_path,
            "api_id": movie.id,
            "add": true
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
        const movieObj = {
            "title": movie.title,
            "poster": movie.poster_path,
            "api_id": movie.id,
            "add": true
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
    render() {
        if (this.state.search_results.length > 0) {
            return (
                <div className="wrapper ">
                    <div>
                        <Sidebar />
                    </div>
                    <div className="container">
                        <div className="row">
                            {this.state.MovieColumn.map((movie, index) => {
                                return (
                                    <MovieColumn key={index} list={movie} default={true} movie_lists={this.state.movie_lists} handleAddMovie={this.handleAddMovie} handleAddMovie2={this.handleAddMovie2}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <>
                    <div>
                        <Sidebar />
                    </div>
                    <div className="no-results">
                        <h1>Couchr could not find any movies with that name</h1>
                        <h3>Are you sure you spelled everything correctly?</h3>
                        <img src="/sad-couchr-transparent.png" alt="img" width="400px" />
                    </div>
                </>
            )
        }
    }
}
export default SearchResults;