import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import DrawerAppBar from "../components/Navbar";
import Footer from "../components/Footer";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "../styles/global.scss";

export const wrapPageElement = ({ element }: { element: React.ReactNode }) => {
  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: "#FF0000",
          },
        },
      },
    },
    typography: {
      button: {
        color: "#000000de",
      },
    },
    palette: {
      primary: {
        main: "#29af8a",
        contrastText: "#fff",
      },
      secondary: {
        main: "#435061",
        light: "rgba(67, 80, 97, 12%)",
        contrastText: "#ffffff88",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <DrawerAppBar />
        {element}
        <Footer />
      </>
    </ThemeProvider>
  );
};
