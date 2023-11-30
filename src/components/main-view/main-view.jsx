import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "The Dark Knight",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKjUEHR-_M2mRZRAy9riapfsEHZevoE3sh-O-qeIyi&s",
            description: "A superhero epic in the Batman trilogy",
            director: "Christopher Nolan",
            genre: "Action"
        },
        {
            id: 2,
            title: "Interstellar",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDgmUCNxQw7adsAAGIFulSGE4ZUEN3ZF1y3cDKC-WU&s",
            description: "A space exploration and time-bending adventure",
            director: "Christopher Nolan",
            genre: "Sci-Fi"
        },
        {
            id: 3,
            title: "The Godfather",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ94fHo9ZHfdGTLQXxJNDf3uxMjR_3mcPeis16caRR8&s",
            description: "A story about mob boss Don Corleone turning over his empire to his son.",
            director: "Francis Ford Coppola",
            genre: "Crime"
        },
        {
            id: 4,
            title: "The Social Network",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST9Jh6B745NDHgvssbHMQEPrsrbNByC8juo9TbFZbl&s",
            description: "A biographical drama about the founding of Facebook",
            director: "David Fincher",
            genre: "Drama"
        },
        {
            id: 5,
            title: "The Matrix",
            image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_e09w3ItoTsp1vpWolzKADk9U_6zE0TBNVSU3hYYL&s",
            description: "A groundbreaking sci-fi action film about a red or blue pill",
            director: "Lana Wachowski",
            genre: "Action"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
