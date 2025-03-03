import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "../axios";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="relative h-[448px] text-white object-contain"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents flex flex-col justify-center ml-[30px] pt-[230px] pb-[100px] h-[190px]">
        <h1 className="banner__title text-5xl font-semibold pb-5">
          {movie.name}
        </h1>
        <div className="banner_buttons">
          <button className="banner__button font-semibold bg-[rgba(51,51,51,0.5)] text-white px-5 py-1 rounded-xs text-md mr-4 cursor-pointer hover:bg-white hover:text-black transform duration-150">
            Play
          </button>
          <button className="banner__button font-semibold bg-[rgba(51,51,51,0.5)] px-5 py-1 rounded-xs text-md mr-4 cursor-pointer hover:bg-white hover:text-black transform duration-150">
            My list
          </button>
        </div>
        <h1 className="banner__description width-45 text-sm leading-1.3 pt-3 max-w-[360px] h-[80px]">
          {truncate(movie.overview, 150)}
        </h1>
      </div>
      <div
        className="banner--fadeBottom"
        style={{
          height: "7.5rem",
          backgroundImage:
            "linear-gradient(180deg,transparent,rgba(37,37,37,0.61),#111)",
        }}
      ></div>
    </header>
  );
}

export default Banner;
