import { GluestackUIProvider, Box, Button, HStack, Text, VStack } from "@gluestack-ui/themed";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { config } from "@gluestack-ui/config";
import Header from "./src/components/layout/Header";
import MoviesContainer from "./src/components/containers/MoviesContainer";
import { useState } from "react";
import TabSearch from "./src/components/layout/TabSearch";
import TabTVShows from "./src/components/layout/TabTVShows";

const App = () => {
  const [activeTab, setActiveTab] = useState("movies");
  const [showHeader, setShowHeader] = useState(true);

  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        {showHeader && <Header />}
        
        {/* tabs section */}
        {showHeader && (
        <HStack justifyContent="space-around" bg="#2c3e50" p={3}>
          <Button
            onPress={() => setActiveTab("movies")}
            bg={activeTab === "movies" ? "#3498db" : "transparent"}
            px={3}
            py={2}
          >
            <Text color="white">Movies</Text>
          </Button>
          <Button
            onPress={() => setActiveTab("search")}
            bg={activeTab === "search" ? "#3498db" : "transparent"}
            px={3}
            py={2}
          >
            <Text color="white">Search Results</Text>
          </Button>
          <Button
            onPress={() => setActiveTab("tv")}
            bg={activeTab === "tv" ? "#3498db" : "transparent"}
            px={3}
            py={2}
          >
            <Text color="white">TV Shows</Text>
          </Button>
        </HStack>
        )}

        {/* 📌 Contenido de cada Tab */}
        <VStack flex={1} px={3} py={2}>
          {activeTab === "movies" && <MoviesContainer onToggleHeader={(value) => setShowHeader(value)} />}
          {activeTab === "search" && <TabSearch onToggleHeader={(value) => setShowHeader(value)} />}
          {activeTab === "tv" && <TabTVShows onToggleHeader={(value) => setShowHeader(value)} />}
        </VStack>

        <StatusBar style="auto" />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
};

export default App;
