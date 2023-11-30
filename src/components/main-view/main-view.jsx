import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [books, setBooks] = useState([
        {
            id: 1,
            title: "The Dark Knight",
            image:
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.themoviedb.org%2Fmovie%2F155-the-dark-knight%2Fimages%2Fposters&psig=AOvVaw2MhpcxzgiyJErmsTw0cz7E&ust=1701414351156000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCICh0cKU64IDFQAAAAAdAAAAABAE",
            description: "A superhero epic in the Batman trilogy",
            director: "Christopher Nolan",
            genre: "Action"
        },
        {
            id: 2,
            title: "Interstellar",
            image:
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.themoviedb.org%2Fmovie%2F157336-interstellar%2Fimages%2Fposters&psig=AOvVaw2u20xgzBVMIg_Ty_CR389v&ust=1701414529278000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCKikj5eV64IDFQAAAAAdAAAAABAE",
            description: "A space exploration and time-bending adventure",
            director: "Christopher Nolan",
            genre: "Sci-Fi"
        },
        {
            id: 3,
            title: "The Godfather",
            image:
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.themoviedb.org%2Fmovie%2F238-the-godfather%2Fimages%2Fposters&psig=AOvVaw2SesbAhayc532GWSDNBv5X&ust=1701414564755000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCKiHvKeV64IDFQAAAAAdAAAAABAE",
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
                <BookCard
                    key={moive.id}
                    movie={movie}
                    onMoiveClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
