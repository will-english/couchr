import {useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";
import Youtube from 'react-youtube'
import axios from 'axios'
import "../CSSfile/YouTube.css";


function YoutubeVideo(props) {
    const MOVIE_API = "https://api.themoviedb.org/3/"
    const SEARCH_API = MOVIE_API + "search/movie"
    const DISCOVER_API = MOVIE_API + "discover/movie"
    const API_KEY = process.env.REACT_APP_MOVIE_API_KEY
    const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"

    const [playing, setPlaying] = useState(false)
    const [trailer, setTrailer] = useState(null)
    const [movies, setMovies] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [movie, setMovie] = useState({title: "Loading Movies"})
    const navigate = useNavigate()

    useEffect(() => {
        fetchMovies()
    }, [])

    
    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault()
        }
        
        
        const {data} = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        })
        
        setMovies(data.results)
        setMovie(data.results[0])
        
        if (data.results.length) {
            await fetchMovie(data.results[0].id)
        }
    }
    
    const fetchMovie = async () => {
        const currentURL = window.location.href
        const words = currentURL.split("/")
        let movie_id = words[4]
        const {data} = await axios(`${MOVIE_API}movie/${movie_id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: "videos"
            }
        })

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find(vid => vid.name === "Official Trailer")
            setTrailer(trailer ? trailer : data.videos.results[0])
        }

        setMovie(data)
    }


    // const selectMovie = (movie) => {
    //     fetchMovie(movie.id)
    //     setPlaying(false)
    //     setMovie(movie)
    //     window.scrollTo(0, 0)
    // }


    return (
        <>
            <button style={{display: 'flex', justifyContent: 'left'}} className="btn btn-danger m-3 " onClick={() => navigate(-1)}>Back</button>
            <div className="Youtube">
                <header className="center-max-size header">
                    {/* <form className="form" onSubmit={fetchMovies}>
                        <input className="search" type="text" id="search"
                            onInput={(event) => setSearchKey(event.target.value)} placeholder="Search Movie Trailer"/>
                        <button className="submit-search" type="submit"><i className="fa fa-search">{selectMovie}</i></button>
                    </form> */}
                </header>
                {movies.length ?
                    <main className="trailer">
                        {movie ?
                            <div className="poster"
                                style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`}}>
                                {playing ?
                                    <>
                                        <Youtube
                                            videoId={trailer.key}
                                            className={"youtube amru"}
                                            containerClassName={"youtube-container amru"}
                                            opts={
                                                {
                                                    width: '900px',
                                                    height: '800px',
                                                    playerVars: {
                                                        autoplay: 1,
                                                        controls: 0,
                                                        cc_load_policy: 0,
                                                        fs: 0,
                                                        iv_load_policy: 0,
                                                        modestbranding: 0,
                                                        rel: 0,
                                                        showinfo: 0,
                                                    },
                                                }
                                            }
                                        />
                                        <button onClick={() => setPlaying(false)} className={"btn btn-danger button close-video"}>Close
                                        </button>
                                    </> :
                                    <div className="center-max-size">
                                        <div className="poster-content">
                                        <h1 className="mt-25px">{movie.title}</h1>
                                            <p>{movie.overview}</p>
                                            {trailer ?
                                                <button className={"play btn btn-danger button play-video"} onClick={() => setPlaying(true)}
                                                        type="button">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-play-btn-fill" viewBox="0 0 16 16">
                                                                <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                                                            </svg>
                                                </button>
                                                : 'Sorry, no trailer available'}
                                        </div>
                                    </div>
                                }
                            </div>
                            : null}
                    </main>
                    : 'Sorry, no movies found'}
            </div>
        </>
    );
}

export default YoutubeVideo;
    
