import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  AppBar,
  Typography,
  IconButton,
  FormGroup,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface ContributeModalProps {
  isNavbar: boolean;
  projectHeading?: string;
  isOpen: boolean;
  onClose: (value: boolean) => void;
}

const ContributeModal: React.FC<ContributeModalProps> = ({
  isNavbar,
  projectHeading,
  isOpen,
  onClose,
}) => {
  const [currency, setCurrency] = useState("CAD");
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    mobile: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    amount: "",
    name: "",
    mobile: "",
    email: "",
  });
  const [touched, setTouched] = useState({
    amount: false,
    name: false,
    mobile: false,
    email: false,
  });
  const [dirty, setDirty] = useState({
    amount: false,
    name: false,
    mobile: false,
    email: false,
  });

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());
  const validateMobile = (mobile: string) => /^[0-9]{10}$/.test(mobile);
  const validateAmount = (amount: string) => /^[0-9]*$/.test(amount);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    if (dirty[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, formData[field])
          ? ""
          : getErrorMessage(field),
      }));
    }
  };

  const handleChange = (field: string, value: string) => {
    setDirty((prev) => ({ ...prev, [field]: true }));
    setFormData((prev) => ({ ...prev, [field]: value }));

    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, value) ? "" : getErrorMessage(field),
    }));
  };

  const validateField = (field: string, value: string) => {
    switch (field) {
      case "amount":
        return validateAmount(value);
      case "name":
        return value.trim() !== "";
      case "mobile":
        return validateMobile(value);
      case "email":
        return validateEmail(value);
      default:
        return true;
    }
  };  

  const getErrorMessage = (field: string) => {
    switch (field) {
      case "amount":
        return "Valid amount is required";
      case "name":
        return "Name is required";
      case "mobile":
        return "Valid mobile number is required";
      case "email":
        return "Valid email is required";
      default:
        return "";
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      amount: validateField("amount", formData.amount)
        ? ""
        : getErrorMessage("amount"),
      name: validateField("name", formData.name) ? "" : getErrorMessage("name"),
      mobile: validateField("mobile", formData.mobile)
        ? ""
        : getErrorMessage("mobile"),
      email: validateField("email", formData.email)
        ? ""
        : getErrorMessage("email"),
    };

    setErrors(newErrors);
    setTouched({
      amount: true,
      name: true,
      mobile: true,
      email: true,
    });

    const isValid = Object.values(newErrors).every((error) => error === "");

    if (isValid) {
      // Handle form submission
      console.log("Form submitted");
    }
  };

  const resetForm = () => {
    setCurrency("CAD");
    setFormData({
      amount: "",
      name: "",
      mobile: "",
      email: "",
    });
    setErrors({
      amount: "",
      name: "",
      mobile: "",
      email: "",
    });
    setTouched({
      amount: false,
      name: false,
      mobile: false,
      email: false,
    });
    setDirty({
      amount: false,
      name: false,
      mobile: false,
      email: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose(false);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {isNavbar
              ? "Contribute For The Cause"
              : `Contribute To ${projectHeading ? projectHeading : "Project"}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <DialogContentText>
          We Need your support FOR tv broadcast, webcast, books, magazines, Self
          Elevating Workshops / seminars, workshops & Seminars in schools &
          colleges ,Medical camp & dispensary, education support & to run many
          other projects for humanity & noble cause Your Monthly Contribution
          help us to serve the needy and less privileged brethren of our
          society. It enables us to provide them with the basic services without
          any discrimination of religion, caste and creed.
        </DialogContentText>
        <FormControl component="fieldset" fullWidth margin="normal">
          <RadioGroup
            row
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}>
            <FormControlLabel value="USD" control={<Radio />} label="USD" />
            <FormControlLabel value="EUR" control={<Radio />} label="EURO" />
            <FormControlLabel value="CAD" control={<Radio />} label="CAD" />
          </RadioGroup>
        </FormControl>
        <FormControl
          fullWidth
          margin="normal"
          error={!!errors.amount}
          sx={{ mb: 2 }}>
          <InputLabel htmlFor="amount">Amount</InputLabel>
          <OutlinedInput
            id="amount"
            value={formData.amount}
            onChange={(e) => handleChange("amount", e.target.value)}
            onBlur={() => handleBlur("amount")}
            startAdornment={
              <InputAdornment position="start">{currency}</InputAdornment>
            }
            label="Amount"
            type="text"
            inputProps={{ min: "0" }}
          />
          {touched.amount && dirty.amount && (
            <FormHelperText>{errors.amount}</FormHelperText>
          )}
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          onBlur={() => handleBlur("name")}
          error={!!errors.name && touched.name && dirty.name}
          helperText={touched.name && dirty.name && errors.name}
          sx={{ mb: 2 }}
        />
        <FormGroup row sx={{ gap: 2 }}>
          <TextField
            fullWidth
            label="Mobile"
            value={formData.mobile}
            onChange={(e) => handleChange("mobile", e.target.value)}
            onBlur={() => handleBlur("mobile")}
            error={!!errors.mobile && touched.mobile && dirty.mobile}
            helperText={touched.mobile && dirty.mobile && errors.mobile}
            inputProps={{ maxLength: 10 }}
            sx={{ flex: 1 }}
          />
          <TextField
            fullWidth
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            error={!!errors.email && touched.email && dirty.email}
            helperText={touched.email && dirty.email && errors.email}
            sx={{ flex: 1 }}
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContributeModal;
