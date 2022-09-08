import { NavLink } from 'react-router-dom';
import './index.css'
import { useToken, useAuthContext } from './auth/auth_provider';
import Search from './ListingMovies/Search'


function Nav() {
  const { token } = useAuthContext();
  const funcs = useToken();
  const logout = funcs[2];

  const handleLogout = async e => {
    e.preventDefault();
    console.log('logout try');
    // setErrors(validation(values))
    // console.log('login inside', login)
    await logout();
  };

  const isSignedIn = () => {
    if (token) {
      return (
        <ul className="nav justify-content-end">
          <NavLink className="nav-link" to="/user_detail">User Page</NavLink>
          <NavLink onClick={handleLogout} className="nav-link" to="">Logout</NavLink>
        </ul>
      )
    } else {
      return (
        <ul className="nav justify-content-end">
          <NavLink className="nav-link" to="/login">Login</NavLink>
          <NavLink className="nav-link" to="/signup">Sign up</NavLink>
        </ul>
      )

    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-5 sticky-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          <img src="/couchr-logo.png" className=""
            alt="" width="50" height="50" />Couchr
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Movies
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/sales_records">Genre1</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales_records/history">Genre2</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales_records/new">Genre3</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                My Movies
              </a>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/services">Watchlist</NavLink></li>
                <li><NavLink className="dropdown-item" to="/services/history">My favorites</NavLink></li>
                <li><NavLink className="dropdown-item" to="/services/new">Recently watched</NavLink></li>
                <li><NavLink className="dropdown-item" to="/services/new">My lists</NavLink></li>
                <li><NavLink className="dropdown-item" to="/services/new">New list</NavLink></li>
              </ul>
            </li>
            <ul>
              <Search  />

              {/* <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" /> */}
            </ul>
          </ul>
          {isSignedIn()}
        </div>
      </div>
    </nav>
  )
}

export default Nav;

