import PropTypes from "prop-types";
import React from "react";
import Footer from "../Footer";

import "../../styles/global.scss";
import { Box } from "@mui/material";

const Layout = ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
