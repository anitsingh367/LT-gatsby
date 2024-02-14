// Import npm packages
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import {
  Button,
  Container,
  FormControl,
  Radio,
  RadioGroup,
  OutlinedInput,
  FormControlLabel,
  Dialog,
  InputLabel,
  Typography,
  IconButton,
  Toolbar,
  AppBar,
  Divider,
  List,
  ListItem,
  ListItemText,
  FormGroup,
  FormLabel,
  FormHelperText,
  Checkbox,
  Slide,
  Box,
} from "@mui/material";
import {
  Close as CloseIcon,
  VolunteerActivism as Thanks,
} from "@mui/icons-material";

import CustomSnackBar from "../snackbar/CustomSnakBar";

import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../../validations";

import YoutubeFrame from "../youtubeFrame";
import AddressMap from "../addressMap";
import { Link } from "gatsby";
import "./index.scss";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import "./index.scss"

EventModal.propTypes = {
  //=======================================
  // Component Specific props
  //=======================================
  heading: PropTypes.string,
  description: PropTypes.string,
  status: PropTypes.oneOf(["upcoming", "live", "finished", ""]), //Added empty string for warnings handling
  onClick: PropTypes.func,
  isOpen: PropTypes.bool,
  onSubmit: PropTypes.func,
  mapUrl: PropTypes.string,
  youtubeUrl: PropTypes.string,
};

