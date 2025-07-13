import React from 'react'
import Header from './Header'
import MovieList from './MovieList.js'
import MovieCarousel from './MovieCarousel.js'
import MovieTrailer from './MovieTrailer.js'
import { useMovies } from '../hooks/useMovies.js'
import { useSelector } from 'react-redux'
import MoviesContainer from './MoviesContainer.js'

const Browse = () => {
 useMovies();

  return (
    <div className='min-h-screen bg-black'>
      <Header />
      
      {/* Movie Carousel */}
      <div className='relative'>
        <MovieCarousel />
      </div>

      <MoviesContainer />
      
      {/* Movie Trailer Modal */}
      <MovieTrailer />
    </div>
  )
}

export default Browse