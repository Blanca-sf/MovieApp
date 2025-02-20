import { useState, useEffect } from "react";
import { Box, VStack, Text, Image, Spinner } from "@gluestack-ui/themed";
import HeaderDetails from "../layout/HeaderDetails";
import { getTVShowDetails } from "../../services/api";

const TVShowDetails = ({ showId, onBack }) => {
  const [tvShow, setTVShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTVShowDetails = async () => {
      if (!showId) return;
      setIsLoading(true);
      try {
        const data = await getTVShowDetails(showId);
        setTVShow(data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShowDetails();
  }, [showId]);

  if (isLoading) return <Spinner size="large" color="black" />;
  if (!tvShow) return <Text>Error loading TV show details.</Text>;

  return (
    <Box flex={1} bg="#f8f9fa">
      <HeaderDetails title={tvShow.name} onBack={onBack} />
      <VStack alignItems="center" px={20} py={20}>
        <Text fontSize={18} fontWeight="bold" py={10}>{tvShow.name}</Text>
        <Image 
          source={{ uri: `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` }}
          alt={tvShow.name}
          style={{ width: 200, height: 200, marginBottom: 20, marginTop: 20 }}
        />
        <Text textAlign="center" color="gray" fontSize={16} lineHeight={22} marginBottom={20}>{tvShow.overview}</Text>
        <Text fontSize={14} color="gray" fontWeight="bold" mt={4}>
          Popularity: {tvShow.popularity.toFixed(1)} | First Air Date: {tvShow.first_air_date}
        </Text>
      </VStack>
    </Box>
  );
};

export default TVShowDetails;
