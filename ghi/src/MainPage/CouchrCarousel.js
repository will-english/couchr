import React from "react";
import Carousel from "react-bootstrap/Carousel"
import { Component } from "react"
import CarouselItem from "react-bootstrap/esm/CarouselItem";

export default class ControlledCarousel2 extends Component {
    constructor () {
        super();
        this.state = {
            movies: [],
            index: 0
        };
        this.handleSelect = this.handleSelect.bind(this);

    }


    async componentDidMount() {
        let movie_id;
        const movielist = []
        const couchr_ids = [673, 316029, 264660, 120467, 857, 64690, 2501, 324857, 313369, 447332, 27205, 1726, 278, 129, 11688]
        for (let id of couchr_ids){
            const movie_url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`
            const response = await fetch(movie_url);
            if (response.ok && response.status === 200) {
                const data = await response.json();
                if (data.poster_path === null) {
                    data.poster_path = "/couchr-no-photo.png"
                } else {
                    data.poster_path = "https://image.tmdb.org/t/p/original" + data.poster_path
                }
                data.vote_average = data.vote_average.toFixed(1)
                data.release_date = data.release_date.slice(0, 4)

                movielist.push(data)
            }
        }
        this.setState({ movies: movielist})
        
    }

    handleSelect(selectedIndex, e) {
        this.setState({ index: selectedIndex})
    }
    render() {
        return (
            <div>
                <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                    {this.state.movies.map((movie, index) => (
                        <Carousel.Item key={index} className="carousel-slide">
                            <div className="mydiv">
                                <img className="slide-photo"
                                    src={movie.poster_path}
                                    alt="movie_poster"
                                />
                            </div>
                            <div>
                                <Carousel.Caption className="carousel-caption">
                                    <p>{movie.overview}</p>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        )
    }
}