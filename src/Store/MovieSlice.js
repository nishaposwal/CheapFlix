import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        nowPlayingMovies: [],
        popularMovies: [],
        topRatedMovies: [],
        upcomingMovies: [],
        movieTrailer: null,
        isTrailerModalOpen: false,
        selectedMovieId: null,
    },
    reducers: {
        addNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addMovieTrailer: (state, action) => {
            state.movieTrailer = action.payload;
        },
        openTrailerModal: (state, action) => {
            state.isTrailerModalOpen = true;
            state.selectedMovieId = action.payload;
        },
        closeTrailerModal: (state) => {
            state.isTrailerModalOpen = false;
            state.selectedMovieId = null;
            state.movieTrailer = null;
        },
    },
});

export const { 
    addNowPlayingMovies, 
    addPopularMovies, 
    addTopRatedMovies, 
    addUpcomingMovies, 
    addMovieTrailer,
    openTrailerModal,
    closeTrailerModal
} = movieSlice.actions;

export default movieSlice.reducer;