import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import {withRouter} from 'react-router'
import * as React from "react";
import "./index.css";



function MovieDetail(props) {
    const currentURL = window.location.href
    console.log(currentURL)
    console.log(props.name)


    return (
        <div className="px-4 mt-5 text-center">
            <h1>Couchrrr!</h1>
            <p>{props.name}</p>
        </div>
    );
}

export default MovieDetail;
