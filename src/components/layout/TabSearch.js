import { useState } from "react";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, VStack, Box, Text, Spinner, FlatList, Image, Button } from "@gluestack-ui/themed";
import Form from "../forms/Forms";
import { searchMovies } from "../../services/api";
import MovieDetails from "../containers/MovieDetails";
import TVShowDetails from "../containers/TVShowDetails";

const TabSearch = ({ onToggleHeader = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("multi");
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);


  if (selectedItem) {
    onToggleHeader(false);

   
    return selectedItem.media_type === "movie" || selectedCategory === "movie" ? (
      <MovieDetails movieId={selectedItem.id} onBack={() => { 
        setSelectedItem(null);
        onToggleHeader(true); 
      }} />
    ) : (
      <TVShowDetails showId={selectedItem.id} onBack={() => { 
        setSelectedItem(null);
        onToggleHeader(true); 
      }} />
    );
  }

  return (
    <VStack space={3} px={3} py={2}>
      <Form onInputChange={setSearchQuery} onSubmit={async () => {
        if (!searchQuery) return;
        setIsLoading(true);
        setHasSearched(true);
        try {
          const data = await searchMovies(searchQuery, selectedCategory);
          setSearchResults(data || []);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
        setIsLoading(false);
      }} />

     
      <Select selectedValue={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger>
          <SelectInput placeholder="Select Search Type" />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem label="Multi" value="multi" />
            <SelectItem label="Movie" value="movie" />
            <SelectItem label="TV Show" value="tv" />
          </SelectContent>
        </SelectPortal>
      </Select>
     

      {!hasSearched && searchResults.length === 0 && (
        <Box alignItems="center" mt={5}>
          <Text fontSize={16} color="gray" fontWeight="bold" paddingTop={150}>Please initiate a search</Text>
        </Box>
      )}

      {isLoading ? (
        <Spinner size="medium" color="black" />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box flexDirection="row" my={2} p={3} alignItems="center">
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={{ width: 100, height: 150, marginRight: 10 }}
                alt={item.title || item.name}
              />
              <VStack flex={1}>
                <Text fontWeight="bold" fontSize={16}>{item.title || item.name}</Text>
                <Text color="black" fontSize={14}>Popularity: {item.popularity?.toFixed(1)}</Text>
                <Text color="black" fontSize={14}>Release Date: {item.release_date || item.first_air_date}</Text>
                
                <Button 
                  onPress={() => setSelectedItem(item)}
                  bg="#3498db" 
                  px={3} py={2} mt={2} 
                >
                  <Text color="white" fontWeight="bold">More Details</Text>
                </Button>
              </VStack>
            </Box>
          )}
        />
      )}
    </VStack>
  );
};

export default TabSearch;
