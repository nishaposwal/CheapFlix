import { useEffect } from "react";
import { movieService } from "../utils/movieService";
import { useDispatch } from "react-redux";

export const useMovies = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        movieService.fetchAllMovies(dispatch);
    }, []);
}