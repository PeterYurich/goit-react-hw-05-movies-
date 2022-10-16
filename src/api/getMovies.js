import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '298b3ba9f2c0a557e7d7fc47b0ac595b';
const timeWindow = 'day';
// const mediaType = 'movie';

export async function getPopularMovies(page) {
      const url = `${BASE_URL}/trending/movie/${timeWindow}?api_key=${API_KEY}&page=${page}`;
      try {
          const response = await axios.get(url);
          return response.data;
      } catch (error) {
          console.log(error);
      }
  }

export async function getMovieInfo(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export async function getRequestedMovies(query, page) {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&page=${page}&include_adult=false&query=${query}`
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export async function getMovieDetails(movieId) {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export async function getMovieCredits(movieId) {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}

export async function getMovieReviews(movieId, page) {
    const url = `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=${page}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch(error) {
        console.log(error);
    }
}