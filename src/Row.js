import React, { useEffect, useState } from "react";
import axios from "./axios"
import "./Row.css"
import YouTube from "react-youtube";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([])
    const [trailerUrl] = useState("")
    const base_url = "https://image.tmdb.org/t/p/original/"

    useEffect(() => {

        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request
        }   

        fetchData()
    }, [fetchUrl])

    const options = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        },
    }

    // const handleClick = (movie) => {
    //     if (trailerUrl) {
    //         setTrailerUrl("")
    //     } else {
    //         movieTrailer(movie.name || "")
    //         .then(url => {
    //             console.log(url)
    //             const urlParams = new URLSearchParams(new URL(url).search)
    //             setTrailerUrl(urlParams.get('v'))

    //         }).catch((error) => console.log(error))
    //     }
    // }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row--posters">
                {movies.map(movie => {
                    return <img 
                    key={movie.id}
                    // onClick={() => handleClick(movie)}
                    className={`row--poster ${isLargeRow ? 'row--posterLarge' : ''}`}
                    src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                    alt={movie.name}/>
                })}
            </div>
            {trailerUrl && <YouTube videoId={"https://www.youtube.com/watch?v=XtMThy8QKqU&t=8363s"} opts={options}/>}
        </div>
    )
}

export default Row