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
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log("xxxxxxxxx",data)
            const popular = data["results"].slice(0, 19)
            console.log(popular)
            for (let movie of popular){
                movie.poster_path = "https://image.tmdb.org/t/p/original" + movie.poster_path
            }
            this.setState({ popular: popular })
        }
    }
    handleSelect(event) {
        if (this.state.index < 18){
            this.setState({ index: this.state.index + 1})
        }
        else{
            this.setState({index: 0})
        }
    }
    render() {
        return (
            <div>
                <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
                    {this.state.popular.map((movie, index) => (
                            <Carousel.Item key={index} className="carousel-slide" > 
                                <div className='mydiv'>
                                    <img className='slide-photo'
                                        src={movie.poster_path}
                                        alt="First slide"
                                    />
                                </div>
                                <div>
                                    <Carousel.Caption className='carousel-caption bg-dark'>
                                        <h3>{movie.title}</h3>
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
