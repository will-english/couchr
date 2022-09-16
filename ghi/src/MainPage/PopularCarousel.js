import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';



export default class ControlledCarousel extends Component {
    constructor() {
        super();
        this.state = {
            popular: [],
            index: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    async componentDidMount() {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            const popular = data["results"].slice(0, 19)
            for (let movie of popular){
                movie.link = "movies/movie/" + movie.id + "/"
                movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path
            }
            this.setState({ popular: popular })
        }
    }

    handleSelect(selectedIndex, e) {
        this.setState({ index: selectedIndex})
    }
    
    
    render() {
        return (
            <div>
                <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                    {this.state.popular.map((movie, index) => (
                            <Carousel.Item key={index} className="carousel-slide" >
                                <a href={movie.link}>
                                    <div className='mydiv'>
                                        <img className='slide-photo'
                                            src={movie.poster_path}
                                            alt="First slide"
                                        />
                                    </div>
                                </a>
                                <div>
                                    <Carousel.Caption className='carousel-caption'>
                                        <p>{movie.overview}</p>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                )
            )}
            </Carousel>
            </div>
        );
    }
}
