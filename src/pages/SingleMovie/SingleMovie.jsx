import React, { useEffect, useState, Suspense } from 'react';
import { useParams, Outlet, Link, useLocation } from 'react-router-dom';

import { getMovieDetails } from '../../api/getMovies';
import css from './SingleMovie.module.css';

function SingleMovie() {
  const { movieId } = useParams();
  const [loading, setLoadin] = useState(true);
  const [movieData, setMovieData] = useState(null);
  const location = useLocation();
  const backLinkHref = location.state?.from ?? '/';
  console.log("loc.st", location.state) // null always

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovieData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadin(false);
      }
    };
    getMovieData();
  }, [movieId]);
  
  return (
    <>
      <div className={css.section}>
        <div className="container">
          <Link className={css.goBack} to={backLinkHref}>
            {'<<< '}Go back
          </Link>
          {loading && <div> LOADING...</div>}
          {movieData && (
            <div className={css.mainInfo}>
              {movieData.backdrop_path && (
                <img
                  className={css.column}
                  src={`https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`}
                  alt={movieData.title}
                />
              )}
              <div className={css.column}>
                <h1 className={css.title}>{movieData.title}</h1>
                <p>Raititng: {movieData.vote_average}</p>
                <h2>Overview</h2>
                <p>{movieData.overview}</p>
                <h3>Genres</h3>
                {movieData.genres &&
                  movieData.genres.map(cell => (
                    <span key={cell.id}>{cell.name} </span>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={css.section}>
        <div className="container additional_filter">
          <p className={css.additional_title}>Additional information</p>
          <ul className={css.additional_filters}>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={css.section}>
        <div className="container">
          <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default SingleMovie;
