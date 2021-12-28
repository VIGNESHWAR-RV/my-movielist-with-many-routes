import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { themeCtx } from './App';

//movieDetails component
export function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const { id } = useParams();
  const getMovies = () => {
    fetch(`https://61c412daf1af4a0017d99281.mockapi.io/movies/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((movie) => setMovie(movie));

  };
  useEffect(getMovies, []);
  const movieViewed = movie;

  const [theme] = useContext(themeCtx);
  const style = (theme) ? "overallBlack" : "overallWhite";
  return (
    <div className={style}>
      <div className="movieDetail">
        <div className="movieDetails">
          <iframe width="640" height="360" src={movieViewed.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          <h1>{movieViewed.name}</h1>
          <h2><b>IMDB-</b>{movieViewed.rating}⭐</h2>
          <p><b>Summary-</b>{movieViewed.summary}</p>
        </div>
      </div>
    </div>);
}
