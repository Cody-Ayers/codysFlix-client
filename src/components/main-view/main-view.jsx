import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");


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

    const filteredMovies = movies.filter(movie => {
        if (searchQuery) {
            return movie.Title.toLowerCase().includes(searchQuery.toLowerCase())
        }
    });

    return (
        <BrowserRouter>
            <NavigationBar
            user={user}
            onLoggedOut={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}
            movies={movies}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filteredMovies={filteredMovies}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                    path="/signup"
                    element={
                        <>
                          {user ? (
                            <Navigate to="/" />
                          ) : (
                            <Col md={5}>
                                <SignupView />
                            </Col>
                          )}
                        </>
                    }
                />
                    <Route
                    path="/login"
                    element={
                        <>
                          {user ? (
                            <Navigate to="/" />
                          ) : (
                            <Col md={5}>
                                <LoginView onLoggedIn={(user, token) => {
                                    setUser(user)
                                    setToken(token)
                                }} />
                            </Col>
                          )}
                        </>
                    }
                    />
                    <Route
                    path="/movies/:movieId"
                    element={
                        <>
                          {!user ? (
                            <Navigate to="/login" replace />
                          ) : movies.length === 0 ? (
                            <Col>The list is empty!</Col>
                          ) : (
                            <Col md={8}>
                                <MovieView movies={movies} user={user} setUser={setUser} token={token} />
                            </Col>
                          )}
                        </>
                    }
                    />
                    <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : searchQuery ? (
                  <>
                    <Row>
                      {filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie._id} md={3} >
                          <MovieCard
                            user={user}
                            setUser={setUser}
                            movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  </>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
                <Route
                path="/profile"
                element={
                    <>
                      {!user ? (
                        <Navigate to="/login" replace />
                      ) : (
                        <Col>
                            <ProfileView
                            user={user}
                            token={token}
                            movies={movies}
                            setUser={setUser}
                            />
                        </Col>
                      )}
                    </>
                } 
                /> 
                </Routes>
            </Row>
        </BrowserRouter>
    );
                };