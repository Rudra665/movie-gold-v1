import React from "react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";
import api from "../../api/axiosConfig";

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  useEffect(() => {
    getMovieData(movieId);
  }, []);

  const addReview = async (e) => {
    e.preventDefault();
    console.log(reviews, params);

    const rev = revText.current;
    console.log(rev.value);
    try {
      const response = await api.post(`/api/v1/reviews`, {
        reviewBody: rev.value,
        imdbId: movieId
      });

      const updatedReviews = [...reviews.body, { body: rev.value }];
      rev.value = "";
      setReviews(updatedReviews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
      </Row>
      <Row>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewForm
                    handleSubmit={addReview}
                    revText={revText}
                    labelText="Write a Review?"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <>
                <Row key={r.id}>
                  <Col style={{ color: "white" }}>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
