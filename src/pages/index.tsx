import Box from "@mui/material/Box";
import React from "react";
import Video from "../wrappers/Video";
import { HeadFC } from "gatsby";
import Layout from "../components/Layout";

const IndexPage = (props: any) => {
  return (
    <Layout>
      <Video />
    </Layout>
  );
};
export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
