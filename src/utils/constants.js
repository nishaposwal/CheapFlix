// Base API URL
export const BASE_API_URL = 'https://api.themoviedb.org/3/movie';

// API Options with authorization
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZGQwNjE5NTJmZDFjZWJkODI3MzU1MDRjNzhhYzA0ZiIsIm5iZiI6MTc1MjM0NDUzMC4yMjMsInN1YiI6IjY4NzJhN2QyOTIxNTJjZWZlNmMwOTRlOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._9V8TuYgKZ-KikY0sBmlXTAKct0yyT-71T5bZpTdHD0'
  }
};

// Movie endpoints
export const MOVIE_ENDPOINTS = {
  NOW_PLAYING: '/now_playing',
  TOP_RATED: '/top_rated',
  POPULAR: '/popular',
  UPCOMING: '/upcoming'
};

// Helper function to build full URLs
export const buildMovieUrl = (endpoint, language = 'en-US', page = 1) => {
  return `${BASE_API_URL}${endpoint}?language=${language}&page=${page}`;
};

// Pre-built URLs for common use cases
export const MOVIE_URLS = {
  NOW_PLAYING: buildMovieUrl(MOVIE_ENDPOINTS.NOW_PLAYING),
  TOP_RATED: buildMovieUrl(MOVIE_ENDPOINTS.TOP_RATED),
  POPULAR: buildMovieUrl(MOVIE_ENDPOINTS.POPULAR),
  UPCOMING: buildMovieUrl(MOVIE_ENDPOINTS.UPCOMING)
};