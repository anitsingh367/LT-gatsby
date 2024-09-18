import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListSubheader,
  Button,
  Box,
  Container,
  ListItemText,
  Typography,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link } from "gatsby";
import { getEventDetails } from "../../firebase";
import moment from "moment";
import { useHashRouteToggle } from "../../utils";
import EventModal from "../EventModal";

const Footer = () => {
  const [eventTitle, setEventTitle] = useState([]);

  const [eventDetails, setEventDetails] = useState([]);
  useEffect(() => {
    getEventDetails().then((data) => {
      setEventDetails(data);
    });
  }, []);
  const currentDate = new Date();
  const newEventList = eventDetails
    .sort((a, b) => {
      const aDate = new Date(a.date.startDate);
      const bDate = new Date(b.date.startDate);
      const aEndDate = new Date(a.date.endDate);
      const bEndDate = new Date(b.date.endDate);

      if (aDate < currentDate && aEndDate > currentDate) return -1;
      if (bDate < currentDate && bEndDate > currentDate) return 1;
      if (aDate > currentDate && bDate > currentDate)
        return aDate.getTime() - bDate.getTime();
      return bEndDate.getTime() - aEndDate.getTime();
    })
    .map((item) => {
      const startDate = item.date.startDate;
      const endDate = item.date.endDate;

      if (moment().isBetween(startDate, endDate)) {
        item.chipTemplate = {
          chipText: "Live",
        };
      } else if (moment().isBefore(startDate)) {
        item.chipTemplate = {
          chipText: "Upcoming",
        };
      } else if (moment().isAfter(endDate)) {
        item.chipTemplate = {
          chipText: "Finished",
        };
      }

      return item;
    });
  const homePageEventList = newEventList
    .slice(0, 4)
    .filter((item) => item.chipTemplate.chipText !== "Finished");

  const [openEventModal, setOpenEventModal] = useHashRouteToggle("event");
  const [selectedEvent, setSelectedEvent] = useState({
    heading: "",
    status: "" as "" | "upcoming" | "live" | "finished",
    description: "",
    type: "",
    mapUrl: "",
    youtubeUrl: "",
  });

  const handleEventCard = (selectedData) => {
    setOpenEventModal(true);
    setSelectedEvent({
      heading: selectedData.heading,
      status: selectedData.status,
      description: selectedData.description,
      type: selectedData.type,
      mapUrl: selectedData.mapUrl,
      youtubeUrl: selectedData.youtubeUrl,
    });
  };
  return (
    <>
      <Box
        sx={{
          width: 1,
          backgroundColor: "secondary.main",
        }}
      >
        <EventModal
          isOpen={openEventModal}
          onClose={setOpenEventModal}
          heading={selectedEvent.heading}
          status={selectedEvent.status}
          description={selectedEvent.description}
          type={selectedEvent.type}
          mapUrl={selectedEvent.mapUrl}
          youtubeUrl={selectedEvent.youtubeUrl}
          onSubmit={() => setOpenEventModal(false)}
        />
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "secondary.main",
            gap: "4rem",
            flexDirection: {
              lg: "row",
              md: "column",
              sm: "column",
              xs: "column",
            },
          }}
        >
          <List
            sx={{
              width: { lg: "33.33%", md: 1, sm: 1, xs: 1 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              alignSelf: "start",
            }}
          >
            <ListSubheader
              disableGutters
              sx={{
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
              }}
            >
              about the living treasure
            </ListSubheader>
            <ListItemText
              sx={{
                color: "secondary.contrastText",
              }}
            >
              Promoting the doctrine of "The Universal Truth", which stands for
              equal value to every human, irrespective of caste, creed, color or
              gender.
            </ListItemText>
            <Button
              variant="outlined"
              sx={{
                textTransform: "capitalise",
                borderColor: "#fff",
                color: "#fff",
                marginTop: "1rem",
              }}
            >
              <Link
                to="/about"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                Know More
              </Link>
            </Button>
          </List>
          <List
            sx={{
              textAlign: "left",
              width: { lg: "33.33%", md: 1, sm: 1, xs: 1 },
            }}
          >
            <ListSubheader
              disableGutters
              sx={{
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
              }}
            >
              UPCOMING EVENTS
            </ListSubheader>
            {homePageEventList.length === 0 ? (
              <Typography color="secondary.contrastText">
                There are no upcoming events at the moment. Stay tuned for
                future announcements!
              </Typography>
            ) : (
              homePageEventList.slice(0, 5)?.map((item, index) => {
                const startDate = item.date.startDate;
                const endDate = item.date.endDate;
                const readableStartDate = moment(startDate).format("llll");
                const readableEndDate = moment(endDate).format("h:mm A");
                const description = `${item.description}. Session will be on ${readableStartDate} - ${readableEndDate}`;
                return (
                  <Box
                    key={index}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      handleEventCard({
                        heading: item.title,
                        status: item.chipTemplate.chipText.toLowerCase(),
                        description: description,
                        type: item.type,
                        mapUrl: item.mapUrl,
                        youtubeUrl: item.youtubeUrl,
                      });
                    }}
                  >
                    <ListItem
                      disableGutters
                      disablePadding
                      sx={{ color: "secondary.contrastText" }}
                    >
                      <ListItemText>{item.title}</ListItemText>
                    </ListItem>
                  </Box>
                );
              })
            )}
          </List>
          <List
            sx={{
              width: { lg: "33.33%", md: 1, sm: 1, xs: 1 },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ListSubheader
              disableGutters
              sx={{
                textTransform: "uppercase",
                background: "transparent",
                color: "#fff",
              }}
            >
              CONTACT US
            </ListSubheader>
            <ListItem
              sx={{
                color: "secondary.contrastText",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              disableGutters
              disablePadding
            >
              <ListItemText primary="9 Hallyer Avenue" />
              <ListItemText primary="Brampton, L6M0Y4" />
              <ListItemText primary="Ontario, Canada" />
            </ListItem>

            <ListItem disableGutters disablePadding sx={{ marginTop: "auto" }}>
              <ListItemText sx={{ color: "secondary.contrastText" }}>
                <span style={{ color: "#fff" }}>Phone</span>: +1 905-335-5921
              </ListItemText>
            </ListItem>
            <ListItem disableGutters disablePadding>
              <ListItemText sx={{ color: "secondary.contrastText" }}>
                <span style={{ color: "#fff" }}>Email</span>:
                office@thelivingtreasure.ca
              </ListItemText>
            </ListItem>
          </List>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
            color: "#fff",
            padding: "1.5rem",
          }}
        >
          <a
            href="https://www.instagram.com/veerbhupindersingh_usa/"
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            <InstagramIcon fontSize="large" />
          </a>
          <LinkedInIcon fontSize="large" />
          <a
            href="https://www.youtube.com/@TheLivingTreasure"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <YouTubeIcon fontSize="large" />
          </a>
          <a
            href="https://www.facebook.com/VeerBhupinderSingh/"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            <FacebookIcon fontSize="large" />
          </a>
        </Container>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
            background: "#323B45",
            textAlign: "center",
          }}
          maxWidth={false}
        >
          <Typography
            sx={{
              padding: "1.5rem",
            }}
          >
            Copyright 2022.{" "}
            <Link to="/terms-and-conditions" style={{ color: "inherit" }}>
              <Box component="span">Terms and Conditions</Box>
            </Link>{" "}
            All Rights Reserved by The Living Treasure.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Footer;
