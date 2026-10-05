import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://codys-flix-0b23a40a1d0d.herokuapp.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Username: username, Password: password, Email: email, Birthday: birthday }),
    }).then((response) => {
      if (response.ok) {
        alert("Account created! You can now log in.");
        navigate("/login");
      } else {
        alert("Signup failed. Try a different username or email.");
      }
    });
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-brand">Cody's <span>Flix</span></h1>
        <p className="auth-subtitle">Create your account</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="signupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} minLength="6" required autoComplete="username" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="6" required autoComplete="new-password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
          </Form.Group>
          <Form.Group className="mb-4" controlId="signupBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100" style={{ height: "44px", fontSize: "1rem" }}>
            Create account
          </Button>
        </Form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};
