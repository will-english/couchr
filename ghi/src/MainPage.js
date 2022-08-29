import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import * as React from "react";
import "./index.css";
import MovieColumn from "./MovieColumns";


function MainPage() {
  const [popular, setPopular] = React.useState('');
  const [genres, setGenres] = React.useState('');
  const [picks, setPicks] = React.useState('');
  const[error, setError] = React.useState('');
  // const [MovieColumns, setMovieColumns] = React.useState('');

  React.useEffect(()=> {
    async function getPopular() {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
      const response = await fetch(url);
      if (response.ok){
        const data = await response.json();
        setPopular(data["results"]);
      }
      else{
        setError("There was a problem with the response")
      }
    }
    getPopular();
  }, [setPopular, setError],
  console.log(popular));


  const movieCard = 
    <div key={popular.id} className="movie-card mb-3 shadow">
        {/* clickable image => movie detail page */}
        <Link to={popular.movie_link}>
          <img src={popular.poster_path} className="card-img-top list-card-image" width="50" alt="img" />
        </Link>
        <div className="card-body">
          {/* movie title */}
          <h5 className="card-title align-middle">{popular.title} ({popular.release_date})<br/><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
            </svg>{popular.vote_average}
          </h5>
        </div>
    </div>



  // array of N elements, where N is the number of rows needed
  const rows = [...Array( Math.ceil(popular.length / 4) )];
  // chunk the products into the array of rows
  const popularRows = rows.map( (row, idx) => popular.slice(idx * 4, idx * 4 + 4) );
  // map the rows as div.row
  const popularMovies = popularRows.map((row, idx) => (
      <div className="row" key={idx}>    
        { row.map( popular => 
            {if (popular.poster_path === null) {
              popular.poster_path = "/couchr-no-photo.png"
          } else {
              popular.poster_path = "https://image.tmdb.org/t/p/original" + popular.poster_path
          }},
          popular.vote_average = popular.vote_average.toFixed(1),
          popular.release_date = popular.release_date.slice(0, 4),
          popular.movie_link = "/movies/movie/" + popular.id + "/",
           <article key={popular.id} className="col-md-3">{ movieCard }</article> )}
      </div> )
  );
  
  
  
  return (
    <div className="px-4 mt-5 text-center">
      <h1>Couchr!</h1>
      <div>
        {popularMovies}
      </div>
    </div>
  );
}

export default MainPage;
