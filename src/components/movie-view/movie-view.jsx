import { React } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

export const MovieView = ({ movies, isFavorite, token }) => {
	const { movieId } = useParams();

	const movie = movies.find((m) => m._id === movieId);

    const addFavorite = (user) =>{
        fetch(
            `https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
            {method: "POST", headers: {Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to add movie to Favorites");
                }
            })
            .then((users) => {
                alert("Movie added to Favorites");
                localStorage.setItem('user', JSON.stringify(user))
                
            })
            .catch((error) => {
                alert(error);
            });
    };

    const removeFavorite = (user) => {
        fetch(
            `https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}/movies/${movie._id}`,
            {method: "DELETE", headers: {Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                if(response.ok) {
                    return response.json();
                } else {
                    console.log("Failed to delete movie from Favorites");
                }
            })
            .then((users) => {
                alert("Movie deleted from Favorites");
                localStorage.setItem('user', JSON.stringify(user))
                
            })
            .catch((error) => {
                alert(error);
            });
    }

	return (
		<>
			<Container>
				<Card className='shadow p-6'>
					<Row>
						<Col md='6'>
							<Card.Img className='w-100' src={movie.ImageURL} alt='' />
						</Col>
						<Col>
							<Card.Body>
								<Card.Title className='mt-2'>{movie.Title}</Card.Title>
								<Card.Text>{movie.Description}</Card.Text>
								<Card.Text>
									<span className='text-title'>Genre:</span> {movie.Genre.Name}
								</Card.Text>
								<Card.Text>
									<span className='text-title'>Director:</span>
									{movie.Director.Name}
								</Card.Text>
                                <Card.Text>
                                    {movie.Director.Bio}
                                </Card.Text>
								<Link to='/'>
									<Button className='back-button'>Back</Button>
								</Link>
							</Card.Body>
						</Col>
					</Row>
                    <Row>
                    <div>
                    {isFavorite ? (
                        <Button onClick={() => removeFavorite(movie._id)}>Remove</Button>
                    ) : (
                        <Button onClick={() => addFavorite(movie._id)}>Add</Button>
                    )}
                </div>
                    </Row>
				</Card>
			</Container>
		</>
	);
};