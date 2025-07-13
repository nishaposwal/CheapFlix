import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMovieTrailer } from '../hooks/useMovieTrailer.js';
import { closeTrailerModal } from '../Store/MovieSlice.js';

const MovieTrailer = () => {
  const dispatch = useDispatch();
  const { isTrailerModalOpen, selectedMovieId, movieTrailer } = useSelector((store) => store.movie);
  const { loading } = useMovieTrailer(selectedMovieId);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        dispatch(closeTrailerModal());
      }
    };

    if (isTrailerModalOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isTrailerModalOpen, dispatch]);

  // Handle click outside to close popup
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      dispatch(closeTrailerModal());
    }
  };

  const handleClose = () => {
    dispatch(closeTrailerModal());
  };

  // Don't render if modal is not open
  if (!isTrailerModalOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Close Button - Always visible */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-3 transition-all duration-200 hover:scale-110"
        aria-label="Close trailer"
      >
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M6 18L18 6M6 6l12 12" 
          />
        </svg>
      </button>

      {/* Content Container */}
      <div className="w-full h-full flex items-center justify-center p-4">
        {loading ? (
          // Loading State
          <div className="text-white text-xl text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading trailer...</p>
          </div>
        ) : movieTrailer ? (
          // Video Player
          <div className="w-full max-w-6xl h-full max-h-[90vh]">
            <div className="relative w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${movieTrailer.key}?autoplay=1&rel=0&modestbranding=1&controls=1`}
                title={movieTrailer.name}
                className="w-full h-full rounded-lg"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        ) : (
          // No Trailer Available
          <div className="text-white text-xl text-center">
            <p>No trailer available for this movie.</p>
            <button 
              onClick={handleClose}
              className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieTrailer; 