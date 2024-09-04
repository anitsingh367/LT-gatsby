import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import logo from "../assets/Logo.png";
import vision from "../assets/vision.png";
import React from "react";
import profilePhoto from "../assets/veerji-profile-photo.png";
import Layout from "../components/Layout";

const About = () => {
  return (
    <Layout>
      <Container maxWidth={false} disableGutters>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            padding: "4rem",
            textTransform: "uppercase",
            fontWeight: "bold",
          }}>
          <span style={{ color: "var(--primary-color)" }}>About</span> Us
        </Typography>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4rem",
          }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: { lg: "4rem", md: "2rem", sm: "1rem", xs: "0.5rem" },
              alignItems: "center",
              flexDirection: {
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              },
              width: "100%",
            }}>
            <Box
              sx={{
                width: {
                  lg: "60%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
              }}>
              <img src={profilePhoto} alt="img" width="100%" />
            </Box>
            <Box
              sx={{
                width: "100%",
              }}>
              <Typography variant="h4" gutterBottom>
                About The Living Treasure
              </Typography>
              <Typography variant="body1">
                <span style={{ fontWeight: "bold" }}>THE LIVING TREASURE </span>
                is a registered non-profit, non-governmental organization having
                the twin objectives of:
              </Typography>
              <List component={"ol"} sx={{ listStyle: "decimal", pl: 5 }}>
                <ListItem disablePadding sx={{ display: "list-item" }}>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary="Personality Development through Self-Evaluation."></ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ display: "list-item" }}>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary="Helping the needy, less privileged brethren of our society,
                    by providing them with the basic services without any
                    discrimination of religion, caste and creed."></ListItemText>
                </ListItem>
              </List>

              <Typography variant="body1">
                To achieve the above objectives we organize the following:
              </Typography>
              <List component={"ol"} sx={{ listStyle: "decimal", pl: 5 }}>
                <ListItem disablePadding sx={{ display: "list-item" }}>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary="Mind Elevation Programmes."></ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ display: "list-item" }}>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary="Public seminars, workshops, discourses and other programmes
                      for Self-Development, Growth and Self- Transformation."></ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ display: "list-item" }}>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary="Providing FREE basic medical, educational facilities and all
                      types of counseling services."></ListItemText>
                </ListItem>
                <ListItem disablePadding sx={{ display: "list-item" }}>
                  <ListItemText
                    sx={{ margin: 0 }}
                    primary="Camps for blood donation, vaccination and diagnostic
                      investigations, etc."></ListItemText>
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: { lg: "4rem", md: "2rem", sm: "1rem", xs: "0.5rem" },
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: {
                lg: "row-reverse",
                md: "column",
                sm: "column",
                xs: "column",
              },
              width: "100%",
            }}>
            <Box
              sx={{
                width: {
                  lg: "60%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
              }}>
              <img src={logo} alt="img" width="100%" />
            </Box>
            <Box
              sx={{
                width: "100%",
              }}>
              <Typography variant="h4" gutterBottom>
                About the Logo
              </Typography>
              <Typography variant="body1">
                Two Leaves shown in the logo of the living treasure Depict two
                extreme states of one's mind. One leaf is shown as totally dry
                with only skeleton left, depicting a dry state of mind, whereas
                the other leaf is fully green and full of life. Now, the dry
                state of mind means a mind without love, care,hospitality,
                concern and simplicity. A person possessing dominating, adamant
                attitudes is always depressed, confused and destructive in
                habits. So this kind of personality is of no use to the society,
                except the hope that transformation is possible with proper
                nurturing and care.One thing is very clear that this dry-looking
                leaf was not born dry, rather it was fresh looking, fully green,
                very pleasing, attractive and full of life at the time of birth.
                But with the passage of time, onslaughts of surroundings and
                environment it shed off from the tree which had to take care of
                its well-being in every way, irrespective of whether the leaf is
                thankful or thankless, agreeing or disagreeing, surrendering or
                not before the supremacy of the tree. But now once broken from
                the secured system, the leaf is sucked out of its beauty, charm,
                freshness and life And in a matter of time it loses its identity
                forever and gets accumulated with the dust and dirt of the
                ground. And once broken-off there is no way it could be rejoined
                with the Creator - the tree. But, fortunately for the human
                mind, there is a hope, there is a chance, a reunion is possible,
                a transformation is possible, if one decides to shed off one's
                heavy weight of egoism, dominating attitudes, anger, etc. And
                surrendering before the master of this universe i.e. the system
                under which this universe is working for millions of years and
                will continue in the same way.
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  width: 1,
                  flexDirection: "column",
                  textAlign: "center",
                  fontWeight: "bold",
                }}>
                "AAD SACH JUGAADH SACH HAI BI SACH NANAK HOSI BHI SACH".
              </Typography>
              <Typography variant="body1">
                One has to activate one's thought process perfectly in unison
                with this system by constantly working with the laws of nature
                which always surround us. So, a life full of youth, full of
                beauty, full of the freshness and full of freedom is possible,
                if we decide to work with The Truth, whichAs a workshop is doing
                and turning life into a well blossomed GREEN LEAF.
              </Typography>
            </Box>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              gap: { lg: "4rem", md: "2rem", sm: "1rem", xs: "0.5rem" },
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: {
                lg: "row",
                md: "column",
                sm: "column",
                xs: "column",
              },
              width: "100%",
            }}>
            <Box
              sx={{
                width: {
                  lg: "60%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
              }}>
              <img src={vision} alt="img" width="100%" />
            </Box>
            <Box
              sx={{
                width: "100%",
              }}>
              <Typography variant="h4" gutterBottom>
                Our Vision , Mission
              </Typography>
              <Typography variant="body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                neque libero, pulvinar et elementum quis, facilisis eu ante.
                Mauris non placerat sapien. Pellentesque tempor arcu non odio
                scelerisque ullamcorper. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Nam varius eros consequat auctor gravida. Fusce
                tristique lacus at urna sollicitudin pulvinar. Suspendisse
                hendrerit ultrices mauris.
              </Typography>
            </Box>
          </Box> */}
        </Container>
      </Container>
    </Layout>
  );
};

export default About;
