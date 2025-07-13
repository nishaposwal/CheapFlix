import { useEffect } from "react";
import { movieService } from "../utils/movieService";
import { useDispatch, useSelector } from "react-redux";

export const useMovies = (language) => {
    const dispatch = useDispatch();
    const selectedLanguage = useSelector((store) => store.movie.selectedLanguage);
    const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
    const topRatedMovies = useSelector((store) => store.movie.topRatedMovies);
    const popularMovies = useSelector((store) => store.movie.popularMovies);
    const upcomingMovies = useSelector((store) => store.movie.upcomingMovies);
    
    useEffect(() => {
        const lang = language || selectedLanguage;
        if (nowPlayingMovies.length === 0) {
            movieService.fetchNowPlayingMovies(dispatch, lang);
        }
        if (topRatedMovies.length === 0) {
            movieService.fetchTopRatedMovies(dispatch, lang);
        }
        if (popularMovies.length === 0) {
            movieService.fetchPopularMovies(dispatch, lang);
        }
        if (upcomingMovies.length === 0) {
            movieService.fetchUpcomingMovies(dispatch, lang);
        }
    }, [dispatch, language, selectedLanguage]);
};