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
import NewReviewForm from './Reviews/CreateNewReviewForm';
import UserDetail from './auth/UserDetail';
import { useAuthContext } from './auth/auth_provider';


function App() {
  const { token } = useAuthContext();
  return (
    <AuthProvider>
      <Nav />
      <div className="container">
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='movies/' element={<MovieList />} />
          <Route path='movies/movie/:id/' element={<MovieDetail token={token}/>} />
          <Route path='login/' element={<Login />} />
          <Route path='signup/' element={<Signup />} />
          <Route path='mylists/' element={<MyMovieLists />} />
          <Route path='newreview/' element={<NewReviewForm />} />
          <Route path='user_detail/' element={<UserDetail /> }/>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
