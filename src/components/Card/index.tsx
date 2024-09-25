import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Chip,
  Box,
  SvgIcon,
  IconButton,
  Container,
} from "@mui/material";

import defaultImage from "../../assets/default-card-image.jpg";
import { CustomCardProps } from "../../interfaces/CustomCard";
import { extractContent } from "../../utils";

export default function CustomCard({
  image,
  heading,
  type,
  description,
  chipTemplate,
  hoverEffect,
  secondaryBtns,
  primaryBtn,
  actionIcon,
}: CustomCardProps) {
  const cleanDescription = extractContent(description);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        boxShadow: 4,
        "&:hover": {
          boxShadow: hoverEffect ? 1 : 4,
        },
      }}>
      <CardMedia component="img" image={image ?? defaultImage} alt={heading} />
      <CardContent sx={{ paddingBottom: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}>
          <Container sx={{ padding: "0 !important" }} className="truncate">
            <Typography className="truncate" variant="h6" component="div">
              {heading}
            </Typography>
            {type && (
              <Typography variant="body2" sx={{ color: "#388E3C" }}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Typography>
            )}
          </Container>

          {chipTemplate && (
            <Chip
              size="small"
              sx={{
                color: `${chipTemplate.textColor} !important`,
                textTransform: "uppercase",
                marginTop: "0.2rem",
              }}
              icon={
                chipTemplate.icon && (
                  <SvgIcon
                    component={chipTemplate.icon}
                    sx={{
                      color: chipTemplate.iconColor
                        ? `${chipTemplate.iconColor} !important`
                        : `${chipTemplate.textColor} !important`,
                      fontSize: "0.7rem !important",
                    }}
                  />
                )
              }
              label={chipTemplate.chipText}
            />
          )}
        </Box>

        <Typography
          className="event-line-clamp"
          variant="body2"
          color="text.secondary"
          gutterBottom={!actionIcon}>
          {cleanDescription}
        </Typography>
      </CardContent>

      {secondaryBtns && (
        <CardActions sx={{ marginTop: "auto" }}>
          {secondaryBtns.map((button, index) => (
            <Button
              key={index}
              size="small"
              variant="contained"
              color="primary"
              onClick={button.onClick}
              sx={{ flex: 1, color: "primary.contrastText" }}
              startIcon={button.icon && <SvgIcon component={button.icon} />}>
              {button.btnText}
            </Button>
          ))}
        </CardActions>
      )}

      {primaryBtn && (
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: secondaryBtns ? 0 : "auto",
            padding: "0.1rem 0.5rem",
          }}>
          <Button
            sx={{ color: "secondary.main" }}
            size="small"
            onClick={primaryBtn.onClick}
            startIcon={
              primaryBtn.btnIcon && <SvgIcon component={primaryBtn.btnIcon} />
            }>
            {primaryBtn.btnText}
          </Button>
          {actionIcon && (
            <IconButton>
              <SvgIcon component={actionIcon} />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
}
