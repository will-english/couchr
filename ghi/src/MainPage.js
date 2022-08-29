import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import * as React from "react";
import "./index.css";

function MainPage() {
  const [popular, setPopular] = React.useState('');
  const [genres, setGenres] = React.useState('');
  const [picks, setPicks] = React.useState('');
  const[error, setError] = React.useState('');

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
  return (
    <div className="px-4 mt-5 text-center">
      <h1>Couchr!</h1>
    </div>
  );
}

export default MainPage;
