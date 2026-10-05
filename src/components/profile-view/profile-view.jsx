import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FavoriteView } from "./favorite-view";

const cardStyle = {
  background: "#17171a",
  border: "0.5px solid #2c2c33",
  borderRadius: "12px",
  padding: "24px",
};

export const ProfileView = ({ token, movies, user, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday ? String(user.Birthday).slice(0, 10) : "");

  const favoriteMovies = movies.filter((m) => user.Favorites.includes(m._id));

  const initials = (user.Username || "?").slice(0, 2).toUpperCase();

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ Username: username, Password: password, Email: email, Birthday: birthday }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((updatedUser) => {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setUser(updatedUser);
          setPassword("");
          alert("Profile updated.");
        });
      } else {
        alert("Unable to update profile.");
      }
    });
  };

  const deleteAccount = () => {
    if (!confirm("Delete your account? This cannot be undone.")) return;
    fetch(`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      if (r.ok) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <div className="page-wrap">
      <h1 style={{ fontFamily: "Georgia, serif", color: "#f2efe9", marginBottom: "6px" }}>Your profile</h1>
      <p style={{ color: "#a29d94", marginBottom: "32px" }}>Manage your account and revisit your favorites.</p>
      <Row className="g-4 mb-5">
        <Col md={4}>
          <div style={cardStyle}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(135deg, #e8845c, #c0653a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: "1.8rem", color: "#0e0e10", fontWeight: 600, marginBottom: "16px" }}>
                {initials}
              </div>
              <h3 style={{ color: "#f2efe9", margin: "0 0 4px", fontSize: "1.25rem" }}>{user.Username}</h3>
              <p style={{ color: "#a29d94", margin: "0 0 16px", fontSize: "0.9rem" }}>{user.Email}</p>
              <div style={{ borderTop: "0.5px solid #2c2c33", paddingTop: "16px", width: "100%" }}>
                <p style={{ color: "#a29d94", fontSize: "0.875rem", margin: 0 }}>
                  <span style={{ color: "#e8845c", fontSize: "1.2rem", fontWeight: 600 }}>{favoriteMovies.length}</span> favorite {favoriteMovies.length === 1 ? "movie" : "movies"}
                </p>
              </div>
            </div>
          </div>
        </Col>
        <Col md={8}>
          <div style={cardStyle}>
            <h3 style={{ color: "#f2efe9", marginBottom: "20px", fontSize: "1.1rem" }}>Update profile</h3>
            <Form onSubmit={handleUpdate}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} minLength="4" autoComplete="username" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password <span style={{ color: "#a29d94", fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(required to save)</span></Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <Button variant="outline-secondary" onClick={deleteAccount} style={{ borderColor: "#3d3d47", color: "#a29d94" }}>
                  Delete account
                </Button>
                <Button variant="primary" type="submit">Save changes</Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
      <h2 style={{ fontFamily: "Georgia, serif", color: "#f2efe9", fontSize: "1.5rem", marginBottom: "20px" }}>Favorite movies</h2>
      {favoriteMovies.length === 0 ? (
        <p style={{ color: "#a29d94" }}>No favorites yet. Head to <a href="/" style={{ color: "#e8845c" }}>Movies</a> and open a film to add it.</p>
      ) : (
        <FavoriteView favoriteMovies={favoriteMovies} />
      )}
    </div>
  );
};
