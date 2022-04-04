import React,{useEffect, useState} from 'react'
import axios from 'axios';
import './Banner.css'
const Banner = () => {
    const [movie, setMovie] = useState([]);
    
    useEffect(() => {
    async function fetchData() {
        const request = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=edb06a79233921cb4fd0d444875ace8f&with_networks=213`)
        const randomMovie = Math.floor(Math.random() * request.data.results.length - 1);   
        setMovie(request.data.results[randomMovie]); 
        return request;
        } 
        fetchData();   
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

  return (
      <header className='banner'
          style={{
              backgroundSize: "cover",
              backgroundImage: `url("http://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
              backgroundPosition: "center center",    
        }}>
          <div className='banner__contents'>
              <h1 className='banner__title'>
                  {movie?.title || movie?.name || movie?.original_name}
              </h1>
              
              <div className='banner__buttons'>
                  <button className='banner__button'>Play</button>
                  <button className='banner__button'>My List</button>
              </div>

              <h1 className='banner__description'>
                {truncate(movie?.overview,150)}  
              </h1>
          </div>

          <div className='banner--fadeBottom'/>
    </header>
  )
}

export default Banner