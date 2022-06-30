import React, { useEffect, useState } from 'react'
import axios from './axios'
import requests from './requests'
import './Banner.css'

function Banner() {
    const [movie, setMovie] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals)
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            )
            return request
        }

        fetchData()
    }, [])

    console.log(movie.backdrop_path)

    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: 
            `url(${base_url}${movie?.backdrop_path})`,
            backgroundPosition: "center center"
        }}>
            <div className='banner--contents'>
                <h1>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className='banner--buttons'>
                    <button className='banner-btn'>Play</button>
                    <button className='banner-btn'>My List</button>
                </div>

                <h1 className='banner--desc'>
                    {movie?.overview}
                </h1>
            </div>
        </header>
    )
}

export default Banner