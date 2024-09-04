import React from "react";
import Footer from "../Footer";


import { Box } from "@mui/material";


import DrawerAppBar from "../Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DrawerAppBar />
      <Box>{children}</Box>
      <Footer />
    </>
  );
};

export default Layout;
