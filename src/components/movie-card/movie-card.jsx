import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImageURL} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Button onClick={() => onMovieClick(movie)} variant="link">
                    OPEN
                </Button>
            </Card.Body>
            </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImageURL: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        BirthDate: PropTypes.string.isRequired,
        DeathDate: PropTypes.string,
      }),
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }),
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };