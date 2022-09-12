import { Link } from "react-router-dom";

export default function PublicListColumn(props) {

    return (
        <>
            <div className="col">
                {props.list?.map(data => {
                    const list = data;
                    return (
                        <div key={list.id} className="movie-card mb-3 shadow">
                            {/* <Link to={movie_link}>
                                <img src={movie.poster_path} className="card-img-top list-card-image" width="50" alt="img" />
                            </Link> */}
                            <div className="card-body">
                                <h5 className="card-title align-middle">
                                    <div>{list.name}</div>
                                    <div>{list.description}</div>
                                    <div>{list.user}</div>
                                    <br />
                                </h5>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}