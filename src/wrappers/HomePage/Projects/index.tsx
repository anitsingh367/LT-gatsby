// Import npm packages
import React from 'react'
import { Typography, Container, ButtonBase } from "@mui/material";
import PropTypes from "prop-types";
import CustomCard from "../../../components/card/Card";
import { Box } from "@mui/system";
import { navigate} from "gatsby";

Projects.propTypes = {
  //=======================================
  // Component Specific props
  //=======================================
  content: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      heading: PropTypes.string,
      description: PropTypes.string,
    })
  ),
};

Projects.defaultProps = {
  //=======================================
  // Component Specific props
  //=======================================
  content: [
    {
      image:
        "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
      heading: "Accomplished",
      description:
        "Our NGO has achieved remarkable accomplishments in both education and medicine, contributing significantly to the advancement of these sectors.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1632215861513-130b66fe97f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGVkdWNhdGlvbiUyMGltcG9ydGFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      heading: "Ongoing",
      description:
        "In the realm of education and medicine, our ongoing NGO projects are making substantial contributions and fostering positive developments in both sectors.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGVkdWNhdGlvbiUyMGltcG9ydGFudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
      heading: "Future",
      description:
        "Our NGO envisions pioneering advancements in education and medicine, poised to shape the future of these critical sectors with innovation and impact.",
    },
  ],
};

export default function Projects(props) {
//   const navigate = useNavigate();

  const handleProjectCard = (status) => {
    navigate("/projects", {
      state: {
        status: status,
      },
    });
  };

  return (
    <Box
      component="section"
      bgcolor="secondary.light"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={2}
    >
      <Typography
        variant="h4"
        align="center"
        mb={2}
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        <Box component="span" color="primary.main">
          Projects
        </Box>{" "}
        at the living treasure
      </Typography>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
        }}
      >
        {props.content?.map((items, index) => {
          return (
            <Box
              onClick={() => {
                handleProjectCard(items.heading);
              }}
              height="auto"
              width="16rem"
              sx={{
                cursor: "pointer",
              }}
              key={index}
            >
              <ButtonBase sx={{ textAlign: "left" }}>
                <CustomCard
                  content={{
                    ...items,
                    hoverEffect: true,
                  }}
                />
              </ButtonBase>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}