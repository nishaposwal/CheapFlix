import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_OPTIONS, BASE_API_URL } from '../utils/constants.js';
import MovieCard from './Movie-card';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
      fetchMovieCast();
      fetchMovieTrailers();
      fetchSimilarMovies();
    }
  }, [id]);

  const fetchMovieDetails = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/${id}`, API_OPTIONS);
      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  const fetchMovieCast = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/${id}/credits`, API_OPTIONS);
      const data = await response.json();
      setCast(data.cast?.slice(0, 10) || []);
    } catch (error) {
      console.error('Error fetching cast:', error);
    }
  };

  const fetchMovieTrailers = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/${id}/videos`, API_OPTIONS);
      const data = await response.json();
      setTrailers(data.results?.filter(video => video.type === 'Trailer').slice(0, 3) || []);
    } catch (error) {
      console.error('Error fetching trailers:', error);
    }
  };

  const fetchSimilarMovies = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/${id}/similar`, API_OPTIONS);
      const data = await response.json();
      setSimilarMovies(data.results?.slice(0, 6) || []);
    } catch (error) {
      console.error('Error fetching similar movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading movie details...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-75 transition-all"
        >
          ← Back
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[70vh]">
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
              <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                {movie.vote_average?.toFixed(1)} ⭐
              </span>
              <span>{movie.release_date?.split('-')[0]}</span>
              <span>{formatRuntime(movie.runtime)}</span>
              <span>{movie.status}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <p className="text-gray-300 max-w-2xl leading-relaxed">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex border-b border-gray-800 mb-8">
          {['overview', 'cast', 'trailers', 'similar'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-white font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent hover:border-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="text-white">
          {activeTab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-4">Overview</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {movie.overview}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-400">Tagline</h4>
                    <p className="text-gray-300 italic">"{movie.tagline}"</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-400">Budget</h4>
                    <p className="text-gray-300">{formatCurrency(movie.budget)}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-400">Revenue</h4>
                    <p className="text-gray-300">{formatCurrency(movie.revenue)}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-400">Production Companies</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {movie.production_companies?.map((company) => (
                        <span
                          key={company.id}
                          className="bg-gray-800 px-3 py-1 rounded text-sm"
                        >
                          {company.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}

          {activeTab === 'cast' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Cast</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {cast.map((person) => (
                  <div key={person.id} className="text-center">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                      className="w-full h-48 object-cover rounded-lg mb-2"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x300/666/999?text=No+Image';
                      }}
                    />
                    <h4 className="font-semibold text-sm">{person.name}</h4>
                    <p className="text-gray-400 text-xs">{person.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'trailers' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Trailers</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trailers.map((trailer) => (
                  <div key={trailer.key} className="bg-gray-900 rounded-lg overflow-hidden">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}`}
                      title={trailer.name}
                      className="w-full h-48"
                      frameBorder="0"
                      allowFullScreen
                    />
                    <div className="p-4">
                      <h4 className="font-semibold">{trailer.name}</h4>
                      <p className="text-gray-400 text-sm mt-1">{trailer.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'similar' && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Similar Movies</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {similarMovies.map((similarMovie) => (
                  <div
                    key={similarMovie.id}
                    onClick={() => navigate(`/movie/${similarMovie.id}`)}
                    className="cursor-pointer hover:scale-105 transition-transform"
                  >
                    <MovieCard movie={similarMovie} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail; 