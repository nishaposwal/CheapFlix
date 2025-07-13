import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_OPTIONS, BASE_API_URL } from "../utils/constants.js";
import { openTrailerModal } from "../Store/MovieSlice.js";

const MovieCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get popular movies from store and limit to 5
  const allNowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
  const nowPlayingMovies = allNowPlayingMovies.length >= 5 ? allNowPlayingMovies.slice(0, 5) : allNowPlayingMovies;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % nowPlayingMovies.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + nowPlayingMovies.length) % nowPlayingMovies.length
    );
  };

  const playTrailer = (movieId) => {
    dispatch(openTrailerModal(movieId));
  };

  if (nowPlayingMovies.length === 0) {
    return (
      <div className="relative h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">No movies available</div>
      </div>
    );
  }

  const currentMovie = nowPlayingMovies[currentIndex];

  return (
    <div className="relative h-[70vh] bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
          alt={currentMovie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all"
      >
        →
      </button>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-end">
        <div className="w-full px-6 md:px-8 pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Movie Title */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-tight">
              {currentMovie.title}
            </h1>

            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                {currentMovie.vote_average?.toFixed(1)} ⭐
              </span>
              <span className="text-lg">
                {currentMovie.release_date?.split("-")[0]}
              </span>
              <span className="text-lg">{currentMovie.status}</span>
            </div>

            {/* Overview */}
            <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
              {currentMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate(`/movie/${currentMovie.id}`)}
                className="bg-white text-black px-6 py-2 rounded-lg font-semibold text-base hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <span>▶</span> More Info
              </button>

              <button
                onClick={() => playTrailer(currentMovie.id)}
                className="bg-gray-800 bg-opacity-75 text-white px-6 py-2 rounded-lg font-semibold text-base hover:bg-opacity-90 transition-colors flex items-center gap-2"
              >
                <span>🎬</span> Watch Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {nowPlayingMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
            }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          />
        ))}
      </div>

      {/* Gradient Overlay for Text Readability */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
};

export default MovieCarousel;
