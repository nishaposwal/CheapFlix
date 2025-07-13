// Base API URL
export const BASE_API_URL = 'https://api.themoviedb.org/3/movie';

// API Options with authorization
export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_AUTH_TOKEN || 'TOKEN_NOT_FOUND'}`
  }
};

// Debug: Log the token (remove this in production)
console.log('TMDB Token:', process.env.REACT_APP_TMDB_AUTH_TOKEN ? 'FOUND' : 'NOT FOUND');

// Movie endpoints
export const MOVIE_ENDPOINTS = {
  NOW_PLAYING: '/now_playing',
  TOP_RATED: '/top_rated',
  POPULAR: '/popular',
  UPCOMING: '/upcoming'
};

// Popular languages with their codes and display names
export const POPULAR_LANGUAGES = [
  { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
  { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
  { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
  { code: 'de-DE', name: 'German', flag: '🇩🇪' },
  { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt-BR', name: 'Portuguese (Brazil)', flag: '🇧🇷' },
  { code: 'ru-RU', name: 'Russian', flag: '🇷🇺' },
  { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko-KR', name: 'Korean', flag: '🇰🇷' }
];

// Default language
export const DEFAULT_LANGUAGE = 'en-US';

// Helper function to build full URLs with language support
export const buildMovieUrl = (endpoint, language = DEFAULT_LANGUAGE, page = 1) => {
  return `${BASE_API_URL}${endpoint}?language=${language}&page=${page}`;
};

// Pre-built URLs for common use cases (will be updated dynamically)
export const MOVIE_URLS = {
  NOW_PLAYING: buildMovieUrl(MOVIE_ENDPOINTS.NOW_PLAYING),
  TOP_RATED: buildMovieUrl(MOVIE_ENDPOINTS.TOP_RATED),
  POPULAR: buildMovieUrl(MOVIE_ENDPOINTS.POPULAR),
  UPCOMING: buildMovieUrl(MOVIE_ENDPOINTS.UPCOMING)
};

// Function to update URLs with new language
export const updateMovieUrls = (language = DEFAULT_LANGUAGE) => {
  return {
    NOW_PLAYING: buildMovieUrl(MOVIE_ENDPOINTS.NOW_PLAYING, language),
    TOP_RATED: buildMovieUrl(MOVIE_ENDPOINTS.TOP_RATED, language),
    POPULAR: buildMovieUrl(MOVIE_ENDPOINTS.POPULAR, language),
    UPCOMING: buildMovieUrl(MOVIE_ENDPOINTS.UPCOMING, language)
  };
};