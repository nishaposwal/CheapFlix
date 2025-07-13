import { API_OPTIONS, updateMovieUrls } from './constants.js';
import { 
  addNowPlayingMovies, 
  addPopularMovies, 
  addTopRatedMovies, 
  addUpcomingMovies,
  setLoading
} from '../Store/MovieSlice';

// Movie service to handle all API calls
export const movieService = {
  // Fetch now playing movies
  async fetchNowPlayingMovies(dispatch, language = 'en-US') {
    try {
      const urls = updateMovieUrls(language);
      const data = await fetch(urls.NOW_PLAYING, API_OPTIONS);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      return [];
    }
  },

  // Fetch popular movies
  async fetchPopularMovies(dispatch, language = 'en-US') {
    try {
      const urls = updateMovieUrls(language);
      const data = await fetch(urls.POPULAR, API_OPTIONS);
      const json = await data.json();
      dispatch(addPopularMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  // Fetch top rated movies
  async fetchTopRatedMovies(dispatch, language = 'en-US') {
    try {
      const urls = updateMovieUrls(language);
      const data = await fetch(urls.TOP_RATED, API_OPTIONS);
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return [];
    }
  },

  // Fetch upcoming movies
  async fetchUpcomingMovies(dispatch, language = 'en-US') {
    try {
      const urls = updateMovieUrls(language);
      const data = await fetch(urls.UPCOMING, API_OPTIONS);
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      return [];
    }
  },

  // Fetch all movie categories
  async fetchAllMovies(dispatch, language = 'en-US') {
    try {
      dispatch(setLoading(true));
      await Promise.all([
        this.fetchNowPlayingMovies(dispatch, language),
        this.fetchPopularMovies(dispatch, language),
        this.fetchTopRatedMovies(dispatch, language),
        this.fetchUpcomingMovies(dispatch, language)
      ]);
    } catch (error) {
      console.error('Error fetching all movies:', error);
    } finally {
      dispatch(setLoading(false));
    }
  }
}; 