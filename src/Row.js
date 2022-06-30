import React, { useEffect, useState } from "react";
import axios from "./axios"
import "./Row.css"

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }   

        fetchData()
    }, [fetchUrl])

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row--posters">
                {movies.map(movie => {
                    return <img 
                    key={movie.id}
                    className={`row--poster ${isLargeRow ? 'row--posterLarge' : ''}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}/>
                })}
            </div>
        </div>
    )
}

export default Row