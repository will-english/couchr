import MovieColumn from "./MovieColumns";
import { useState, useEffect } from 'react';
import Pager from "./Pager";
import ControlledCarousel from "./Carousel"



function MainPage() {
  const [popular, setPopular] = useState([]);
  // const [genres, setGenres] = React.useState('');
  // const [picks, setPicks] = React.useState('');
  // const [error, setError] = React.useState('');
  const [MovieColumns, setMovieColumns] = useState();
  let [Page, setPage] = useState(1);

  const getPopular = async () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setPopular(data["results"]);
    }
    else {
      console.log("There was a problem with the response")
    }
    if (popular.length > 0) {
      const MovieColumn = [[], [], [], []]
      let i = 0
      for (let data of popular) {
        console.log(data)
        i = i + 1;
        if (i > 3) { i = 0 }
        if (data.poster_path === null) {
          data.poster_path = "/couchr-no-photo.png"
        } else {
          data.poster_path = "https://image.tmdb.org/t/p/original" + data.poster_path
        }
        data.vote_average = data.vote_average.toFixed(1);
        data.release_date = data.release_date.slice(0, 4);
        data.movie_link = "/movies/movie/" + data.id + "/";
        MovieColumn[i].push(data);
      }
      setMovieColumns(MovieColumn);
    }

  }


  useEffect(() => {
    getPopular();
  }, [Page],
    console.log(popular));




  return (
    <div>
      <div className="row">
        <ControlledCarousel />
        {MovieColumns?.map((movie, index) => {
          return (
            <MovieColumn key={index} list={movie} />
          );
        })}
    </div>
      <Pager page={Page} setPage={setPage}/>
    </div>

  );
}

export default MainPage;
