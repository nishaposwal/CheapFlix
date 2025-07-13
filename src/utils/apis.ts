import { API_OPTIONS, MOVIE_URLS } from "./constants";
import { useDispatch } from "react-redux";

export const getNowPlayingMovies = async () => {
    const data = await fetch(MOVIE_URLS.NOW_PLAYING, API_OPTIONS);
    const json = await data.json();
    return json.results;
  }