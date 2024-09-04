import { Box } from "@mui/material";
import React from "react";
import { getMapUrl } from "../../utils";

export default function AddressMap(props) {
  const src = getMapUrl(props?.mapUrl);
  return (
    <Box
      sx={{
        flex: { lg: 3, md: 2, sm: "unset", xs: "unset" },
        height: { lg: "80vh", md: "80vh", sm: "30vh", xs: "30vh" },
      }}>
      <iframe
        src={src}
        frameBorder="0"
        height="100%"
        width="100%"
        style={{ border: 0 }}
        allowFullScreen={false}
        aria-hidden="false"
        tabIndex={0}
        title="map"></iframe>
    </Box>
  );
}
