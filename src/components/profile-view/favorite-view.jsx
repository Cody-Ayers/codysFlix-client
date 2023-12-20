import { MovieCard } from "../movie-card/movie-card";
import { Row, Col, Button } from "react-bootstrap";

export const FavoriteView = ({ favoriteMovies }) => {
    return (
        <>
            <h1>Favorite Movies List</h1>
                <Row className="justify-content-center">
                    {favoriteMovies.map((movie) => (
                        <Col xs={8} sm={6} md={4} lg={3} xl={2} key={movie._id}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))}
                </Row>
        </>
    )
}