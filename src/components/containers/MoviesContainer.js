import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, VStack, Box, Text, Spinner, Button } from "@gluestack-ui/themed";
import { FlatList, Image } from "react-native";
import { getMovies } from "../../services/api";
import MovieDetails from "./MovieDetails";

const MoviesContainer = ({ onToggleHeader = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("now_playing");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    onToggleHeader(!selectedMovie); 
  }, [selectedMovie]);


  const fetchMovies = async (category) => {
    setIsLoading(true);
    try {
      const data = await getMovies(category);
      setMoviesData(data || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setIsLoading(false);
  };

  if (selectedMovie) {
    return <MovieDetails movieId={selectedMovie} onBack={() =>  setSelectedMovie(null) } />;
  }
 

  return (
    <VStack space={3} px={3} py={2}>
       <Box width="50%" alignSelf="center" paddingTop={20}>
      <Select selectedValue={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger height={40} >
          <SelectInput placeholder="Select Category" />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent >
            <SelectItem label="Now Playing" value="now_playing"  />
            <SelectItem label="Popular" value="popular"  />
            <SelectItem label="Top Rated" value="top_rated" />
            <SelectItem label="Upcoming" value="upcoming" />
          </SelectContent>
        </SelectPortal>
      </Select>
      </Box>

     
      {isLoading ? (
        <Spinner size="medium" color="black"  />
      ) : (
        <FlatList
          data={moviesData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box flexDirection="row"  my={6} p={6} alignItems="center" >
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={{ width: 100, height: 150, marginRight: 10 }}
              />
              <VStack flex={1}>
                <Text fontWeight="bold" fontSize={16}>{item.title}</Text>
                <Text color="black" fontSize={14}>Popularity: {item.popularity.toFixed(1)}</Text>
                <Text color="black" fontSize={14}>Release Date: {item.release_date}</Text>
                <Button onPress={() => setSelectedMovie(item.id)} bg="#3498db" >
                  <Text color="white" fontWeight="bold" fontSize={16}>More Details</Text>
                </Button>
              </VStack>
              </Box>
          )}
        />
      )}
    </VStack>
  );
};

export default MoviesContainer;
