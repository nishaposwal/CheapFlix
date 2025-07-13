import { API_OPTIONS, MOVIE_URLS } from './constants.js';
import { 
  addNowPlayingMovies, 
  addPopularMovies, 
  addTopRatedMovies, 
  addUpcomingMovies 
} from '../Store/MovieSlice';

// Movie service to handle all API calls
export const movieService = {
  // Fetch now playing movies
  async fetchNowPlayingMovies(dispatch) {
    try {
      const data = await fetch(MOVIE_URLS.NOW_PLAYING, API_OPTIONS);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      return [];
    }
  },

  // Fetch popular movies
  async fetchPopularMovies(dispatch) {
    try {
      const data = await fetch(MOVIE_URLS.POPULAR, API_OPTIONS);
      const json = await data.json();
      dispatch(addPopularMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      return [];
    }
  },

  // Fetch top rated movies
  async fetchTopRatedMovies(dispatch) {
    try {
      const data = await fetch(MOVIE_URLS.TOP_RATED, API_OPTIONS);
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      return [];
    }
  },

  // Fetch upcoming movies
  async fetchUpcomingMovies(dispatch) {
    try {
      const data = await fetch(MOVIE_URLS.UPCOMING, API_OPTIONS);
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results || []));
      return json.results;
    } catch (error) {
      console.error('Error fetching upcoming movies:', error);
      return [];
    }
  },

  // Fetch all movie categories
  async fetchAllMovies(dispatch) {
    try {
      await Promise.all([
        this.fetchNowPlayingMovies(dispatch),
        this.fetchPopularMovies(dispatch),
        this.fetchTopRatedMovies(dispatch),
        this.fetchUpcomingMovies(dispatch)
      ]);
    } catch (error) {
      console.error('Error fetching all movies:', error);
    }
  }
}; 