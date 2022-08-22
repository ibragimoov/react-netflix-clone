import React, { useEffect, useState } from "react";
import axios from "../../axios";
import "./Row.css";
import YouTube from "react-youtube";
const movieTrailer = require("movie-trailer");

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    const options = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    function handleClick(movie) {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(null, { tmdbId: movie?.id })
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row--posters">
                {movies.slice(1, 10).map((movie) => {
                    return (
                        <img
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row--poster ${
                                isLargeRow ? "row--posterLarge" : ""
                            }`}
                            src={`${base_url}${
                                isLargeRow
                                    ? movie.poster_path
                                    : movie.backdrop_path
                            }`}
                            alt={movie.name}
                        />
                    );
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={options} />}
        </div>
    );
}

export default Row;
