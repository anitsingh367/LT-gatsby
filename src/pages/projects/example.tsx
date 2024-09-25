import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  LinearProgress,
  Backdrop,
  IconButton,
} from "@mui/material";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";

interface ProjectViewServerProps {
  projectId: string;
  contribution: { goal: string; current: string };
}

const state = {
  title: "Project Title",
  headerImg:
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  youtubeURL: "https://www.youtube.com/embed/1nYFpuc2Umk",
  description: "This is a project description",
  facebookPostURL:
    '<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FVeerBhupinderSingh%2Fposts%2Fpfbid02ekf3F9AjEzoHSbTHeY7aCosvphN3adqzuEWFAShQ3xyzYHSJ9BENTrswxAzV7ZKwl&show_text=true&width=500" width="500" height="500" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>',
  images: [
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1623122617524-18ca7a791c37?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ],
  category: "Education",
  projectId: "1",
};

const serverState: ProjectViewServerProps = {
  projectId: "1",
  contribution: { goal: "100000", current: "50000" },
};

const ProjectExamplePage = () => {
  const { goal, current } = serverState.contribution;
  const progress = (parseInt(current) / parseInt(goal)) * 100;
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "2rem 0",
        }}>
        <Typography
          variant="h4"
          align="center"
          textTransform="uppercase"
          fontWeight="bold"
          component={motion.div}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          p={2}
          zIndex={2}>
          {state.title}
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          sx={{
            position: "relative",
            width: "80%",
            margin: "0 auto",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            borderRadius: "8px",
            overflow: "hidden",
            zIndex: 1,
          }}>
          <img
            alt="project_image"
            src={state.headerImg}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "80%",
            marginTop: "1rem",
          }}>
          <Box textAlign="center">
            <Typography variant="overline">RAISED</Typography>
            <Typography variant="h6" color="textPrimary">
              ${current}
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, margin: "0 1rem" }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: "10px", borderRadius: "5px" }}
            />
          </Box>
          <Box textAlign="center">
            <Typography variant="overline">GOAL</Typography>
            <Typography variant="h6" color="textPrimary">
              ${goal}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginLeft: 2 }}>
            Donate Now
          </Button>
        </Box>

        <Box
          sx={{
            width: "80%",
            marginTop: "2rem",
            paddingLeft: "1rem",
            paddingRight: "1rem",
          }}
          dangerouslySetInnerHTML={{ __html: state.description }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "80%",
            marginTop: "2rem",
            gap: "1rem",
          }}>
          {state.youtubeURL && (
            <Box
              sx={{
                flex: 1,
                height: { xs: "auto", md: "300px" },
                iframe: { width: "100%", height: "100%" },
              }}
              dangerouslySetInnerHTML={{
                __html: `<iframe src="${state.youtubeURL}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
              }}
            />
          )}
          {state.facebookPostURL && (
            <Box
              sx={{
                flex: 1,
                height: { xs: "auto", md: "300px" },
                iframe: { width: "100%", height: "100%" },
              }}
              dangerouslySetInnerHTML={{ __html: state.facebookPostURL }}
            />
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "2rem",
            width: "80%",
          }}>
          {state.images.slice(0, 6).map((image, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                width: "calc(33.333% - 1rem)",
                cursor: "pointer",
              }}
              onClick={() => handleOpen(index)}>
              <img
                src={image}
                alt={`thumbnail-${index}`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
              {index === 5 && state.images.length > 6 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "1.5rem",
                  }}>
                  +{state.images.length - 6}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}>
          <Box
            sx={{
              position: "relative",
              width: "80%",
              height: "80%",
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}>
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}
              onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Swiper
              modules={[Navigation]}
              initialSlide={activeIndex}
              spaceBetween={10}
              slidesPerView={1}
              navigation>
              {state.images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`slide-${index}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Backdrop>
      </Container>
    </>
  );
};

export default ProjectExamplePage;
