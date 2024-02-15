import React from "react";
import Layout from "../components/Layout";
import { ThemeProvider, createTheme } from "@mui/material";

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
      <Layout>{element}</Layout>
    </ThemeProvider>
  );
};
