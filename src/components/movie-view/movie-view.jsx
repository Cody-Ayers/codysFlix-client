import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m._id === movieId);


    return (
        <div>
            <div>
                <img  className="w-100" src={movie.ImageURL} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>:
                <div>
                <span>{movie.Director.Bio}</span>
                </div>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>:
                <div>
                <span>{movie.Genre.Description}</span>
                </div>
            </div>
            <Link to={`/`}>
                <button className="backButton">BACK</button>
            </Link>
        </div>
    );
};