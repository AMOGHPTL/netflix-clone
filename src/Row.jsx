import axios from "../axios";
import React, { useEffect, useState } from "react";

function Row({ title, fetchURL, isLarge }) {
  const [movies, setMovies] = useState([]);

  const baseURL = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  console.log(movies);

  return (
    <div className="row text-white mt-5 ml-5 text-xl font-semibold">
      <h2>{title}</h2>
      <div className="row__posters flex overflow-y-hidden overflow-x-scroll p-5">
        {movies.map((movie) =>((isLarge && movie.poster_path)||(!isLarge && movie.backdrop_path)) && (
          <img
            className={`row__poster max-h-[100px] object-contain mr-3 w-full transition-transform duration-450 hover:scale-108 hover:opacity-90  ${isLarge && "row__posterLarge max-h-[250px] hover:scale-109"}`}
            key={movie.id}
            src={`${baseURL}${
              isLarge ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
