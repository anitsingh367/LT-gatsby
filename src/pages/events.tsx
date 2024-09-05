import React, { useState, useEffect } from "react";

import {
  Typography,
  Container,
  Box,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { FiberManualRecord as LiveDot } from "@mui/icons-material";

import moment from "moment";
import { useHashRouteToggle } from "../utils";
import { getEventDetails } from "../firebase";
import EventModal from "../components/EventModal";
import SkeletonCard from "../components/Skeleton";
import CustomCard from "../components/Card";

interface Event {
  image?: string;
  heading: string;
  description: string;
  chipTemplate?: {
    icon?: typeof LiveDot;
    chipText: "upcoming" | "live" | "finished" | "";
    textColor: string;
    iconColor?: string;
  };
  secondaryBtns?: {
    icon: React.ReactNode;
    btnText: string;
    onClick: () => void;
  }[];
  primaryBtn?: {
    btnIcon?: React.ReactNode;
    btnText: string;
    onClick: () => void;
  };
  actionIcon?: React.ReactNode;
  date?: {
    startDate: string;
    endDate: string;
  };
  status?: "upcoming" | "live" | "finished" | "";
  type?: string;
  mapUrl?: string;
  youtubeUrl?: string;
  imageUrl?: string;
  title?: string;
}

interface EventPagesProps {
  content?: Event[];
}

const statusColor = {
  live: "#ED0000",
  upcoming: "#388E3C",
  finished: "#999999",
};

const EventPages: React.FC<EventPagesProps> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState<Event[]>([]);
  const [status, setStatus] = useState("All");
  const [eventFilter, setProjectFilter] = useState<Event[]>(projectDetails);
  const [openEventModal, setOpenEventModal] = useHashRouteToggle("event");
  const [selectedEvent, setSelectedEvent] = useState<Event>({
    image: "",
    heading: "",
    status: "",
    description: "",
    type: "",
    mapUrl: "",
    youtubeUrl: "",
  });

  useEffect(() => {
    getEventDetails().then((data) => {
      setProjectDetails(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredData = projectDetails.filter((item) => {
      const itemStatus = item.status?.toLowerCase();
      return status === "All" ? item : itemStatus === status.toLowerCase();
    });

    setProjectFilter(filteredData);
  }, [status, projectDetails]);

  const handleEventCard = (selectedData: Event) => {
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

  const handleChangeToggle = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string
  ) => {
    if (newStatus !== null) {
      setStatus(newStatus);
    }
  };

  const newEventList = eventFilter.map((items) => {
    const startDate = items.date?.startDate;
    const endDate = items.date?.endDate;

    if (moment().isBetween(startDate, endDate)) {
      items.chipTemplate = {
        icon: LiveDot,
        chipText: "live",
        textColor: statusColor.live,
        iconColor: statusColor.live,
      };
      items.status = "live";
    } else if (moment().isBefore(startDate)) {
      items.chipTemplate = {
        chipText: "upcoming",
        textColor: statusColor.upcoming,
      };
      items.status = "upcoming";
    } else if (moment().isAfter(endDate)) {
      items.chipTemplate = {
        chipText: "finished",
        textColor: statusColor.finished,
      };
      items.status = "finished";
    }

    return items;
  });

  const currentDate = new Date();
  const skeletonCards = Array(3).fill(0);

  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: "var(--secondary-color-light)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <EventModal
        isOpen={openEventModal}
        onClose={setOpenEventModal}
        heading={selectedEvent.heading}
        status={selectedEvent.status}
        description={selectedEvent.description}
        onSubmit={setOpenEventModal}
        type={selectedEvent.type}
        mapUrl={selectedEvent.mapUrl}
        youtubeUrl={selectedEvent.youtubeUrl}
      />
      <Typography
        variant="h4"
        align="center"
        sx={{
          textTransform: "uppercase",
          fontWeight: "bold",
          padding: "2rem",
        }}>
        <span style={{ color: "var(--primary-color)" }}> Events </span> at the
        living treasure
      </Typography>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
          flexDirection: {
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          gap: { lg: 0, sm: "1rem", xs: "1rem" },
        }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <ToggleButtonGroup
            aria-label="text button group"
            size="large"
            color="primary"
            exclusive
            value={status}
            onChange={handleChangeToggle}
            sx={{
              display: "flex",
              justifyContent: { sm: "center", xs: "center" },
            }}>
            <ToggleButton value="All">All</ToggleButton>
            <ToggleButton value="Live">Live</ToggleButton>
            <ToggleButton value="Upcoming">Upcoming</ToggleButton>
            <ToggleButton value="Finished">Finished</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Container>
      <Container
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          width: "100%",
        }}>
        {isLoading ? (
          skeletonCards.map((_, index) => <SkeletonCard key={index} />)
        ) : newEventList.length === 0 ? (
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
            }}>
            <Typography>Oops! No Data found</Typography>
          </Container>
        ) : (
          newEventList
            .sort((a, b) => {
              const aDate = new Date(a.date?.startDate);
              const bDate = new Date(b.date?.startDate);
              const aEndDate = new Date(a.date?.endDate);
              const bEndDate = new Date(b.date?.endDate);

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
            .map((items, index) => {
              const startDate = items.date?.startDate;
              const endDate = items.date?.endDate;
              const readableStartDate = moment(startDate).format("llll");
              const readableEndDate = moment(endDate).format("h:mm A");

              const description = `${items.description}. Session will be on ${readableStartDate} - ${readableEndDate}`;
              return (
                <Box
                  sx={{
                    height: "auto",
                    width: "18.5rem",
                    margin: { xl: 2.5, lg: 2, md: 2, sm: 1.5, xs: 1 },
                  }}
                  key={index}>
                  <CustomCard
                    image={items.imageUrl}
                    heading={items.title}
                    description={description}
                    chipTemplate={items.chipTemplate}
                    primaryBtn={{
                      btnText: "View Details",
                      onClick: () => {
                        handleEventCard({
                          heading: items.title,
                          status:
                            items.chipTemplate?.chipText?.toLowerCase() as
                              | "upcoming"
                              | "live"
                              | "finished"
                              | "",
                          description: description,
                          type: items.type,
                          mapUrl: items.mapUrl,
                          youtubeUrl: items.youtubeUrl,
                        });
                      },
                    }}
                  />
                </Box>
              );
            })
        )}
      </Container>
    </Container>
  );
};

export default EventPages;
