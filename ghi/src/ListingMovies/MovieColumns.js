import { useState } from "react";
import { Link } from "react-router-dom";
import MovieDetail from "../MovieDetail/MovieDetail";

function MovieColumn(props) {

  return (
    <div className="col">
      {props.list?.map(data => {
        const movie = data;
        let trash = '';
        if (props.delete) {
          trash = "bi bi-trash3";
        } else {
          trash = 'd-none';
        }
        let movie_link = "/movies/movie/" + movie.id + "/"
        return (
          <div key={movie.id} className="movie-card mb-3 shadow">
            {/* clickable image => movie detail page */}
            <Link to={movie_link}>
              <img src={movie.poster_path} className="card-img-top list-card-image" width="50" alt="img" />
            </Link>
            <div className="card-body">
              {/* movie title */}
              <h5 className="card-title align-middle">{movie.title} ({movie.release_date})<br /><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>{movie.vote_average}
              </h5>
            </div>

            <svg onClick={props.handleRemove} id={movie.id} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={trash} viewBox="0 0 16 16">
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

export default MovieColumn;
