import React from "react";
import "./App.css";
import Nav from "./Nav";
import Banner from "./Banner";
import requests from "../Requests";
import Row from "./Row";

function HomeScreen() {
  return (
    <div>
      <Nav />

      <Banner/>

      <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals} isLarge/>
      <Row title="trending now" fetchURL={requests.fetchTrending}/>
      <Row title="Top rated" fetchURL={requests.fetchTopRated}/>
      <Row title="Action movies" fetchURL={requests.fetchActionMovies}/>
      <Row title="Comedy movies" fetchURL={requests.fetchComedyMovies}/>
      <Row title="Horror movies" fetchURL={requests.fetchHorrorMovies}/>
      <Row title="Romance movies" fetchURL={requests.fetchRomanceMovies}/>
      <Row title="Documentaries" fetchURL={requests.fetchDocumentaries}/>
    </div>
  );
}

export default HomeScreen;
