import React from "react";
import Video from "../wrappers/Video";
import { HeadFC } from "gatsby";
import Events from "../wrappers/Events";
import Projects from "../wrappers/Projects";
import Volunteers from "../wrappers/Volunteers";
import Testimonial from "../wrappers/Testimonial";

const IndexPage = (props: any) => {
  return (
    <>
      <Video />
      <Events />
      <Projects />
      <Testimonial />
      <Volunteers />
    </>
  );
};
export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
