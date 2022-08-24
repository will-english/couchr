function MovieColumn(props) {
    return (
        <div className="col">
          {props.list.map(data => {
            const movie = data;
            return (
              <div key={movie.id} className="movie-card mb-3 shadow">
                <img src={movie.poster_path} className="card-img-top" width="50"  />
                <div className="card-body">
                  <h5 className="card-title">{movie.title} ({movie.release_date})</h5>
                  <h6 className="card-subtitle mb-2 text-center">
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="orange" className="bi bi-star-fill" viewBox="0 0 16 16">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                    </svg>{movie.vote_average}
                  </h6>
                </div>
            </div>
            );
          })}
        </div>
      ); 
    }
    
    export default MovieColumn;
