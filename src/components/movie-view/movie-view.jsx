import { React } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Card, Row, Col, Container } from 'react-bootstrap';

export const MovieView = ({ movies }) => {
	const { movieId } = useParams();

	const movie = movies.find((m) => m._id === movieId);

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
				</Card>
			</Container>
		</>
	);
};