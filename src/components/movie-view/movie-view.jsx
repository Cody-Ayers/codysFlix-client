import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Row, Col, Badge } from "react-bootstrap";

export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m._id === movieId);
  const [isFavorite, setIsFavorite] = useState(user.Favorites.includes(movie._id));

  const addFavorite = () => {
    fetch(`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      if (r.ok) {
        user.Favorites.push(movie._id);
        localStorage.setItem("user", JSON.stringify(user));
        setUser({ ...user });
        setIsFavorite(true);
      }
    });
  };

  const removeFavorite = () => {
    fetch(`https://codys-flix-0b23a40a1d0d.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => {
      if (r.ok) {
        user.Favorites = user.Favorites.filter((id) => id !== movie._id);
        localStorage.setItem("user", JSON.stringify(user));
        setUser({ ...user });
        setIsFavorite(false);
      }
    });
  };

  const cardStyle = {
    background: "#17171a",
    border: "0.5px solid #2c2c33",
    borderRadius: "16px",
    overflow: "hidden",
  };

  return (
    <div className="page-wrap">
      <Link to="/" style={{ color: "#a29d94", textDecoration: "none", fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "24px" }}>
        ← Back to movies
      </Link>
      <div style={cardStyle}>
        <Row className="g-0">
          <Col md={4} style={{ maxHeight: "520px", overflow: "hidden" }}>
            <img src={movie.ImageURL} alt={movie.Title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block" }} />
          </Col>
          <Col md={8}>
            <div style={{ padding: "36px 40px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#f2efe9", margin: 0 }}>{movie.Title}</h1>
                <button
                  onClick={isFavorite ? removeFavorite : addFavorite}
                  style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: isFavorite ? "#e8845c" : "#a29d94", lineHeight: 1 }}
                  title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                  {isFavorite ? "♥" : "♡"}
                </button>
              </div>
              <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
                <span style={{ background: "#2c2c33", color: "#a29d94", fontSize: "0.8rem", padding: "4px 10px", borderRadius: "20px" }}>{movie.Genre.Name}</span>
                {movie.Featured && <span style={{ background: "rgba(232,132,92,0.15)", color: "#e8845c", fontSize: "0.8rem", padding: "4px 10px", borderRadius: "20px" }}>Featured</span>}
              </div>
              <p style={{ color: "#a29d94", lineHeight: 1.7, marginBottom: "24px" }}>{movie.Description}</p>
              <div style={{ borderTop: "0.5px solid #2c2c33", paddingTop: "20px" }}>
                <p style={{ margin: "0 0 8px" }}><span style={{ color: "#a29d94", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Director</span></p>
                <p style={{ color: "#f2efe9", fontWeight: 600, marginBottom: "8px" }}>{movie.Director.Name}</p>
                <p style={{ color: "#a29d94", fontSize: "0.9rem", lineHeight: 1.6 }}>{movie.Director.Bio}</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
