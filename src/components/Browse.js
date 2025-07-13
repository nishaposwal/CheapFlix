import React from 'react'
import Header from './Header'
import MovieList from './MovieList.js'
import MovieCarousel from './MovieCarousel.js'
import MovieTrailer from './MovieTrailer.js'
import { useMovies } from '../hooks/useMovies.js'
import { useSelector } from 'react-redux'

const Browse = () => {
 useMovies();
 const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
 const popularMovies = useSelector((store) => store.movie.popularMovies);
 const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);
 const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);
  return (
    <div className='min-h-screen bg-black'>
      <Header />
      {/* Movie Carousel */}
      <div className='relative'>
        <MovieCarousel />
      </div>
      
      {/* Movie Categories */}
      <div className='px-6 py-4 space-y-6'> 
        
        {nowPlayingMovies.length === 0 ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-white text-xl'>Loading movies...</div>
          </div>
        ) : (
            <MovieList title="Now Playing" movies={nowPlayingMovies} />
        )}
        {popularMovies.length === 0 ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-white text-xl'>Loading movies...</div>
          </div>
        ) : (
            <MovieList title="Popular" movies={popularMovies} />
        )}
        {topRatedMovies.length === 0 ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-white text-xl'>Loading movies...</div>
          </div>
        ) : (
            <MovieList title="Top Rated" movies={topRatedMovies} />
        )}
        {upcomingMovies.length === 0 ? (
          <div className='flex justify-center items-center h-64'>
            <div className='text-white text-xl'>Loading movies...</div>
          </div>
        ) : (
            <MovieList title="Upcoming" movies={upcomingMovies} />
        )}
      </div>

      {/* Movie Trailer Modal */}
      <MovieTrailer />
    </div>
  )
}

export default Browse