import { useState } from "react";
import { Link } from "react-router-dom";
import MovieDetail from "../MovieDetail/MovieDetail";
import DetailLeftArea from '../MovieDetail/DetailLeftArea';
import Dropdown from 'react-bootstrap/Dropdown';
import "../CSSfile/MovieColumns.css";
import DropdownItem from "react-bootstrap/esm/DropdownItem";


function MovieColumn(props) {
  return (
    <div className="col">
      {props.list?.map(data => {
        const movie = data;
        let trash = '';
        if (props.delete) {
          trash = "bi bi-trash3 detail_image_area_icon";
        } else {
          trash = 'd-none';
        }
        let movie_link = "/movies/movie/" + movie.id + "/"
        let likedCheck = "liked " + movie.id 
        let watchedCheck = "watched " + movie.id
        let wishCheck = "wish " + movie.id
        return (
          <div key={movie.id} className="movie-card mb-3 shadow">
            {/* clickable image => movie detail page */}
            <Link to={movie_link}>
              <img src={movie.poster_path} className="card-img-top list-card-image position-top" width="50" alt="img" />
            </Link>
            <div className="card-body">
              {/* movie title */}
              <h6 className="card-title align-middle">{movie.title}<br /> ({movie.release_date}) <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>{movie.vote_average}
              </h6>
              {/* <div className="list-icons"> */}
              {(() => {
                if (props.default) {
                  return (
                    <div>
                      <i className="detail_icon_my-tip_list">
                        <Dropdown className="" autoClose="outside">
                          <Dropdown.Toggle id="dropdown-autoclose-outside">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="25" fill="currentColor" id="list-icon" className="bi bi-plus-lg detail_image_area_icon detail_movie_addtolist" viewBox="0 0 16 16" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <DropdownItem>
                              <p id="liked" onClick={e => props.handleAddMovie2(e, movie)}>
                                Liked
                                <i id={likedCheck} className="d-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                  </svg>
                                </i>
                              </p>
                            </DropdownItem>
                            <DropdownItem>
                            <p id="watched" onClick={e => props.handleAddMovie2(e, movie)}>
                                Watched
                                <i id={watchedCheck} className="d-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                  </svg>
                                </i>
                              </p>
                            </DropdownItem>
                            <DropdownItem>
                            <p id="wish" onClick={e => props.handleAddMovie2(e, movie)}>
                                Want-to-Watch
                                <i id={wishCheck} className="d-none">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                  </svg>
                                </i>
                              </p>
                            </DropdownItem>
                            {props.movie_lists?.map((list, index) => {
                              let checkId = `confirmation-check ${list.id} ${movie.id}`
                              return (
                                <Dropdown.Item id={movie.id} key={index}>
                                  <p onClick={e => props.handleAddMovie(e, movie)} accessKey={list.id} id={movie.id}>{list.name}
                                    <i id={checkId} className="d-none">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                                      </svg>
                                    </i>
                                  </p>
                                </Dropdown.Item>
                              );
                            })}
                          </Dropdown.Menu>
                        </Dropdown>
                        <span className="detail_icon_tip_list"><i>Like</i></span>
                      </i>
                    </div>
                  )
                }
              })()}
              <svg onClick={props.handleRemove} id={movie.id} xmlns="http://www.w3.org/2000/svg" width="50" height="25" fill="currentColor" className={trash} viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieColumn;