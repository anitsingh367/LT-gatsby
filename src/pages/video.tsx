import React, { useState, useEffect } from "react";
import {
  Container,
  Pagination,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import SkeletonCard from "../components/Skeleton";
import CustomCard from "../components/Card";

interface VideoProps {
  content: {
    image: string;
    heading: string;
    description: string;
    primaryBtn: {
      btnIcon?: React.ReactNode;
      btnText: string;
      onClick: () => void;
    };
  }[];
}

const YoutbeVideo: React.FC<VideoProps> = () => {
  const rapidAPIKey = process.env.GATSBY_YOUTUBE_API_KEY;
  const rapidAPIHost = process.env.GATSBY_YOUTUBE_API_HOST;
  const [fetchVideo, setFetchVideo] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const youtubeAPI = `https://youtube-v31.p.rapidapi.com/search?channelId=UCCEo6AtbAMYTNb0dedyz54A&part=snippet%2Cid&order=date&maxResults=12&page=${page}`;

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": rapidAPIKey,
        "X-RapidAPI-Host": rapidAPIHost,
      },
    };

    const fetchVideoData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(youtubeAPI, options);
        const data = await response.json();
        setFetchVideo(data.items);
        console.log(data.items, process.env.NODE_ENV);
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideoData();
  }, [rapidAPIKey, rapidAPIHost, youtubeAPI]);

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "var(--secondary-color-light)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography
        variant="h4"
        align="center"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          padding: "2rem",
        }}>
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
        }}>
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
          }}></Box>

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
          }}>
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
            }}></Box>
        </Box>
      </Container>

      {isLoading ? (
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}>
          {Array.from(new Array(12)).map((_, index) => (
            <Box
              sx={{
                height: "auto",
                width: "18.5rem",
                margin: { xl: 2.5, lg: 2, md: 2, sm: 1.5, xs: 1 },
              }}
              key={index}>
              <SkeletonCard />
            </Box>
          ))}
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            width: "100%",
          }}>
          {fetchVideo.length === 0 ? (
            <Typography align="center">Oops! No Data found</Typography>
          ) : (
            fetchVideo.map((item, index) => (
              <Box
                sx={{
                  height: "auto",
                  width: "18.5rem",
                  margin: { xl: 2.5, lg: 2, md: 2, sm: 1.5, xs: 1 },
                }}
                key={index}>
                <CustomCard
                  heading={item.snippet.title}
                  description={item.snippet.description}
                  image={item.snippet.thumbnails.high.url}
                  primaryBtn={{
                    btnText: "Watch Now",
                    onClick: () => {
                      window.open(
                        `https://www.youtube.com/watch?v=${item.id.videoId}`
                      );
                    },
                  }}
                />
              </Box>
            ))
          )}
        </Container>
      )}
      <Pagination
        count={10}
        color="primary"
        size="large"
        onChange={handlePageChange}
      />
    </Container>
  );
};

export default YoutbeVideo;
