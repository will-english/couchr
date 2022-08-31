import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';

function ControlledCarousel() {
    const [index, setIndex] = useState(0);
    const [popular, setPopular] = useState([]);


    const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
    }

    const getPopular = async () => {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setPopular(data["results"][0, 3]);
            for (let data of popular) {
                data.poster_path = "https://image.tmdb.org/t/p/original" + data.poster_path
            }
        }


  };

  useEffect(() => {
    getPopular();
  }, [],
    console.log(popular));

  return (
    <>
        {popular.map((movie, index) => {
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
    </>
  );
}

export default(ControlledCarousel);