EventModal.defaultProps = {
  //=======================================
  // Component Specific props
  //=======================================
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventModal(props) {
  const initialFormState = {
    name: "",
    contact: "",
    email: "",
    noOfAttendies: "",
    reference: "",
  };

  const [open, setOpen] = React.useState(props.isOpen);
  const [checked, setChecked] = useState(false);
  const [isToasterOpen, setIsToasterOpen] = useState(false);
  const [isNameValid, setNameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [formData, setFormData] = useState(initialFormState);
  // form submission
  const eventeData = async () => {
    const dataRef = collection(db, "EventModalForm");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData: formData,
    });
  };
  const handleClose = () => {
    props.onClose(false);
    setOpen(false);
    setFormData(initialFormState);

    setChecked(false);
  };

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  //Handle Form Data
  const handleForm = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value });
  };

  //Handle Email Validation
  const handleEmail = (e) => {
    let email = e.target.value.trim();

    if (!email || emailValidation().test(email) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
      setFormData({ ...formData, email: email });
    }
  };

  //Handle Name
  const handleName = (e) => {
    let name = e.target.value.trim();

    if (!name || nameValidation().test(name) === false) {
      setNameValid(false);
    } else {
      setNameValid(true);
      setFormData({ ...formData, name: name });
    }
  };

  //Handle Form Submit
  const handleSubmitForm = () => {
    setIsToasterOpen(true);
    console.log(props.heading);
    formData.event = props.heading;
    formData.event = props.heading ? props.heading : "";
    eventeData();
    console.log(formData);
  };

  //Handle Checkbox
  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
  };

  const inputProps = {
    min: 0,
  };

  const youtubeId = props.youtubeUrl?.substring(
    props.youtubeUrl?.lastIndexOf("/") + 1
  );

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Event Details
            </Typography>
          </Toolbar>
        </AppBar>

        <List>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: {
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}
          >
            <ListItemText
              primary={
                props.heading + " (" + props.type?.toUpperCase() + " EVENT)"
              }
              secondary={props.description}
              sx={{
                flex: { lg: 3, md: 2, sm: "unset", xs: "unset" },
              }}
            />
            <ListItemText
              primary={
                `You can watch this event ` +
                (props.type === "online" ? "live on " : "on")
              }
              sx={{
                flex: 1,
              }}
              secondary={
                <a
                  className="youtubeLink"
                  href={`https://youtu.be/${youtubeId}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Youtube
                </a>
              }
            />
          </ListItem>

          <Divider />

          <Container
            maxWidth={false}
            sx={{
              display: "flex",
              gap: 3,
              marginTop: 2,
              flexDirection: {
                xl: "row",
                lg: "row",
                md: "row",
                sm: "column",
                xs: "column",
              },

              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            {props.type === "offline" && props.status !== "finished" ? (
              <AddressMap />
            ) : (
              <YoutubeFrame youtubeUrl={youtubeId} />
            )}
            {(props.status === "live" || props.status === "upcoming") &&
              !isToasterOpen && (
                <FormGroup
                  sx={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "space-between",
                    gap: { md: "1rem", sm: "1rem", xs: "1rem" },
                  }}
                >
                  <FormControl>
                    <InputLabel htmlFor="name" required>
                      Name
                    </InputLabel>
                    <OutlinedInput
                      id="name"
                      type="text"
                      label="Name"
                      onChange={handleName}
                    />
                    {!isNameValid && (
                      <FormHelperText error id="name-error">
                        Please enter valid name
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="email" required>
                      Email
                    </InputLabel>
                    <OutlinedInput
                      id="email"
                      label="Email"
                      type="email"
                      onChange={handleEmail}
                    />
                    {!isEmailValid && (
                      <FormHelperText error id="email-error">
                        Please enter valid email
                      </FormHelperText>
                    )}
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="contact-number" required>
                      Contact Number
                    </InputLabel>
                    <OutlinedInput
                      id="contact-number"
                      label="Contact Number"
                      type="tel"
                      onChange={handleForm("contact")}
                      onKeyPress={(e) => {
                        if (numberValidation().test(e.key) === false) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormControl>
                    <InputLabel htmlFor="number-of-attendies" required>
                      Number of Attendies
                    </InputLabel>
                    <OutlinedInput
                      id="number-of-attendies"
                      label="Number of Attendies"
                      type="number"
                      inputProps={inputProps}
                      onChange={handleForm("noOfAttendies")}
                      onKeyPress={(e) => {
                        if (numberValidation().test(e.key) === false) {
                          e.preventDefault();
                        }
                      }}
                    />
                  </FormControl>
                  <FormControl
                    sx={{
                      display: "flex",
                    }}
                  >
                    <FormLabel
                      id="radio-buttons-group-event-register-label"
                      required
                    >
                      How did you get to know about the event?
                    </FormLabel>
                    <RadioGroup
                      required
                      row
                      aria-labelledby="radio-buttons-group-event-register-label"
                      defaultValue={""}
                      name="radio-buttons-group-event-register"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      onChange={handleForm("reference")}
                    >
                      <FormControlLabel
                        value="Whatsapp"
                        control={<Radio />}
                        label="Whatsapp"
                      />
                      <FormControlLabel
                        value="Facebook"
                        control={<Radio />}
                        label="Facebook"
                      />
                      <FormControlLabel
                        value="Youtube"
                        control={<Radio />}
                        label="Youtube"
                      />
                      <FormControlLabel
                        value="Website"
                        control={<Radio />}
                        label="Website"
                      />
                      <FormControlLabel
                        value="Family"
                        control={<Radio />}
                        label="Friends/ Family"
                      />
                    </RadioGroup>
                  </FormControl>

                  <FormControlLabel
                    control={
                      <Checkbox
                        id="t_and_c"
                        checked={checked}
                        onChange={handleCheckbox}
                      />
                    }
                    label={
                      <label htmlFor={"t_and_c"}>
                        I agree to the{" "}
                        <Link
                          to="/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Terms & Conditions
                        </Link>
                      </label>
                    }
                  />

                  <Button
                    variant="contained"
                    onClick={handleSubmitForm}
                    disabled={
                      formData.name === "" ||
                      formData.contact === "" ||
                      formData.email === "" ||
                      formData.noOfAttendies === "" ||
                      formData.reference === "" ||
                      !checked ||
                      !isEmailValid
                        ? true
                        : false
                    }
                  >
                    Register
                  </Button>
                </FormGroup>
              )}
            {isToasterOpen && (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CustomSnackBar
                  animation="zoom"
                  iconColor="var(--primary-color)"
                  textColor="var(--primary-color)"
                  backgroundColor="var(--primary-color-light)"
                  icon={Thanks}
                  message="Thanks !! it means a lot to us"
                  closeMessage="Okay"
                  onClose={(value) => {
                    setOpen(value);
                    setChecked(false);
                    props.onClose(value);
                    setIsToasterOpen(value);
                    setFormData(initialFormState);
                  }}
                />
              </Box>
            )}
          </Container>
        </List>
      </Dialog>
    </div>
  );
}