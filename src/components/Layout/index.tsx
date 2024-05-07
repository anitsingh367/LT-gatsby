import PropTypes from "prop-types";
import React from "react";
import Footer from "../Footer";

import "../../styles/global.scss";
import { Box } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Box>{children}</Box>
      <Footer />
    </>
  );
};


export default Layout;
