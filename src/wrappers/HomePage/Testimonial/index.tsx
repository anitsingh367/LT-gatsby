import React from "react";
import  {Navigation}  from "swiper/modules";
import  {Swiper,SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
import testimonialData from "../../../data/testimonial";
import Typography from "@mui/material/Typography";
import { Container, Divider, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import "./index.scss";

const Testimonial = () => {
console.log(testimonialData);

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={2}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
      >
        WHAT{" "}
        <Box component="span" color="primary.main">
          PEOPLE{" "}
        </Box>
        THINK ABOUT US
      </Typography>
      <Container maxWidth="xl">
        <Swiper
          modules={[Navigation]}
          navigation={true}
          breakpoints={{
            576: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {testimonialData?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Avatar>{item.name.slice(0, 1)}</Avatar>
                <Typography
                  paragraph
                  variant="body1"
                  sx={{ fontWeight: "lighter" }}
                >
                  {item.description}
                </Typography>
                <Divider />
                <Typography sx={{ textTransform: "capitalize" }}>
                  {item.name}
                </Typography>
                <Typography
                  sx={{
                    color: "secondary.main",
                    textTransform: "uppercase",
                  }}
                >
                  {item.designation}
                </Typography>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Testimonial;