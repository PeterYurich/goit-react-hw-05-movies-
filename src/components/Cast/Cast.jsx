import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieCredits } from '../../api/getMovies';
import css from './Cast.module.css';

function Cast() {
  const [data, setData] = useState(null);
  const [loading, setLoadin] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getMovieCredits(movieId);
        setData(res.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadin(false);
      }
    };
    getData();
  }, [movieId]);

  const actors = data
    ? data.map(({ cast_id, profile_path, name }) => (
        <li key={cast_id}>
          {profile_path && (
            <img
              className={css.photo}
              width="120px"
              src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
              alt={name}
            />
          )}
          <b className={css.actor_name}>{name}</b>
        </li>
      ))
    : 'LOADING...';

  return (
    <div>
      {loading && <div> LOADING...</div>}
      <ul>{actors}</ul>
    </div>
  );
}

export default Cast