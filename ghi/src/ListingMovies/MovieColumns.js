import { useState } from "react";
import { Link } from "react-router-dom";
import MovieDetail from "../MovieDetail/MovieDetail";
import DetailLeftArea from '../MovieDetail/DetailLeftArea';

function MovieColumn(props) {
    return (
        <div className="col">
          {props.list?.map(data => {
            const movie = data;
            let movie_link = "/movies/movie/" + movie.id + "/"
            return (
              <div key={movie.id} className="movie-card mb-3 shadow">
                  {/* clickable image => movie detail page */}
                  <Link to={movie_link}>
                    <img src={movie.poster_path} className="card-img-top list-card-image position-top" width="50" alt="img" />
                  </Link>
                  <div className="card-body">
                    {/* movie title */}
                    <h6 className="card-title align-middle">{movie.title}<br/> ({movie.release_date}) <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>{movie.vote_average}
                    </h6>
                    {/* <div className="list-icons"> */}
                    <div>
                      <i className="detail_icon_my-tip_list">
                      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="25" fill="currentColor" id="list-icon" className="bi bi-heart detail_image_area_icon" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                      </svg>
                      <span className="detail_icon_tip_list"><i>Like</i></span>
                    </i>
                    <i className="detail_icon_my-tip_list">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" id="list-icon" className="bi bi-clock detail_image_area_icon" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                      </svg>
                      <span className="detail_icon_tip_list"><i>Watch List</i></span>
                    </i>
                    <i className="detail_icon_my-tip_list">
                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" id="list-icon" className="bi bi-clock-history detail_image_area_icon" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
                      </svg>
                      <span className="detail_icon_tip_list"><i>Watched</i></span>
                    </i>
                    </div>
                      {/* </div> */}
                  </div>
                </div>
            );
          })}
        </div>
      ); 
    }
    
    export default MovieColumn;
