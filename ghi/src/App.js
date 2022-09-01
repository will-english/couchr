import logo from './logo.svg';
import Nav from './Nav';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage'
import MovieDetail from './MovieDetail/MovieDetail'
import MovieList from './ListingMovies/listByGenre';
import Login from './auth/login';
import Signup from './auth/signup';
import { AuthProvider } from './auth/auth_provider';
import MyMovieLists from './Watchlists/MyMovieLists';


function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <AuthProvider>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='movies/:id' element={<MovieList />} />
          <Route path='movies/movie/:id/' element={<MovieDetail />} />
          <Route path='login/' element={<Login />} />
          <Route path='signup/' element={<Signup />} />
          <Route path='mylists/' element={<MyMovieLists />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
