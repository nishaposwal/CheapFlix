import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_LANGUAGE } from "../utils/constants.js";

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
        selectedLanguage: DEFAULT_LANGUAGE,
        isLoading: false,
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
        setSelectedLanguage: (state, action) => {
            state.selectedLanguage = action.payload;
            // Clear all movies when language changes
            state.nowPlayingMovies = [];
            state.popularMovies = [];
            state.topRatedMovies = [];
            state.upcomingMovies = [];
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearAllMovies: (state) => {
            state.nowPlayingMovies = [];
            state.popularMovies = [];
            state.topRatedMovies = [];
            state.upcomingMovies = [];
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
    closeTrailerModal,
    setSelectedLanguage,
    setLoading,
    clearAllMovies
} = movieSlice.actions;

export default movieSlice.reducer;