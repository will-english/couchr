import MovieColumn from "../ListingMovies/MovieColumns";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ControlledCarousel from "./PopularCarousel";
import ControlledCarousel2 from "./CouchrCarousel";
import SideBar from "../ListingMovies/SideBar";
import "../index.css";


function MainPage() {
  // const [popular, setPopular] = useState([]);
  // // const [genres, setGenres] = React.useState('');
  // // const [picks, setPicks] = React.useState('');
  // // const [error, setError] = React.useState('');
  // const [MovieColumns, setMovieColumns] = useState();
  // let [Page, setPage] = useState(1);

  // const getPopular = async () => {
  //   const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
  //   const response = await fetch(url);
  //   if (response.ok) {
  //     const data = await response.json();
  //     setPopular(data["results"]);
  //   }
  //   else {
  //     console.log("There was a problem with the response")
  //   }
  //   if (popular.length > 0) {
  //     const MovieColumn = [[], [], [], []]
  //     let i = 0
  //     for (let data of popular) {
  //       i = i + 1;
  //       if (i > 3) { i = 0 }
  //       if (data.poster_path === null) {
  //         data.poster_path = "/couchr-no-photo.png"
  //       } else {
  //         data.poster_path = "https://image.tmdb.org/t/p/original" + data.poster_path
  //       }
  //       // data.vote_average = data.vote_average.toFixed(1);
  //       data.release_date = data.release_date.slice(0, 4);
  //       data.movie_link = "/movies/movie/" + data.id + "/";
  //       MovieColumn[i].push(data);
  //     }
  //     setMovieColumns(MovieColumn);
  //   }

  // }


  // useEffect(() => {
  //   getPopular()
  //     .catch(console.error);;
  // }, [popular.length],
  // console.log(popular)
  // );




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
              {/* <Link to='https://www.hackreactor.com/learn-python-learn-javascript' /> */}
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
