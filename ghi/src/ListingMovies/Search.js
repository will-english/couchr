import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import "../index.css";



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



  return (
    <form className="input-group input-group-append " onSubmit={searchHandler}>
      <div className="input-group">
            <input
              className="search rounded"
              type="search"
              id="search_field"
              placeholder="Search movies"
              onChange={(e) => setSearchResults(e.target.value)}
            />
            <button id="search-button" className=" btn search-btn">
              <i className="search"></i>Search
            </button>
      </div>
    </form>
  );
};
export default Search