import React,{useState,useEffect} from 'react'
import axios from '../../axios'
import axios1 from 'axios';
import './Row.css'
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/"
const base_url_movie ="https://api.themoviedb.org/3"
const Row = ({ title, fetchUrl,isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results)
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      
      autoplay: 1,
    },
  };

  // const fetchMovie = async (id) => {
  //   const { data } = await axios1.get(`${base_url_movie}/movie/${id}/`,{
  //     params: {
  //       api_key :"edb06a79233921cb4fd0d444875ace8f",
  //       append_to_response:"videos"
  //     }
  //   })
  //   return data
  // }

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");  //remove if trailer is existed
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          //https://www.youtube.com/watch?v=XtMThy8QKqU&ab_channel=CleverProgrammer
          //search the movie after the letter "v"
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
      })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
      <div className='row'>
        <h2>{title}</h2>
      <div className="row__posters">
        {movies.map(movie => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie) }
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path }`}
            alt={movie.name} />
          ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} 
      {/* when we have trailerUrl then we show the youtube video */}
    </div>
  )
}

export default Row