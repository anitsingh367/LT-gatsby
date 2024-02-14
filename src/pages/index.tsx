import Box from "@mui/material/Box";
import React from "react";
import Video from "../wrappers/Video";
import { HeadFC } from "gatsby";

const IndexPage = (props: any) => {
  return (
    <Box>
      <Video />
    </Box>
  );
};
export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
