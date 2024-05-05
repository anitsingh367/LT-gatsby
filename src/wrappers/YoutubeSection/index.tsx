import React, { useState, useEffect } from "react";
import { Container, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import SearchIcon from "@mui/icons-material/Search";
// import InputAdornment from "@mui/material/InputAdornment";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import CustomCard from "../../components/card/Card";
import CircularProgress from "@mui/material/CircularProgress";

import SkeletonCard from "../../components/skeleton/index";
let skeletonCards = Array(3).fill(0);

const YoutbeVideo = () => {

  const rapidAPIKey = process.env.GATSBY_YOUTUBE_API_KEY;
  const rapidAPIHost = process.env.GATSBY_YOUTUBE_API_HOST;
  const [fetchVideo, setfetchVideo] = useState(null);
  // const [search, setSearch] = useState("");
  // const [language, setLanguage] = useState("");
  // const [topic, setTopic] = useState("");
  // const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0)
  const youtubeAPI = `https://youtube-v31.p.rapidapi.com/search?channelId=UCCEo6AtbAMYTNb0dedyz54A&part=snippet%2Cid&order=date&maxResults=12&page=${page}`;

  // const handleChangeLanguage = (event) => {
  //   setLanguage(event.target.value);
  // };
  // const handleChangeTopic = (event) => {
  //   setTopic(event.target.value);
  // };
  // const handleChangeNewtest = (event) => {
  //   setTime(event.target.value);
  // };

  const handlePageChange = (event, values)=>{
    setPage(values)
  }
  useEffect(() => {
    // const options = {
    //   method: "GET",
    //   headers: {
    //     "X-RapidAPI-Key": rapidAPIKey,
    //     "X-RapidAPI-Host": rapidAPIHost,
    //   },
    // };
    const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        headers: {
            'X-RapidAPI-Key': '18458c0a04msh10c0a0f99cd0268p1acdbejsn9ebc33d70081',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      };
    setIsLoading(true);
    const fetchVideo = async () => {
      const response = await fetch(youtubeAPI, options);
      const data = await response.json();
      setfetchVideo(data.items);
      console.log(data);
      setIsLoading(false);
    };
    fetchVideo();
  }, [rapidAPIKey, rapidAPIHost, youtubeAPI]);

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "var(--secondary-color-light)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          padding: "2rem",
        }}
      >
        <span style={{ color: "var(--primary-color)" }}> Videos </span> at the
        living treasure
      </Typography>

      <Container
        sx={{
          display: "flex",
          flexDirection: {
            lg: "row",
            md: "column-reverse",
            sm: "column-reverse",
            xs: "column-reverse",
          },
          justifyContent: {
            lg: "space-between",
            md: "center",
            sm: "center",
            xs: "center",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            },
            gap: {
              lg: 1,
              md: 0,
            },
            alignItems: {
              lg: "flex-end",
              md: "center",
            },
          }}
        >
          {/* <Typography variant="overline">Filter By:</Typography>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="language">Language</InputLabel>
            <Select
              value={language}
              onChange={handleChangeLanguage}
              id="language"
              label="Language"
            >
              <MenuItem value={"English"}>English</MenuItem>
              <MenuItem value={"Hindi"}>Hindi</MenuItem>
              <MenuItem value={"Punjabi"}>Punjabi</MenuItem>
            </Select>
          </FormControl> */}

          {/* <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="topics">Topics</InputLabel>
            <Select value={topic} onChange={handleChangeTopic} id="topics">
              <MenuItem value={"Depression"}>Depression</MenuItem>
              <MenuItem value={"Peace"}>Peace</MenuItem>
              <MenuItem value={"Stress"}>Strees</MenuItem>
            </Select>
          </FormControl> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              lg: "row",
              md: "column-reverse",
              sm: "column-reverse",
              xs: "column-reverse",
            },
            gap: 1,
            alignItems: {
              lg: "flex-end",
              md: "center",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              },
              gap: {
                lg: 1,
                md: 0,
              },
              alignItems: {
                lg: "flex-end",
                md: "center",
              },
            }}
          >
            {/* <Typography variant="overline">Sort By:</Typography>
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="time">Time</InputLabel>
              <Select value={time} onChange={handleChangeNewtest} id="time">
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Oldest"}>Oldest</MenuItem>
              </Select>
            </FormControl> */}
          </Box>
          {/* <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <TextField
              placeholder="Search"
              variant="standard"
              onChange={(e) => setSearch(e.target.value)}
              sx={{ minWidth: 120 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </FormControl> */}
        </Box>
      </Container>
      {!isLoading && (
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {isLoading ? (
            skeletonCards.map((item) => {
              return <SkeletonCard />;
            })
          ) : fetchVideo?.length === 0 ? (
            <Typography align="center">Oops! No Data found</Typography>
          ) : (
            fetchVideo
              // ?.filter((filterItem) => {
              //   return search.toLowerCase() === ""
              //     ? filterItem
              //     : filterItem.snippet.title
              //         .toLowerCase()
              //         .includes(search.toLowerCase());
              // })
              ?.map((item, index) => {
                return (
                  <Box
                    sx={{
                      height: "auto",
                      width: "18.5rem",
                      margin: { xl: 2.5, lg: 2, md: 2, sm: 1.5, xs: 1 },
                    }}
                    key={index}
                  >
                    <CustomCard
                      content={{
                        ...item,
                        heading: item.snippet.title,
                        description: item.snippet.description,
                        image: item.snippet.thumbnails.high.url,
                        primaryBtn: {
                          btnText: "Watch Now",
                          onClick: () => {
                            window.open(
                              `https://www.youtube.com/watch?v=${item.id.videoId}`
                            );
                          },
                        },
                      }}
                    />
                  </Box>
                );
              })
          )}
        </Container>
      )}
      {isLoading && (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "90vh",
          }}
        >
          <CircularProgress color="inherit" />
        </Container>
      )}
      <Pagination count={10} color="primary" size="large" onChange={handlePageChange} />
    </Container>
  );
};

YoutbeVideo.propTypes = {
    //=======================================
    // Component Specific props
    //=======================================
    content: PropTypes.arrayOf(
      PropTypes.shape({
        image: PropTypes.string,
        heading: PropTypes.string,
        description: PropTypes.string,
        primaryBtn: PropTypes.shape({
          btnIcon: PropTypes.object,
          btnText: PropTypes.string,
          onClick: PropTypes.func,
        }),
      })
    ),
  };

export default YoutbeVideo;