import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImageURL} />            
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className="open-button">OPEN</Button>
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
      Featured: PropTypes.boolean.isRequired,
    }).isRequired,
  };