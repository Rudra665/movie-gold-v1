import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/axiosConfig";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews";

function App() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getMoviesData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);
      console.log(reviews);
    } catch (error) {
      console.log(error);
    }
  };
  //call getMovies function when the component is mounted
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMoviesData}
                reviews={reviews}
                setReviews={setReviews}
                movie={movie}
              />
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
