import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import "./projects.scss";

import { useHashRouteToggle } from "../../utils";
import { getProjectDetails } from "../../firebase";
import VolunteerModal from "../../components/VolunteerModal";
import SkeletonCard from "../../components/Skeleton";
import CustomCard from "../../components/Card";
import { navigate } from "gatsby";

interface Project {
  image: string;
  heading: string;
  description: string;
  chipTemplate?: {
    icon?: React.ReactNode;
    chipText: string;
    textColor: string;
  };
  secondaryButtons?: {
    icon?: React.ReactNode;
    buttonText: string;
    onClick: () => void;
  }[];
  primaryButton?: {
    buttonIcon?: React.ReactNode;
    buttonText: string;
    onClick: () => void;
  };
  actionIcon?: React.ReactNode;
  category?: string;
  status?: string;
  projectId?: string;
}

interface ProjectsPageProps {
  content?: Project[];
}

const ProjectsPage: React.FC<ProjectsPageProps> = (props) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isContributeModalOpen, setIsContributeModalOpen] =
    useHashRouteToggle("contribute");
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] =
    useHashRouteToggle("volunteer");

  useEffect(() => {
    getProjectDetails().then((data) => {
      setAllProjects(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const filteredData = allProjects.filter((project) => {
      const projectCategory = project.category;
      const projectStatus = project.status;
      return selectedCategory === "All" && selectedStatus === "All"
        ? project
        : selectedCategory === "All" && selectedStatus !== "All"
        ? projectStatus === selectedStatus
        : selectedCategory !== "All" && selectedStatus === "All"
        ? projectCategory === selectedCategory
        : projectCategory === selectedCategory &&
          projectStatus === selectedStatus;
    });
    setFilteredProjects(filteredData);
  }, [selectedCategory, selectedStatus, allProjects]);

  const handleCategoryChange = (e, newCategory: string) => {
    if (newCategory !== null) {
      setSelectedCategory(newCategory);
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setSelectedStatus(event.target.value);
  };

  const openContributeModal = (title: string) => {
    setIsContributeModalOpen(true);
    setProjectTitle(title);
  };

  const openVolunteerModal = (title: string) => {
    setIsVolunteerModalOpen(true);
    setProjectTitle(title);
  };

  const viewProjectDetails = (project: Project) => {
    navigate(`/projects/${project.projectId}`);
  };

  const skeletonCards = Array(3).fill(0);

  return (
    <>
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={setIsVolunteerModalOpen}
        projectHeading={projectTitle}
      />
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
          textTransform="uppercase"
          fontWeight="bold"
          p={2}>
          <span style={{ color: "var(--primary-color)" }}> Projects </span> at
          the living treasure
        </Typography>
        <Container>
          <Box
            display="flex"
            justifyContent="space-between"
            alignContent="center"
            flexDirection={{
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            }}
            gap={{ lg: 0, sm: "1rem", xs: "1rem" }}>
            <ToggleButtonGroup
              aria-label="text button group"
              size="large"
              color="primary"
              exclusive
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                display: "flex",
                justifyContent: { sm: "center", xs: "center" },
              }}>
              <ToggleButton value="All">All</ToggleButton>
              <ToggleButton value="Education">Education</ToggleButton>
              <ToggleButton value="Medical">Medical</ToggleButton>
              <ToggleButton value="Charity">Charity</ToggleButton>
            </ToggleButtonGroup>

            <Box display="flex" justifyContent="center" alignItems="center">
              <Select value={selectedStatus} onChange={handleStatusChange}>
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Ongoing">Ongoing</MenuItem>
                <MenuItem value="Accomplished">Accomplished</MenuItem>
                <MenuItem value="Future">Future</MenuItem>
              </Select>
            </Box>
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
          ) : filteredProjects.length === 0 ? (
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
            filteredProjects.map((project, index) => (
              <Box
                sx={{
                  height: "auto",
                  width: "18.5rem",
                  margin: { xl: 2.5, lg: 2, md: 2, sm: 1.5, xs: 1 },
                }}
                key={index}
                className="cardImg">
                <CustomCard
                  image={project.image}
                  heading={project.heading}
                  description={project.description ?? ""}
                  chipTemplate={{ chipText: project.category ?? "" }}
                  primaryBtn={{
                    btnText: "View Details",
                    onClick: () => {
                      viewProjectDetails(project);
                    },
                  }}
                  secondaryBtns={
                    project.status === "Accomplished"
                      ? undefined
                      : [
                          {
                            btnText: "Contribute",
                            onClick: () => {
                              openContributeModal(project.heading);
                            },
                          },
                          {
                            btnText: "Volunteer",
                            onClick: () => {
                              openVolunteerModal(project.heading);
                            },
                          },
                        ]
                  }
                />
              </Box>
            ))
          )}
        </Container>
      </Container>
    </>
  );
};

export default ProjectsPage;
