import { useSelector } from "react-redux";

export const useMovieCrousel = () => {
    const popularMovies = useSelector((store) => store.movie.popularMovies);
    return popularMovies;
}