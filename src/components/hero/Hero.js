import React from "react";
import "./Hero.css";
import Carousel from "react-material-ui-carousel";
import Paper from "@mui/material/Paper";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";

const Hero = ({ movies }) => {
  const navigate = useNavigate();
  function reviews(movieId) {
    navigate(`/Reviews/${movieId}`);
  }
  return (
    <div>
      <Carousel>
        {movies.map((movie) => (
          <Paper key={movie.id}>
            <div className="movie-card-container">
              <div
                className="movie-card"
                style={{ "--img": `url(${movie.backdrops[1]})` }}
              >
                <div className="movie-detail">
                  <div className="movie-poster">
                    <img src={movie.poster} alt={movie.title} />
                  </div>
                  <div className="movie-title">
                    <h4>{movie.title}</h4>
                  </div>
                  <div className="movie-button-container">
                    <Link
                      to={`trailer/${movie.trailerLink.substring(
                        movie.trailerLink.length - 11
                      )}`}
                    >
                      <div className="play-button-icon-container">
                        <FontAwesomeIcon
                          className="play-button-icon"
                          icon={faCirclePlay}
                        />
                      </div>
                    </Link>
                    <div className="movie-review-button-container">
                      <Button
                        variant="primary"
                        onClick={() => reviews(movie.imdbId)}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
