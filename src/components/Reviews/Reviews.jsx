import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../api/getMovies';

export const Reviews = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { movieId } = useParams();

  useEffect(() => {
    const reviews = async () => {
      try {
        const res = await getMovieReviews(movieId, 1);
        setData(res.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    reviews();
  }, [movieId]);

  return (
    <div>
      {loading && <div> LOADING...</div>}
      {data && (
        <ul>
          {data.map(({ id, author, content }) => (
            <li key={id}>
              <h3>{author}</h3>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!loading && data.length === 0 && (
        <div>We dont't have any reviews for the movie</div>
      )}
    </div>
  );
};
