import MovieColumn from "../ListingMovies/MovieColumns";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ControlledCarousel from "./PopularCarousel";
import ControlledCarousel2 from "./CouchrCarousel";
import SideBar from "../ListingMovies/SideBar";
import "../index.css";


function MainPage() {
  return (
    <div className="wrapper">
      <div>
        <SideBar />
      </div>
      <div className="container">
        <div className="carousel">
          <h1 className="main-page-header text-center">Today's Top Movies</h1>
          <ControlledCarousel />
        </div>
      </div>
      <div>
        <div id='sticky-sidebar' className='ad'>
          <a href="https://www.hackreactor.com/learn-python-learn-javascript">
            <button className="ad-btn btn btn-danger">Join Today
            </button>
          </a>
          </div> 
      </div>
      <div>
      </div>
      <div className="container" id="test">
        <div className="couchr-carousel" id="couchr-carousel">
        <h1 className="main-page-header text-center">Couchr's Picks</h1>
          <ControlledCarousel2 />
        </div>
      </div>
    </div>

  );
}

export default MainPage;
