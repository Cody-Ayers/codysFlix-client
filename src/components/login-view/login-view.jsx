import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://codys-flix-0b23a40a1d0d.herokuapp.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: username, Password: password }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("Incorrect username or password.");
        }
      })
      .catch(() => alert("Something went wrong. Please try again."));
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-brand">Cody's <span>Flix</span></h1>
        <p className="auth-subtitle">Sign in to browse your movies</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="loginUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} minLength="6" required autoComplete="username" />
          </Form.Group>
          <Form.Group className="mb-4" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required autoComplete="current-password" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" style={{ height: "44px", fontSize: "1rem" }}>
            Log in
          </Button>
        </Form>
        <p className="auth-switch">
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
};
