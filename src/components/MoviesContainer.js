import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const MoviesContainer = () => {
    const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
    const popularMovies = useSelector((store) => store.movie.popularMovies);
    const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);
    const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);
    const isLoading = useSelector((store) => store.movie.isLoading);

    if (isLoading) {
        return (
            <div className='px-6 py-4'>
                <div className='flex justify-center items-center h-64'>
                    <div className='text-white text-xl'>Loading movies...</div>
                </div>
            </div>
        );
    }

    return (
        <div className='px-6 py-4 space-y-6'> 
            {nowPlayingMovies.length === 0 ? (
                <div className='flex justify-center items-center h-64'>
                    <div className='text-white text-xl'>No movies available</div>
                </div>
            ) : (
                <MovieList title="Now Playing" movies={nowPlayingMovies} />
            )}
            {popularMovies.length === 0 ? (
                <div className='flex justify-center items-center h-64'>
                    <div className='text-white text-xl'>No movies available</div>
                </div>
            ) : (
                <MovieList title="Popular" movies={popularMovies} />
            )}
            {topRatedMovies.length === 0 ? (
                <div className='flex justify-center items-center h-64'>
                    <div className='text-white text-xl'>No movies available</div>
                </div>
            ) : (
                <MovieList title="Top Rated" movies={topRatedMovies} />
            )}
            {upcomingMovies.length === 0 ? (
                <div className='flex justify-center items-center h-64'>
                    <div className='text-white text-xl'>No movies available</div>
                </div>
            ) : (
                <MovieList title="Upcoming" movies={upcomingMovies} />
            )}
        </div>
    )
}

export default MoviesContainer