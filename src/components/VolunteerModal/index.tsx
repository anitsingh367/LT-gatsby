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
  VolunteerActivism as Thanks,
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

interface FormData {
  name: string;
  mob: string;
  email: string;
  position: string;
  project?: string;
}

const initialFormState: FormData = {
  name: "",
  mob: "",
  email: "",
  position: "",
};

const VolunteerModal: React.FC<VolunteerModalProps> = (props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [isEmailValid, setEmailValid] = useState<boolean>(true);
  const [isNameValid, setNameValid] = useState<boolean>(true);
  const [isToasterOpen, setIsToasterOpen] = useState<boolean>(false);

  useEffect(() => {
    setOpen(props.isOpen);
  }, [props.isOpen]);

  const handleClose = () => {
    props.onClose(false);
    setOpen(false);
    resetData();
  };

  const volunteereData = async () => {
    const dataRef = collection(db, "volunteerDetails");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData: formData,
    });
  };

  const handleForm =
    (prop: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [prop]: event.target.value });
    };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value.trim();
    if (!email || emailValidation().test(email) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
      setFormData({ ...formData, email: email });
    }
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.trim();
    if (!name || nameValidation().test(name) === false) {
      setNameValid(false);
    } else {
      setNameValid(true);
      setFormData({ ...formData, name: name });
    }
  };

  const handleSubmitForm = () => {
    formData.project = props.projectHeading || "";
    setIsToasterOpen(true);
    volunteereData();
  };

  const resetData = () => {
    setFormData(initialFormState);
    setEmailValid(true);
    setNameValid(true);
  };

  return (
    props.isOpen && (
      <Dialog open={open}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => {
                setIsToasterOpen(false);
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
              {props.projectHeading ? " for " + props.projectHeading : ""}
            </Typography>
          </Toolbar>
        </AppBar>

        {!isToasterOpen && (
          <>
            <form
              name="volunteer-form"
              method="POST"
              data-netlify="true"
              onSubmit={handleSubmitForm}
            >
              <input type="hidden" name="form-name" value="volunteer-form" />
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                  minWidth: {
                    lg: "25rem",
                    md: "25rem",
                    sm: "20rem",
                    xs: "20rem",
                  },
                }}
              >
                <DialogContentText>
                  Volunteers are essential to The Living Treasure Foundation, helping us
                  preserve and promote cultural heritage. From event organization to
                  research and administrative tasks, they contribute valuable skills. If
                  you're passionate about making a difference, contact us to explore
                  current volunteer opportunities.
                </DialogContentText>
                <FormControl sx={{ marginTop: "0.5rem" }}>
                  <InputLabel htmlFor="name-input-box" required>
                    Name
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="name-input-box"
                    label="Name"
                    name="name"
                    onChange={handleName}
                  />
                  {!isNameValid && (
                    <FormHelperText error id="name-error">
                      Please enter valid name
                    </FormHelperText>
                  )}
                </FormControl>
          
                <FormControl sx={{ flex: 1 }}>
                  <InputLabel htmlFor="mobile-input-box" required>
                    Mobile
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="mobile-input-box"
                    label="Mobile"
                    name="mobile"
                    type="tel"
                    onChange={handleForm("mob")}
                    onKeyPress={(e) => {
                      if (numberValidation().test(e.key) === false) {
                        e.preventDefault();
                      }
                    }}
                  />
                </FormControl>

                <FormControl
                  sx={{
                    flex: 1,
                  }}
                >
                  <InputLabel htmlFor="email-input-box" required>
                    Email
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="email-input-box"
                    label="Email"
                    name="email"
                    type="email"
                    onChange={handleEmail}
                  />
                  {!isEmailValid && (
                    <FormHelperText error id="email-error">
                      Please enter valid email address
                    </FormHelperText>
                  )}
                </FormControl>
                
                <FormControl
                  sx={{
                    flex: 1,
                  }}
                >
                  <InputLabel htmlFor="position-input-box" required>
                    How can you help us?
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="position-input-box"
                    label="How can you help us?"
                    name="position"
                    type="text"
                    onChange={handleForm("position")}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button
                  type="submit"
                  disabled={
                    formData.name === "" ||
                    formData.mob === "" ||
                    formData.email === "" ||
                    formData.position === ""
                  }
                >
                  Submit
                </Button>
              </DialogActions>
            </form>
          </>
        )}
        {isToasterOpen && (
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
              icon={Thanks}
              message="Thank you for your interest, we will contact you soon"
              closeMessage="Okay"
              onClose={(value) => {
                setIsToasterOpen(value);
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
