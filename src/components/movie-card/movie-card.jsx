import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="movie-card h-100">
      <div className="movie-card__poster-wrap">
        <Card.Img variant="top" src={movie.ImageURL} alt={movie.Title} className="movie-card__poster" />
      </div>
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="movie-card__title">{movie.Title}</Card.Title>
        <p className="movie-card__director">Directed by {movie.Director.Name}</p>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`} className="movie-card__btn">
          View details →
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Director: PropTypes.shape({ Name: PropTypes.string.isRequired }),
    Genre: PropTypes.shape({ Name: PropTypes.string.isRequired }),
  }).isRequired,
};
