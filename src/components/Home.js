import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MovieTrailer from './MovieTrailer';
import MovieList from './MovieList';
import { movieService } from '../utils/movieService';

const Home = () => {
  const [featuredMovieId, setFeaturedMovieId] = useState(null);
  const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movie.popularMovies);
  const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);

  useEffect(() => {
    // Set featured movie as the first popular movie (or first available movie)
    if (popularMovies.length > 0) {
      setFeaturedMovieId(popularMovies[0].id);
    } else if (nowPlayingMovies.length > 0) {
      setFeaturedMovieId(nowPlayingMovies[0].id);
    }
  }, [popularMovies, nowPlayingMovies]);

  // If no movies are loaded yet, show loading
  if (!featuredMovieId) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading featured content...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Trailer Section */}
      <MovieTrailer movieId={featuredMovieId} />

      {/* Movie Categories */}
      <div className="px-6 py-8 space-y-8">
        {nowPlayingMovies.length > 0 && (
          <MovieList title="Now Playing" movies={nowPlayingMovies} />
        )}
        
        {popularMovies.length > 0 && (
          <MovieList title="Popular on Netflix" movies={popularMovies} />
        )}
        
        {topRatedMovies.length > 0 && (
          <MovieList title="Top Rated" movies={topRatedMovies} />
        )}
        
        {upcomingMovies.length > 0 && (
          <MovieList title="Coming Soon" movies={upcomingMovies} />
        )}
      </div>
    </div>
  );
};

export default Home; 