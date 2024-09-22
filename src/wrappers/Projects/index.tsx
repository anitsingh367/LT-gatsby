// Import npm packages
import React from "react";
import { Typography, Container, ButtonBase } from "@mui/material";
import CustomCard from "../../components/Card";
import { Box } from "@mui/system";
import { navigate } from "gatsby";
import projectTypes from "../../data/projectTypes";

export default function Projects() {
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
      py={2}>
      <Typography
        variant="h4"
        align="center"
        mb={2}
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
        }}>
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
        }}>
        {projectTypes?.map((item, index) => {
          return (
            <Box
              onClick={() => {
                handleProjectCard(item.heading);
              }}
              height="auto"
              width="16rem"
              sx={{
                cursor: "pointer",
              }}
              key={index}>
              <ButtonBase sx={{ textAlign: "left" }}>
                <CustomCard
                  image={item.image}
                  heading={item.heading}
                  description={item.description}
                  hoverEffect
                />
              </ButtonBase>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}
