import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { getPopularMovies } from '../../api/getMovies';

function Home() {
  const [popMovies, setPopMovies] = useState([{ id: '01', title: 'title' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMoviesForHomePage = async () => {
      try {
        const data = await getPopularMovies(1);
        setPopMovies(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMoviesForHomePage();
  }, []);

  return (
    <div className="container section">
      {loading && <div> LOADING...</div>}
      <ul>
        {popMovies.map(movie => (
          <li key={movie.id}>
            <Link className="list_item" to={`/movies/${movie.id}`}>
              - {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
