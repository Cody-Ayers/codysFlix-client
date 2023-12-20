import { MovieView } from "../movie-view/movie-view";
import { Row, Col, Button } from "react-bootstrap";

export const FavoriteView = ({ favoriteMovies }) => {
    return (
        <>
            <h1>Favorite Movies List</h1>
                <Row className="justify-content-center">
                    {favoriteMovies.map((movie) => (
                        <Col xs={8} sm={6} md={4} lg={3} xl={2} key={movie._id}>
                            <MovieView movie={movie} />
                            <Button onClick={() => removeFav(movies._id)}>Remove From Favorites</Button>
                        </Col>
                    ))}
                </Row>
        </>
    )
}