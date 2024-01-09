import { useState } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FavoriteView } from "./favorite-view";

export const ProfileView = ({ token, movies, user }) => {
	const [username, setUsername] = useState(user.Username);
	const [password, setPassword] = useState("***");
	const [email, setEmail] = useState(user.Email);
	const [birthday, setBirthday] = useState(user.Birthday);

	const favoriteMovies = movies.filter((movies) => {
        return user.Favorites.includes(movies._id);
    });

	console.log(user.Username);

	const handleUpdate = (event) => {
		event.preventDefault();

		const data = {
			Username: username,
			Password: password,
			Email: email,
			Birthday: birthday,
		};

		fetch(
			`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}`,
			{
				method: "PUT",
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((response) => {
				if (response.ok) {
					response.json();
                    alert("User information updated");
                } else {
                    alert("Unable to update")
                }
            });
    };
	// Delete Account

	const deleteAccount = (event) => {
		event.preventDefault();
		fetch(
			`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		).then((response) => {
			if (response.ok) {
				alert("account deleted");
			} else {
				alert("oops something went wrong.");
			}
		});
	};

    return (
        <Container>
            <Row>
                <Col align="center">
                    <Card>
                        <Card.Body>
                            <Card.Title>Profile Account</Card.Title>
                            <Card.Text>Username: {user.Username}</Card.Text>
                            <Card.Text>Email: {user.Email}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col align="center">
                    <Card>
                        <Card.Body>
                            <Card.Title>Update Profile</Card.Title>
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								minLength="4"
								placeholder="Username"
							/>
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                minLength="5"
                                placeholder="Password"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                placeholder="Birthday"
                            />
                        </Form.Group>                        
                    </Form>
                    <Row className="justify-content-center">
					<Col>
						<Button className="update" type="submit" onClick={handleUpdate}>
							Update Account
						</Button>
						<Button className="delete" onClick={deleteAccount}>
							Delete Account
						</Button>
					</Col>
				</Row>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
                <Row>
                    <FavoriteView favoriteMovies={favoriteMovies}/>
                </Row>
        </Container>
    );
};