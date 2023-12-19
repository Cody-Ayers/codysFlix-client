import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./movie-card.scss";

export const MovieCard = ({ movie, token, users, setUsers }) => {
    const [isFavorites, setFavorties] = useState("");

    useEffect(() => {
        if (users && users.Favorites && users.Favorites.includes(movie._id)) {
                setFavorites(true);
        }
    }, [users]);

    const addFavorite = (users) =>{
        fetch(
            `https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${users.Username}/movies/${movie._id}`,
            {method: "POST", headers: {Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to add movie to Favorites");
                }
            })
            .then((data) => {
                alert("Movie added to Favorites");
                localStorage.setItem('users', JSON.stringify(data))
                setUsers(data);
                setFavorites(true);
                users.Favorites.push(movie._id);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const removeFavorite = (users) => {
        fetch(
            `https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${users.Username}/movies/${movie._id}`,
            {method: "DELETE", headers: {Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to delete movie from Favorites");
                }
            })
            .then((data) => {
                alert("Movie deleted from Favorites");
                localStorage.setItem('users', JSON.stringify(data))
                setUsers(data);
                setFavorites(true);
            })
            .catch((error) => {
                alert(error);
            });
    }

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImageURL} />            
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button className="open-button">OPEN</Button>
                </Link>
                {isFavorites ? (
                    <Button onClick={removeFavorite}>Remove Favorite</Button>
                ) : (
                    <Button onClick={addFavorite}>Add Favorite</Button>
                )}
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
  };