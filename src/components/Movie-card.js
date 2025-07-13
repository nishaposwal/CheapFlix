import React from 'react'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const { title, vote_average, poster_path, id } = movie;
  const navigate = useNavigate();



  return (
    <div 
      className='w-48 pr-4 mb-6 cursor-pointer hover:scale-105 transition-transform duration-200'
      onClick={() => navigate(`/movie/${id}`)}
    >
      {/* Movie Poster */}
      <div className='relative mb-3'>
        <img 
          src={`https://image.tmdb.org/t/p/w500${poster_path}`} 
          alt={title} 
          className='w-full h-72 object-cover rounded-lg shadow-lg'
        />
        {/* Vote Average Badge */}
        <div className='absolute top-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm font-semibold'>
          {vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  )
}

export default MovieCard