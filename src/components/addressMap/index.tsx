
import React from "react";
import { Box } from "@mui/material";
function AddressMap() {
  return (
    <Box
      sx={{
        flex: { lg: 3, md: 2, sm: "unset", xs: "unset" },
        height: { lg: "80vh", md: "80vh", sm: "30vh", xs: "30vh" },
      }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
        frameBorder="0"
        height="100%"
        width="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        title="map"
      ></iframe>
    </Box>
  );
}

export default AddressMap