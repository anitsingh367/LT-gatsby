import React, { useState, useEffect } from "react";
import CustomCard from "../../components/card/Card";
import {
  Typography,
  Container,
  Box,
  // Pagination,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { FiberManualRecord as LiveDot } from "@mui/icons-material";
import PropTypes from "prop-types";
// import ShareIcon from "@mui/icons-material/Share";
import EventModal from "../../components/eventModal/index";
import useHashRouteToggle from "../../customHooks/index";
import { getEventDetails } from "../../firebase";
import moment from "moment";
import SkeletonCard from "../../components/skeleton";

EventPages.propTypes = {
  //=======================================
  // Component Specific props
  //=======================================
  content: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      heading: PropTypes.string,
      description: PropTypes.string,
      chipTemplate: PropTypes.shape({
        icon: PropTypes.object,
        chipText: PropTypes.string,
        textColor: PropTypes.string,
      }),
      secondaryBtns: PropTypes.arrayOf(
        PropTypes.shape({
          icon: PropTypes.object,
          btnText: PropTypes.string,
          onClick: PropTypes.func,
        })
      ),
      primaryBtn: PropTypes.shape({
        btnIcon: PropTypes.object,
        btnText: PropTypes.string,
        onClick: PropTypes.func,
      }),
      actionIcon: PropTypes.object,
    })
  ),
};

export default function EventPages(props) {
  const [isLoading, setIsLoading] = useState(true);
  // Status Color
  const statusColor = {
    live: "#ED0000",
    upcoming: "#388E3C",
    finished: "#999999",
  };

  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
    getEventDetails().then((data) => {
      setProjectDetails(data);
      setIsLoading(false);
    });
  }, []);

  // Handle status
  const [status, setStatus] = useState("All");
  const [eventFilter, setProjectFilter] = useState(projectDetails);
  const [openEventModal, setOpenEventModal] = useHashRouteToggle("event");
  const [selectedEvent, setSelectedEvent] = useState({
    heading: "",
    status: "",
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

  useEffect(() => {
    const filteredData = projectDetails?.filter((item) => {
      let itemStatus = item.status;
      itemStatus = itemStatus?.toLowerCase();
      return status === "All" ? item : itemStatus === status?.toLowerCase();
    });

    setProjectFilter(filteredData);
  }, [status, projectDetails]);

  const handleChangeToggle = (event) => {
    if (event.target.value !== null) {
      setStatus(event.target.value);
    }
  };

  const newEventList = eventFilter.map((items) => {
    const startDate = items.date?.startDate;
    const endDate = items.date?.endDate;

    if (moment().isBetween(startDate, endDate)) {
      items["chipTemplate"] = {
        icon: LiveDot,
        chipText: "Live",
        textColor: statusColor.live,
        iconColor: statusColor.live,
      };
      items["status"] = "live";
    } else if (moment().isBefore(startDate)) {
      items["chipTemplate"] = {
        chipText: "Upcoming",
        textColor: statusColor.upcoming,
      };
      items["status"] = "upcoming";
    } else if (moment().isAfter(endDate)) {
      items["chipTemplate"] = {
        chipText: "Finished",
        textColor: statusColor.finished,
      };
      items["status"] = "finished";
    }

    return items;
  });
  const currentDate = new Date();

  //Skeleton Loader initial state
  let skeletonCards = Array(3).fill(0);

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
      <EventModal
        isOpen={openEventModal}
        onClose={(value) => setOpenEventModal(value)}
        heading={selectedEvent.heading}
        status={selectedEvent.status}
        description={selectedEvent.description}
        onSubmit={(value) => {
          setOpenEventModal(value);
        }}
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
        }}
      >
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignitems: "center",
          }}
        >
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
            }}
          >
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
        }}
      >
        {isLoading ? (
          skeletonCards.map((item) => {
            return <SkeletonCard />;
          })
        ) : newEventList.length === 0 ? (
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
            }}
          >
            <Typography>Oops! No Data found</Typography>
          </Container>
        ) : (
          newEventList
            ?.sort((a, b) => {
              let aDate = new Date(a.date?.startDate);
              let bDate = new Date(b.date?.startDate);
              let aEndDate = new Date(a.date?.endDate);
              let bEndDate = new Date(b.date?.endDate);

              if (aDate < currentDate && aEndDate > currentDate) {
                return -1;
              } else if (bDate < currentDate && bEndDate > currentDate) {
                return 1;
              } else if (aDate > currentDate && bDate > currentDate) {
                return aDate - bDate;
              } else {
                return bEndDate - aEndDate;
              }
            })
            .map((items, index) => {
              const startDate = items.date?.startDate;
              const endDate = items.date?.endDate;
              const readableStartDate = moment(startDate).format("llll");
              const readbleEndDate = moment(endDate).format("h:mm A");

              const description =
                items.description +
                `. Session will be on ${readableStartDate}- ${readbleEndDate}`;
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
                      image: items.imageUrl,
                      heading: items.title,
                      ...items,

                      description: description,
                      primaryBtn: {
                        btnText: "View Details",
                        onClick: () => {
                          handleEventCard({
                            heading: items.title,
                            status: items.chipTemplate.chipText?.toLowerCase(),
                            description: description,
                            type: items.type,
                            mapUrl: items.mapUrl,
                            youtubeUrl: items.youtubeUrl,
                          });
                        },
                      },
                    }}
                  />
                </Box>
              );
            })
        )}
      </Container>
      {/* <Pagination count={10} shape="rounded" /> */}
    </Container>
  );
}