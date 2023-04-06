import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GameContextProvider } from "./GameMaster";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: `gray.700`,
      },
    },
  },
});
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <GameContextProvider>
        <App />
      </GameContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
