import * as React from "react";
import { NavLink } from 'react-router-dom';

function DetailRightArea(props) {
    return (
        <div className="detail-right-area">
            <div className="mb-3">
                <h5>Actors</h5>
            </div>

            {/* list actors */}
            <div>
                {props.actors.map((actor, index) => {
                    return (
                        <div className="detail_list_actors_area" key={index}>
                            <div className="detail_actor_img_div">
                                <img className="detail_actor_img" src={actor.profile_path} alt="ActorImage" />
                            </div>
                            <div className="detail_actor_name_div">
                                &nbsp;&nbsp;{actor.name}&nbsp;&nbsp;... <br /> &nbsp;&#40;{actor.character}&#41;
                            </div>
                            {/* &nbsp: space, &#40: left parenthesis, &#41: right parenthesis */}
                        </div>
                    );
                })}
            </div>
            <div>
                <NavLink className="detail_area_link" to="#">&nbsp;&nbsp;&nbsp;&nbsp;More...</NavLink>
            </div>

            <div className="mt-3 mb-2">
                <h5>Genres</h5>
            </div>

            {/* list geners */}

            {props.genres.map((genre, index) => {
                let genre_link = "/movies/" + genre.id + "/"
                return (
                    <div className="" key={index}>
                        <NavLink className="detail_area_link" to={genre_link}>{genre.name}</NavLink>
                    </div>
                );
            })}

        </div>
    ); 
}
    
export default DetailRightArea;
