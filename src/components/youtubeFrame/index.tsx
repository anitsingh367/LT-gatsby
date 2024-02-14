import { Box } from "@mui/material";
import React from "react";

const YoutubeFrame = (props) => {
  return (
    <Box
      sx={{
        flex: { lg: 3, md: 2, sm: "unset", xs: "unset" },
        height: { lg: "76vh", md: "76vh", sm: "40vh", xs: "30vh" },
      }}
    >
      <iframe
        height="100%"
        width="100%"
        src={`https://www.youtube.com/embed/${props.youtubeUrl}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Box>
  );
};

export default YoutubeFrame;