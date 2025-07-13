import { useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_API_URL, API_OPTIONS } from "../utils/constants.js";
import { addMovieTrailer } from "../Store/MovieSlice.js";

export const useMovieTrailer = (id) => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetchMovieAndTrailer();
        }
    }, [id]); // Add id as dependency

    const fetchMovieAndTrailer = async () => {
        try {
            setLoading(true);
            // Fetch trailers
            const trailerResponse = await fetch(`${BASE_API_URL}/${id}/videos`, API_OPTIONS);
            const trailerData = await trailerResponse.json();
            
            // Find the first official trailer
            const officialTrailer = trailerData.results?.find(
                video => video.type === 'Trailer' && video.official === true
            ) || trailerData.results?.find(
                video => video.type === 'Trailer'
            );
            
            dispatch(addMovieTrailer(officialTrailer));
        } catch (error) {
            console.error('Error fetching movie trailer:', error);
            dispatch(addMovieTrailer(null)); // Set null to show "no trailer" message
        } finally {
            setLoading(false);
        }
    };

    return {
        loading
    };
}