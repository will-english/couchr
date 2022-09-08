import logo from './logo.svg';
import Nav from './Nav';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/auth_provider';
import MainPage from './MainPage/MainPage'
import MovieDetail from './MovieDetail/MovieDetail'
import MovieList from './ListingMovies/listByGenre';
import Login from './auth/login';
import Signup from './auth/signup';
import MyMovieLists from './Watchlists/MyMovieLists';
import UserDetail from './auth/UserDetail'
import SearchResults from './ListingMovies/SearchResults';
import Sidebar from './ListingMovies/SideBar';
<<<<<<<<< Temporary merge branch 1
import UserPage from './UserPageTest/UserPage';
import PublicLists from './Watchlists/PublicLists';
=========
import UserPage from './UserPageTest/UserPage'


>>>>>>>>> Temporary merge branch 2

function App() {
  return (
    <AuthProvider>
      <Nav />
      <div>
        <Routes>
          <Route path='/search/:query' element={<SearchResults />} />
          <Route path='/' element={<MainPage />} />
          <Route path='movies/:id' element={<MovieList />} />
          <Route path='movies/movie/:id/' element={<MovieDetail />} />
          <Route path='login/' element={<Login />} />
          <Route path='signup/' element={<Signup />} />
          <Route path='mylists/' element={<MyMovieLists />} />
          <Route path='user_detail/' element={<UserDetail /> }/>
          <Route path='user_page/' element={<UserPage /> }/>
          <Route path='public_lists/' element={<PublicLists /> }/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
