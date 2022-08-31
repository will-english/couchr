import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Component } from 'react';


export default class ControlledCarousel extends Component {
    constructor() {
        super();
        this.state = {
            popular: [],
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log("xxxxxxxxx",data)
            const popular = data.slice(0,3)
            this.setState({popular: popular})
            }
        }

    render() {
        return (
            <div>
                {this.state.popular.map((movie, index) => {
                    return (
                        <Carousel activeIndex={index} onSelect={handleSelect}>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src= {movie.poster_path}
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item> 
                        </Carousel>
                    )
                })}   
            </div>
          );
    }
}
