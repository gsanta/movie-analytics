import React from "react";
import { Box, ChakraBaseProvider } from "@chakra-ui/react";
import dataset from "../../dataset.csv";
import theme from "../../lib/theme";
import MovieTable from "./MovieTable";

function App() {
  const data = dataset as Record<string, string>[];

  return (
    <ChakraBaseProvider theme={theme}>
      <Box
        display="flex"
        justifyContent="space-around"
        style={{ padding: "20px" }}
      >
        <Box maxW="100%">
          <MovieTable movies={data} />
        </Box>
      </Box>
    </ChakraBaseProvider>
  );
}

export default App;
