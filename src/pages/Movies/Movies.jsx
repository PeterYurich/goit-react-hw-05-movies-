import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

import { getRequestedMovies } from '../../api/getMovies';

function Movies() {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const location = useLocation();

  function saveSearchRequest(evt) {
    evt.preventDefault();
    if (inputValue === '') {
      return;
    }
    setSearchValue(inputValue);
    setSearchParams({ query: inputValue });
  }

  useEffect(() => {
    if (!query) {
      return;
    }

    const getMoviesForMoviesPage = async () => {
      setLoading(true);
      try {
        const data = await getRequestedMovies(query, 1);
        setMoviesToRender(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMoviesForMoviesPage();
    setInputValue('');
  }, [searchValue, query]);

  function changeHandler(evt) {
    const { value } = evt.target;
    setInputValue(value);
  }

  return (
    <div className="container section">
      <form onSubmit={saveSearchRequest}>
        <label>
          <input type="text" onChange={changeHandler} value={inputValue} />
        </label>
      </form>
      {loading && <div>LOADING...</div>}
      <ul>
        {moviesToRender.map(movie => (
          <li key={movie.id} state={{from: location}}>
            <Link className="list_item" to={`/movies/${movie.id}`}>
              - {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
