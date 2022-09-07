import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";


const Search = () => {
  const [SearchResults, setSearchResults] = useState();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    // e.preventDefault();

    if (SearchResults.trim()) {
      navigate(`/search/${SearchResults}`);
    } else {
      navigate("/search");
    }
  };


  console.log("movie", SearchResults);

  return (
    <form onSubmit={searchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter a movie title ..."
          onChange={(e) => setSearchResults(e.target.value)}
        />
        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="false"></i>
          </button>
        </div>
      </div>
    </form>
  );
};
export default Search