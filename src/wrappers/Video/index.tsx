import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import React from "react";
import { getHomePageVideo } from "../../firebase";

const Video = () => {
  const [video, setVideo] = useState(null);
  useEffect(() => {
    getHomePageVideo().then((res) => {
      setVideo(res[0].videoUrl);
    });
  }, []);

  return (
    <Box
      height={{ lg: "85vh", sm: "100%", xs: "100%" }}
      bgcolor="secondary.light"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={{ lg: 12, xs: 0, sm: 0 }}>
      {video && (
        <video
          width="100%"
          height="100%"
          loop
          autoPlay
          muted
          style={{ objectFit: "fill" }}>
          <source src={video} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      )}
    </Box>
  );
};

export default Video;
