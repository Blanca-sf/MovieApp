import axios from "axios";
import { TMDB_API_KEY, BASE_URL } from "@env";

// Get movies by category
export const getMovies = async (category = "now_playing") => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${category}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

// Get movie details by ID
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

// Search movies/TV shows
export const searchMovies = async (query, category = "multi") => {
  try {
    const response = await axios.get(`${BASE_URL}/search/${category}`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        language: "en-US",
        page: 1,
        include_adult: false,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

// Tv Shows 
export const getTVShows = async (category = "airing_today") => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${category}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching TV shows:", error);
    throw error;
  }
};

// TV Show details page
export const getTVShowDetails = async (showId) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${showId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching TV show details:", error);
    throw error;
  }
};

