import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_OPTIONS, BASE_API_URL } from '../utils/constants.js';

const SearchBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // Get all movies from store for suggestions
  const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
  const popularMovies = useSelector((store) => store.movie.popularMovies);
  const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);
  const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);
  
  const allMovies = useMemo(() => [
    ...nowPlayingMovies,
    ...popularMovies,
    ...topRatedMovies,
    ...upcomingMovies
  ], [nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies]);

  // Generate suggestions from local movies
  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = allMovies
        .filter(movie => 
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movie.overview?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, allMovies]);

  // Search movies from API
  const searchMovies = async (query) => {
    if (query.length < 2) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        searchMovies(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle suggestion click
  const handleSuggestionClick = (movie) => {
    console.log('Navigating to movie:', movie.id, movie.title);
    setIsNavigating(true);
    setSearchQuery(movie.title);
    setShowSuggestions(false);
    navigate(`/movie/${movie.id}`);
    onClose();
  };

  // Handle search result click
  const handleResultClick = (movie) => {
    console.log('Navigating to movie:', movie.id, movie.title);
    setIsNavigating(true);
    navigate(`/movie/${movie.id}`);
    onClose();
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-start justify-center pt-20">
      <div className="w-full max-w-2xl px-4" ref={searchRef}>
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-red-500 focus:outline-none text-lg"
            autoFocus
          />
          {isLoading && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        {/* Search Results */}
        <div className="mt-4 max-h-96 overflow-y-auto">
          {searchQuery.length > 0 && (
            <div className="bg-gray-900 rounded-lg p-4">
              {isNavigating && (
                <div className="text-center py-4">
                  <div className="text-white text-lg">Navigating to movie...</div>
                </div>
              )}
              {/* Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">SUGGESTIONS</h3>
                  {suggestions.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleSuggestionClick(movie)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-18 object-cover rounded"
                      />
                      <div>
                        <div className="text-white font-medium">{movie.title}</div>
                        <div className="text-gray-400 text-sm">{movie.release_date?.split('-')[0]}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div>
                  <h3 className="text-gray-400 text-sm font-semibold mb-2">SEARCH RESULTS</h3>
                  {searchResults.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => handleResultClick(movie)}
                      className="flex items-center gap-3 p-2 hover:bg-gray-800 rounded cursor-pointer transition-colors"
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                        alt={movie.title}
                        className="w-12 h-18 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="text-white font-medium">{movie.title}</div>
                        <div className="text-gray-400 text-sm">
                          {movie.release_date?.split('-')[0]} • {movie.vote_average?.toFixed(1)} ⭐
                        </div>
                        <div className="text-gray-500 text-xs mt-1 line-clamp-2">
                          {movie.overview}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results */}
              {searchQuery.length >= 2 && !isLoading && searchResults.length === 0 && suggestions.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-lg">No movies found</div>
                  <div className="text-gray-500 text-sm mt-2">Try searching for something else</div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SearchBar; 