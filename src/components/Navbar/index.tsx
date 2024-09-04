import * as React from "react";
import { useState } from "react";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  // Collapse,
  Divider,
} from "@mui/material";

import logo from "../../assets/Logo.png";
import MenuIcon from "@mui/icons-material/Menu";
// import CustomizedMenus from "./CustomizedMenus.react";
// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";
// import ContributeModal from "../ContributeModal/ContributeModal.react";
// import VolunteerModal from "../VolunteerModal/VolunteerModal.react";

// import useHashRouteToggle from "../../customHooks/useHashRouteToggle";

import { Link } from "gatsby";

const drawerWidth = 240;

function DrawerAppBar(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const [openArticle, setOpenArticle] = useState(false);

  // const handleClickArticle = () => {
  //   setOpenArticle(!openArticle);
  // };

  //   const [openContributeModal, setOpenContributeModal] =
  //     useHashRouteToggle("contribute"); //useHasRouteToggle is used for controlling browser back button
  //   const [openVolunteerModal, setOpenVolunteerModal] =
  //     useHashRouteToggle("volunteer"); //useHasRouteToggle is used for controlling browser back button

  //   const handleContributeButton = () => {
  //     setOpenContributeModal(true);
  //   };
  //   const handleVolunteerButton = () => {
  //     setOpenVolunteerModal(true);
  //   };

  const drawer = (
    <div>
      {/* <ContributeModal
        isOpen={openContributeModal}
        onClose={(value) => setOpenContributeModal(value)}
        isNavbar={true}
      />
      <VolunteerModal
        isOpen={openVolunteerModal}
        onClose={(value) => setOpenVolunteerModal(value)}
        isNavbar={true}
      /> */}
      <Toolbar sx={{ justifyContent: "center" }}>
        <img src={logo} alt="logo" width="50%" height="50%" />
      </Toolbar>
      <Divider></Divider>
      <List>
        <Link to="/" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Home" />
          </ListItemButton>
        </Link>
        <Link to="/about" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="About" />
          </ListItemButton>
        </Link>
        <Link to="/events" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Events" />
          </ListItemButton>
        </Link>
        {/* <ListItemButton onClick={handleClickArticle}>
          <ListItemText primary="Articles" />
          {openArticle ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> */}
        {/* <Collapse in={openArticle} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="English Articls" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="Punjabi Articls" />
            </ListItemButton>
          </List>
        </Collapse> */}
        <Link to="/projects" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </Link>
        <Link to="/video" className="link" onClick={handleDrawerToggle}>
          <ListItemButton>
            <ListItemText primary="Videos" />
          </ListItemButton>
        </Link>
        <ListItemButton>
          <Button variant="contained">Become Volunteer</Button>
        </ListItemButton>
      </List>
    </div>
  );

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}>
      <AppBar component="nav" position="relative">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: {
              lg: "center",
              md: "space-between",
              sm: "space-between",
              xs: "space-between",
            },
            aligncenter: "center",
            backgroundColor: "#fff",
            color: "#000",
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" }, color: "#000" }}>
            <MenuIcon />
          </IconButton>
          <Box
            sx={{
              display: { lg: "flex", md: "none", sm: "none", xs: "none" },
            }}>
            <img src={logo} alt="logo" width="15%" height="15%"></img>
          </Box>
          <Box
            sx={{
              display: { lg: "flex", xs: "none", md: "none", sm: "none" },
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}>
            <Link to="/" className="link">
              <Button variant="h6">Home</Button>
            </Link>
            <Link to="/about" className="link">
              <Button variant="h6">About</Button>
            </Link>
            {/* <CustomizedMenus
              content={{
                title: "Articles",
                options: ["English Articles", "Punjabi Aricles"], 
              }}
            /> */}
            <Link to="/events" className="link">
              <Button variant="h6">Events</Button>
            </Link>
            <Link to="/projects" className="link">
              <Button variant="h6">Projects</Button>
            </Link>
            <Link to="/video" className="link">
              <Button variant="h6">Videos</Button>
            </Link>
            <Button variant="contained">Become Volunteer</Button>
          </Box>

          <Button variant="outlined" sx={{ margin: "0 0.5rem" }}>
            Contribute Now
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "flex", md: "flex", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}>
        {drawer}
      </Drawer>
    </Box>
  );
}

export default DrawerAppBar;
