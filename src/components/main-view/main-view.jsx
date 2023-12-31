import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);


    useEffect(() => {
        if (!token) {
            return;
        }
       
        fetch("https://codys-flix-0b23a40a1d0d.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("movies from api:", data);
            const moviesFromApi = data.map((movie) => {
                return {
                    _id: movie._id,
                    Title: movie.Title,
                    Description: movie.Description,
                    Genre: {
                        Name: movie.Genre.Name,
                        Description: movie.Genre.Description
                    },
                    Director: {
                        Name: movie.Director.Name,
                        Bio: movie.Director.Bio,
                        BirthDate: movie.Director.BirthDate,
                        DeathDate: movie.Director.DeathDate
                    },
                    Featured: movie.Featured,
                    ImageURL: movie.ImageURL
                };
            });

            setMovies(moviesFromApi);
        });
    }, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <>
                  <Col md={6}>
                    <LoginView onLoggedIn={(user) => {
                        setUser(user)
                        setToken(token)
                    }} />
                    or
                    <SignupView />
                  </Col>
                </>
            ) : selectedMovie ? (
                <Col md={9}>
                    <MovieView
                    style={{ border: "1px solid skyBlue"}}
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>This List Is Empty!</div>
            ) : (
                <>
                  {movies.map((movie) => (
                    <Col className="mb-" key={movie._id} md={4}>
                        <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(newSelectedMovie);
                        }}
                        />
                    </Col>
                  ))}
                  <Button  onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
           Logout
          </Button>
                </>
            )}
          </Row>
    );
                    };
