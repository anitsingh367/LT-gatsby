import Box from "@mui/material/Box";
import React from "react";
import Video from "../wrappers/HomePage/Video";
import { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Events from "../wrappers/HomePage/Events";
import DrawerAppBar from "../components/navbar/Navbar.react";
import Projects from "../wrappers/HomePage/Projects";
import Volunteers from "../wrappers/HomePage/Volunteers";
import Testimonial from "../wrappers/HomePage/Testimonial";

const IndexPage = (props: any) => {
  return (
    <Layout>
      <DrawerAppBar />
      <Video />
      <Events />
      <Projects />
      <Testimonial />
      <Volunteers />
    </Layout>
  );
};
export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
