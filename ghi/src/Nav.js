import { NavLink } from 'react-router-dom';
// import "./index.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light mb-5">
      <div className="container-fluid">
        <NavLink className="navbar-brand main-title" to="/">
        <img src="/couchr-logo.png" className="" width="30" alt="logo-img" /> <b>Couchr</b>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="a1">
                <b>Movies</b>
              </p>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/manufacturers">Genre1</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers">Genre2</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers">Genre3</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers">Genre4</NavLink></li>
              </ul>
            </li>


            <li className="nav-item dropdown">
              <p className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" id="a3">
                <b>My Movies</b>
              </p>
              <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/saleshistory">Watch list</NavLink></li>
                <li><NavLink className="dropdown-item" to="/record">My favorites</NavLink></li>
                <li><NavLink className="dropdown-item" to="/record">Recently watched</NavLink></li>
                <li><NavLink className="dropdown-item" to="/record">My lists</NavLink></li>
                <li><NavLink className="dropdown-item" to="/record">New list</NavLink></li>
              </ul>
            </li>

            <NavLink className="nav-link" to="/appointments">Login</NavLink>
            <NavLink className="nav-link" to="/appointments">Logout</NavLink>
            <NavLink className="nav-link" to="/appointments">Sign up</NavLink>
              
          </ul>
        </div>
        <div clasNames="input-group rounded">
            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
        </div>
      </div>
      
    </nav>
  )
}

export default Nav;