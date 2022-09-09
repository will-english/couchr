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
                        <i className="detail_icon_my-tip_list">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="22" fill="currentColor" className="bi bi-star detail_image_area_icon" viewBox="0 0 16 16">
                                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                            </svg>
                            <span className="detail_icon_tip_list"><i>favorite</i></span>
                        </i>
                        <i className="detail_icon_my-tip_list">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="22" fill="currentColor" className="bi bi-heart detail_image_area_icon" viewBox="0 0 16 16">
                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                            <span className="detail_icon_tip_list"><i>watch list</i></span>
                        </i>
                        <i className="detail_icon_my-tip_list">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="22" fill="currentColor" className="bi bi-clock detail_image_area_icon" viewBox="0 0 16 16">
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                            </svg>
                            <span className="detail_icon_tip_list"><i>watched</i></span>
                        </i>
                      {/* </div> */}
                  </div>
                </div>
            );
          })}
        </div>
      ); 
    }
    
    export default MovieColumn;
