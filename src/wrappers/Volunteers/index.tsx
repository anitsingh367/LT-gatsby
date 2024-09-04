import React from "react";
// Import Swiper React components
import { Swiper as SwiperComponent, SwiperSlide } from "swiper/react";
import  {Autoplay}  from "swiper/modules";
import { Container, Typography, Avatar, Box } from "@mui/material";

// Import Swiper styles
import "swiper/css";
import "./index.scss";
import volunteerData from "../../data/volunteer";

const Volunteers = () => {
  return (
    <Box
      component="section"
      className="volunteer-parent"
      textAlign="center"
      bgcolor="secondary.light"
      py={2}
    >
      <Typography
        variant="h4"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
        mb={2}
      >
        OUR{" "}
        <Box component="span" color="primary.main">
          {" "}
          Volunteers
        </Box>
      </Typography>
      <Container maxWidth="xl" className="swiper-container">
        <SwiperComponent
          modules={[Autoplay]}
          breakpoints={{
            576: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          speed={1500}
          loop={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
          }}
        >
          {volunteerData.map((item, index) => {
            return (
              <SwiperSlide
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Avatar
                  src={item.imgURL}
                  sx={{ width: 100, height: 100, marginBottom: 1 }}
                />
                <Typography variant="body2" gutterBottom>
                  {item.name}
                </Typography>
              </SwiperSlide>
            );
          })}
        </SwiperComponent>
      </Container>
    </Box>
  );
};

export default Volunteers;