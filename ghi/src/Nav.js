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
          <NavLink className="nav-link" to="/user_page">User Page</NavLink>
          <NavLink onClick={handleLogout} className="nav-link" to="">Logout</NavLink>
        </ul>
      )
    } else {
      return (
        <ul className="nav justify-content-end">
          <NavLink className="nav-link" to="/login">Login/Signup</NavLink>
        </ul>
      )

    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-5 sticky-top">
      <div className="container-fluid">
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className='mb-3 mx-2 '>
              <img src="/couchr-logo.png" className=""
                alt="" width="50" height="50" />
            </li>
            <li className=''>
              <NavLink className="navbar-brand couchr-title" to="/">
                <b>Couchr</b>
              </NavLink>
            </li>
            <li className='mt-2'>
              <NavLink className="navbar-brand" to="public_lists/">Community Lists</NavLink>
            </li>
            <li className='mt-2'>
              <Search />
            </li>
          </ul>
          {isSignedIn()}
        </div>
      </div>
    </nav>
  )
}

export default Nav;

