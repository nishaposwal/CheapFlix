import React from 'react'
import MovieCard from './Movie-card'

const MovieList = ({ title, movies }) => {
  return (
    <div className='px-6'>
        <h1 className='text-lg md:text-2xl py-4 text-white'>{title}</h1>
        <div className='flex overflow-x-scroll'>
            <div className='flex'>
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default MovieList