import { useState } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const ProfileView = ({ token, movies, users, setUser }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [birthday, setBirthday] = useState('');

	let favoriteMovies = movies.filter(m => users.Favorites.includes(m._id))

	console.log(users.Username);

	const handleUpdate = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch(
			`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${users.Username}`,
			{
				method: 'PUT',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			})
			.then((data) => {
				console.log(data);
				setUser(data);
				localStorage.setItem('users', JSON.stringify(data));
				alert('User info updated');
			})
			.catch((error) => {
				console.error('Error', error);
			});
	};

	// Delete Account

	const deleteAccount = (event) => {
		event.preventDefault();
		fetch(
			`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			if (response.ok) {
				alert('account deleted');
			} else {
				alert('oops something went wrong.');
			}
		});
	};

	return (
		<Container>
			<Container>
				<Row className='justify-content-center-md-6'>
					<Col md={6}>
						<h1 className='title'>Update Profile</h1>
						<Form className='profile' onSubmit={handleUpdate}>
							<Form.Group>
								<Form.Control
									type='text'
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									minLength='4'
									required
									placeholder='Username'
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									className='form'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									minLength='5'
									required
									placeholder='Password'
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder='Email'
								/>
							</Form.Group>
							<Form.Group>
								<Form.Control
									type='date'
									value={birthday}
									onChange={(e) => setBirthday(e.target.value)}
									required
								/>
							</Form.Group>
						</Form>
					</Col>
				</Row>
				<Row className='justify-content-center'>
					<Col>
						<Button className='update' type='submit' onClick={handleUpdate}>
							Update Account
						</Button>
						<Button className='delete' onClick={deleteAccount}>
							Delete Account
						</Button>
					</Col>
				</Row>
			</Container>
		</Container>
	);
};