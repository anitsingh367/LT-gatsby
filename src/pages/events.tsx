// Import npm packages
import React, { useState, useEffect } from "react";
import moment from "moment";

// Import third-party libraries
import { Link } from "react-router-dom";
import { Button, Typography, Container, Box } from "@mui/material";
import { FiberManualRecord as LiveDot } from "@mui/icons-material";

// Import custom hooks
import useHashRouteToggle from "../customHooks";

// Import local components
import { getEventDetails } from "../firebase";
import EventModal from "../components/eventModal";
import SkeletonCard from "../components/skeleton";
import CustomCard from "../components/card/Card";


interface Event {
  image: string;
  heading: string;
  description: string;
  date: {
    startDate: string;
    endDate: string;
  };
  imageUrl: string;
  title: string;
  type: string;
  mapUrl: string;
  youtubeUrl: string;
  chipTemplate?: {
    icon?: typeof LiveDot;
    chipText: string;
    textColor: string;
    iconColor?: string;
  };
}

interface EventsProps {
  content?: Event[];
}

const statusColor = {
  live: "#ED0000",
  upcoming: "#388E3C",
  finished: "#999999",
};

const Events: React.FC<EventsProps> = (props) => {
  const [eventDetails, setEventDetails] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openEventModal, setOpenEventModal] = useHashRouteToggle("event");
  const [selectedEvent, setSelectedEvent] = useState<Event>({
    heading: "",
    description: "",
    date: { startDate: "", endDate: "" },
    image: "",
    imageUrl: "",
    title: "",
    type: "",
    mapUrl: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    getEventDetails().then((data) => {
      setEventDetails(data);
      setIsLoading(false);
    });
  }, []);

  const currentDate = new Date();
  const newEventList = eventDetails
    ?.sort((a, b) => {
      const aDate = new Date(a.date.startDate);
      const bDate = new Date(b.date.startDate);
      const aEndDate = new Date(a.date.endDate);
      const bEndDate = new Date(b.date.endDate);

      if (aDate < currentDate && aEndDate > currentDate) {
        return -1;
      } else if (bDate < currentDate && bEndDate > currentDate) {
        return 1;
      } else if (aDate > currentDate && bDate > currentDate) {
        return aDate.getTime() - bDate.getTime();
      } else {
        return bEndDate.getTime() - aEndDate.getTime();
      }
    })
    .map((item) => {
      const startDate = item.date.startDate;
      const endDate = item.date.endDate;

      if (moment().isBetween(startDate, endDate)) {
        item.chipTemplate = {
          icon: LiveDot,
          chipText: "Live",
          textColor: statusColor.live,
          iconColor: statusColor.live,
        };
      } else if (moment().isBefore(startDate)) {
        item.chipTemplate = {
          chipText: "Upcoming",
          textColor: statusColor.upcoming,
        };
      } else if (moment().isAfter(endDate)) {
        item.chipTemplate = {
          chipText: "Finished",
          textColor: statusColor.finished,
        };
      }

      return item;
    });

  const handleEventCard = (selectedData: Event) => {
    setOpenEventModal(true);
    setSelectedEvent(selectedData);
  };

  const skeletonCards = Array(4).fill(0);

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
      py={2}
    >
      <EventModal
        isOpen={openEventModal}
        onClose={setOpenEventModal}
        heading={selectedEvent.heading}
        status={selectedEvent.chipTemplate?.chipText}
        description={selectedEvent.description}
        type={selectedEvent.type}
        mapUrl={selectedEvent.mapUrl}
        youtubeUrl={selectedEvent.youtubeUrl}
        onSubmit={setOpenEventModal}
      />
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
          events
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
        {isLoading ? (
          skeletonCards.map((_, index) => <SkeletonCard key={index} />)
        ) : newEventList.length === 0 ? (
          <Typography>Oops! No Data found</Typography>
        ) : (
          newEventList
            .slice(0, 4)
            .filter((item) => item.chipTemplate?.chipText !== "Finished")
            .map((item, index) => {
              const startDate = item.date.startDate;
              const endDate = item.date.endDate;
              const readableStartDate = moment(startDate).format("llll");
              const readableEndDate = moment(endDate).format("h:mm A");
              const description = `${item.description}. Session will be on ${readableStartDate} - ${readableEndDate}`;
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    maxWidth: "280px",
                  }}
                  key={index}
                >
                  <CustomCard
                    content={{
                      image: item.imageUrl,
                      heading: item.title,
                      ...item,
                      description: description,
                      primaryBtn: {
                        btnText: "View Details",
                        onClick: () => handleEventCard(item),
                      },
                    }}
                  />
                </Box>
              );
            })
        )}
      </Container>

      {newEventList && newEventList.length > 0 && (
        <Link to="/events" className="link">
          <Button variant="contained" color="primary" sx={{ mt: 2 }}>
            View All
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default Events;