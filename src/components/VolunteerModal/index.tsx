// Import npm packages
import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogContent,
  FormHelperText,
  Box,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  DialogContentText,
} from "@mui/material";
import {
  Close as CloseIcon,
  VolunteerActivism as ThanksIcon,
} from "@mui/icons-material";
import {
  emailValidation,
  nameValidation,
  numberValidation,
} from "../../validations";
import CustomSnackBar from "../Snackbar";

interface VolunteerModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
  projectHeading?: string;
}

interface VolunteerFormData {
  name: string;
  mobile: string;
  email: string;
  position: string;
  project?: string;
}

const initialFormState: VolunteerFormData = {
  name: "",
  mobile: "",
  email: "",
  position: "",
};

const VolunteerModal: React.FC<VolunteerModalProps> = ({
  isOpen,
  onClose,
  projectHeading,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<VolunteerFormData>(initialFormState);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const [isNameValid, setIsNameValid] = useState<boolean>(true);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsDialogOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    onClose(false);
    setIsDialogOpen(false);
    resetFormData();
  };

  const encode = (data) => {
    return Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");
  };

  const submitVolunteerData = async () => {
    const dataRef = collection(db, "volunteerDetails");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData: formData,
    });

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "volunteer-form", ...formData }),
    })
      .then(() => console.log("Form successfully submitted"))
      .catch((error) => alert(error));
  };

  const handleInputChange =
    (field: keyof VolunteerFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [field]: event.target.value });
    };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value.trim();
    if (!email || emailValidation().test(email) === false) {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setFormData({ ...formData, email: email });
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.trim();
    if (!name || nameValidation().test(name) === false) {
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
      setFormData({ ...formData, name: name });
    }
  };

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    formData.project = projectHeading || "";
    setIsSnackbarOpen(true);
    await submitVolunteerData();
  };

  const resetFormData = () => {
    setFormData(initialFormState);
    setIsEmailValid(true);
    setIsNameValid(true);
  };

  return (
    isOpen && (
      <Dialog open={isDialogOpen}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setIsSnackbarOpen(false);
                handleClose();
                setFormData(initialFormState);
              }}
              aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1, padding: "0.5rem 0" }}
              variant="h6"
              component="div">
              Become a Volunteer
              {projectHeading ? " for " + projectHeading : ""}
            </Typography>
          </Toolbar>
        </AppBar>

        {!isSnackbarOpen && (
          <>
            <form
              name="volunteer-form"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmitForm}>
              <input type="hidden" name="form-name" value="volunteer-form" />
              <input type="hidden" name="bot-field" />
              <DialogContent
                sx={{
                  minWidth: {
                    lg: "25rem",
                    md: "25rem",
                    sm: "20rem",
                    xs: "20rem",
                  },
                }}>
                <DialogContentText>
                  Volunteers are essential to The Living Treasure Foundation,
                  helping us preserve and promote cultural heritage. From event
                  organization to research and administrative tasks, they
                  contribute valuable skills. If you're passionate about making
                  a difference, contact us to explore current volunteer
                  opportunities.
                </DialogContentText>

                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="name-input-box" required>
                    Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="name-input-box"
                    label="Name"
                    name="name"
                    onChange={handleNameChange}
                  />
                  {!isNameValid && (
                    <FormHelperText error id="name-error">
                      Please enter a valid name
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="mobile-input-box" required>
                    Mobile
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="mobile-input-box"
                    label="Mobile"
                    name="mobile"
                    type="tel"
                    onChange={handleInputChange("mobile")}
                    onKeyPress={(e) => {
                      if (numberValidation().test(e.key) === false) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="email-input-box" required>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="email-input-box"
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleEmailChange}
                  />
                  {!isEmailValid && (
                    <FormHelperText error id="email-error">
                      Please enter a valid email address
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="position-input-box" required>
                    How can you help us?
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="position-input-box"
                    label="How can you help us?"
                    name="position"
                    type="text"
                    onChange={handleInputChange("position")}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  type="submit"
                  disabled={
                    formData.name === "" ||
                    formData.mobile === "" ||
                    formData.email === "" ||
                    formData.position === ""
                  }>
                  Submit
                </Button>
              </DialogActions>
            </form>
          </>
        )}
        {isSnackbarOpen && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              minWidth: { lg: "25rem", md: "25rem", sm: "20rem", xs: "20rem" },
            }}>
            <CustomSnackBar
              animation="zoom"
              iconColor="var(--primary-color)"
              textColor="var(--primary-color)"
              icon={ThanksIcon}
              message="Thank you for your interest, we will contact you soon"
              closeMessage="Okay"
              onClose={(value) => {
                setIsSnackbarOpen(value);
                handleClose();
                setFormData(initialFormState);
              }}
            />
          </Box>
        )}
      </Dialog>
    )
  );
};

export default VolunteerModal;
