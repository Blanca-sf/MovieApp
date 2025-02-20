import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, SelectContent, SelectItem, VStack, Box, Text, Spinner, FlatList, Image, Button } from "@gluestack-ui/themed";
import { getTVShows } from "../../services/api";
import TVShowDetails from "../containers/TVShowDetails";

const TabTVShows = ({ onToggleHeader = () => {} }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [tvShowsData, setTVShowsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("airing_today");
  const [selectedShow, setSelectedShow] = useState(null);

  useEffect(() => {
    fetchTVShows(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    onToggleHeader(!selectedShow); 
  }, [selectedShow]);

  const fetchTVShows = async (category) => {
    setIsLoading(true);
    try {
      const data = await getTVShows(category);
      setTVShowsData(data || []);
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
    setIsLoading(false);
  };

  
  if (selectedShow) {
    return <TVShowDetails showId={selectedShow} onBack={() => setSelectedShow(null)} />;
  }

  return (
    <VStack space={3} px={3} py={2}>
      <Box width="50%" alignSelf="center" paddingTop={20}>
      <Select selectedValue={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger>
          <SelectInput placeholder="Select TV Show Category" />
          <SelectIcon />
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem label="Airing Today" value="airing_today" />
            <SelectItem label="On The Air" value="on_the_air" />
            <SelectItem label="Popular" value="popular" />
            <SelectItem label="Top Rated" value="top_rated" />
          </SelectContent>
        </SelectPortal>
      </Select>
      </Box>

      {isLoading ? (
        <Spinner size="medium" color="black" />
      ) : (
        <FlatList
          data={tvShowsData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Box flexDirection="row" my={2} p={3} alignItems="center">
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={{ width: 100, height: 150, marginRight: 10 }}
                alt={item.name}
              />
              <VStack flex={1}>
                <Text fontWeight="bold" fontSize={16}>{item.name}</Text>
                <Text color="black" fontSize={14}>Popularity: {item.popularity?.toFixed(1)}</Text>
                <Text color="black" fontSize={14}>First Air Date: {item.first_air_date}</Text>
                
              
                <Button 
                  onPress={() => setSelectedShow(item.id)}
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

export default TabTVShows;
