import { useState, useEffect } from "react";
import { Box, VStack, Text, Image, Spinner } from "@gluestack-ui/themed";
import HeaderDetails from "../layout/HeaderDetails";
import { getMovieDetails } from "../../services/api";

const MovieDetails = ({ movieId, onBack }) => {
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchMovieDetails = async () => {
        if (!movieId) return; 
        setIsLoading(true);
        try {
          const data = await getMovieDetails(movieId);
          setMovie(data);
        } catch (error) {
          console.error("Error fetching movie details:", error);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchMovieDetails();
    }, [movieId]);
  
    if (isLoading) return <Spinner size="large" color="black" />;
    if (!movie) return <Text>Error loading movie details.</Text>;
  
    return (
      <Box flex={1} bg="#f8f9fa">
        <HeaderDetails title={movie.title} onBack={onBack} />
        <VStack alignItems="center" px={20} py={20}>
          <Text fontSize={18} fontWeight="bold" py={10}>{movie.title}</Text>
          <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} alt={movie.title} style={{ width: 200, height: 200, marginBottom: 20, marginTop: 20 }} />
          <Text textAlign="center" color="gray" fontSize={16} lineHeight={22} marginBottom={20}>{movie.overview}</Text>
          <Text fontSize={14} color="gray" fontWeight="bold" mt={4}>Popularity: {movie.popularity.toFixed(1)} | Release Date: {movie.release_date}</Text>
        </VStack>
      </Box>
    );
  };
  

export default MovieDetails;
