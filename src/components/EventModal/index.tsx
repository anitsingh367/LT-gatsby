// Import npm packages
import React, { useEffect, useState } from "react";
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
  FormHelperText,
  Checkbox,
  Slide,
  Box,
  FormLabel,
} from "@mui/material";
import {
  Close as CloseIcon,
  VolunteerActivism as Thanks,
} from "@mui/icons-material";
import CustomSnackBar from "../Snackbar";
import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../../validations";
import YoutubeFrame from "../YoutubeFrame";
import AddressMap from "../AddressMap";
import { Link } from "gatsby";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { EventModalProps } from "../../interfaces/EventModal";
import "./index.scss";
import { TransitionProps } from "@mui/material/transitions";
import { extractContent } from "./../../utils/index";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EventModal({
  isOpen,
  onClose,
  heading,
  status,
  description,
  type,
  youtubeUrl,
  mapUrl,
}: EventModalProps) {
  const initialFormState = {
    name: "",
    contact: "",
    email: "",
    noOfAttendies: "",
    reference: "",
  };

  const [open, setOpen] = useState(isOpen);
  const [checked, setChecked] = useState(false);
  const [isToasterOpen, setIsToasterOpen] = useState(false);
  const [isNameValid, setNameValid] = useState(true);
  const [isEmailValid, setEmailValid] = useState(true);
  const [formData, setFormData] = useState(initialFormState);

  const submitEventData = async () => {
    const dataRef = collection(db, "EventModalForm");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData: formData,
    });
  };

  const handleClose = () => {
    onClose(false);
    setOpen(false);
    setFormData(initialFormState);
    setChecked(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleFormChange =
    (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [prop]: event.target.value,
      }));
    };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value.trim();
    setEmailValid(emailValidation().test(email));
    if (isEmailValid) {
      setFormData((prevFormData) => ({ ...prevFormData, email }));
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.trim();
    setNameValid(nameValidation().test(name));
    if (isNameValid) {
      setFormData((prevFormData) => ({ ...prevFormData, name }));
    }
  };

  const handleSubmitForm = () => {
    setIsToasterOpen(true);
    setFormData((prevFormData) => ({ ...prevFormData, event: heading || "" }));
    submitEventData();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const inputProps = {
    min: 0,
  };

  const youtubeId = youtubeUrl?.substring(youtubeUrl?.lastIndexOf("/") + 1);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close">
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
            }}>
            <ListItemText
              primary={`${heading} (${type?.toUpperCase()} EVENT)`}
              secondary={extractContent(description)}
              sx={{
                flex: { lg: 3, md: 2, sm: "unset", xs: "unset" },
              }}
            />
            <ListItemText
              primary={`You can watch this event ${
                type === "online" ? "live on " : "on"
              }`}
              sx={{
                flex: 1,
              }}
              secondary={
                <a
                  className="youtubeLink"
                  href={`https://youtu.be/${youtubeId}`}
                  target="_blank"
                  rel="noreferrer">
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
            }}>
            {type === "offline" && status !== "finished" ? (
              <AddressMap mapUrl={mapUrl} />
            ) : (
              <YoutubeFrame youtubeUrl={youtubeId} />
            )}
            {(status === "live" || status === "upcoming") && !isToasterOpen && (
              <FormGroup
                sx={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  gap: { md: "1rem", sm: "1rem", xs: "1rem" },
                }}>
                <FormControl>
                  <InputLabel htmlFor="name" required>
                    Name
                  </InputLabel>
                  <OutlinedInput
                    id="name"
                    type="text"
                    label="Name"
                    onChange={handleNameChange}
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
                    onChange={handleEmailChange}
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
                    onChange={handleFormChange("contact")}
                    onKeyPress={(e) => {
                      if (!numberValidation().test(e.key)) {
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
                    onChange={handleFormChange("noOfAttendies")}
                    onKeyPress={(e) => {
                      if (!numberValidation().test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>
                <FormControl
                  sx={{
                    display: "flex",
                  }}>
                  <FormLabel
                    id="radio-buttons-group-event-register-label"
                    required>
                    How did you get to know about the event?
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="radio-buttons-group-event-register-label"
                    defaultValue=""
                    name="radio-buttons-group-event-register"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    onChange={handleFormChange("reference")}>
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
                      onChange={handleCheckboxChange}
                    />
                  }
                  label={
                    <label htmlFor="t_and_c">
                      I agree to the{" "}
                      <Link
                        to="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer">
                        Terms & Conditions
                      </Link>
                    </label>
                  }
                />

                <Button
                  variant="contained"
                  onClick={handleSubmitForm}
                  disabled={
                    !formData.name ||
                    !formData.contact ||
                    !formData.email ||
                    !formData.noOfAttendies ||
                    !formData.reference ||
                    !checked ||
                    !isEmailValid
                  }>
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
                }}>
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
                    onClose(value);
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
