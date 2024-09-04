import Box from "@mui/material/Box";
import React from "react";
import Video from "../wrappers/Video";
import { HeadFC } from "gatsby";
import Layout from "../components/Layout";
import Events from "../wrappers/Events";
import DrawerAppBar from "../components/navbar/Navbar.react";
import Projects from "../wrappers/Projects";
import Volunteers from "../wrappers/Volunteers";
import Testimonial from "../wrappers/Testimonial";

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
