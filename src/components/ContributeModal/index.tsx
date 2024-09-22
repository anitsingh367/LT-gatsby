// Import npm packages
import React, { useEffect, useState } from "react";
// Import other packages
import {
  Button,
  FormControl,
  FormGroup,
  InputLabel,
  Radio,
  RadioGroup,
  OutlinedInput,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  FormHelperText,
  InputAdornment,
  Autocomplete,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  AppBar,
  DialogContentText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../../validations/index";

import paymentSuccessfull from "../../assets/payment-successful.gif";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { ContributeModalInterface } from "../../interfaces/ContributeModal";

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

//InputField styling

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({ showSpinner, disabled, createOrder, onApprove }) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const style = { layout: "vertical" };
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        fundingSource="paypal"
        style={{ layout: "vertical", label: "donate" }}
        disabled={disabled}
        forceReRender={[style]}
        createOrder={(data, action) => createOrder(data, action)}
        onApprove={(data, action) => onApprove(data, action)}
      />
    </>
  );
};

export default function ContributeModal({
  onClose,
  isOpen,
  projectHeading,
  isNavbar,
}: ContributeModalInterface): JSX.Element {
  //Handle Modal close
  const [open, setOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState({
    isOpen: false,
    paymentInformation: {},
  });
  const [currency, setCurrency] = useState({
    value: "USD",
    symbol: "$",
  });
  const handleClose = () => {
    if (paymentStatus) {
      // Reset all states when closing the payment success modal
      setPaymentStatus({
        isOpen: true,
        paymentInformation: {},
      });
    }

    // Close the main modal
    onClose(false);
    setOpen(false);
    resetData();
  };

  const initialFormState = {
    amount: "",
    currency: "",
    name: "",
    mob: "",
    email: "",
    paymentInformation: {
      // name: "",
      // email: "",
      // payer_id: "",
      // payment_time: "",
      // payment_status: "",
    },
    project: "",
    projectId: "",
  };

  const paypalInitialValues = {
    clientId: process.env.GATSBY_PAYPAL_CLIENT_ID,
    intent: "capture",
  };

  // form submission
  const contributeData = async (data) => {
    console.log("uploading data to db", data);

    const dataRef = collection(db, "contributeDetails");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData: formData,
      paymentInformation: data,
    });
  };

  //Handle Form Data
  const [formData, setFormData] = useState(initialFormState);
  const handleForm = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value.trim() });
  };

  //Handle Amount Selection

  const handleAmount = (event) => {
    setCurrency({
      value: event.target.value?.split("-")[1],
      symbol: event.target.value?.split("-")[0],
    });
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      currency: currency?.value,
    }));
  }, [currency]);

  //Handle Form Submit
  const handleSubmitForm = (details) => {
    // Ensure correct property name and structure
    const paymentInformation = {
      name:
        details?.payer?.name?.given_name + " " + details?.payer?.name?.surname,
      email: details?.payer?.email_address,
      payer_id: details?.payer?.payer_id,
      payment_time: details?.update_time,
      payment_status: details?.status,
    };

    // Directly update formData state using setFormData
    setFormData((prevFormData) => ({
      ...prevFormData,
      paymentInformation,
    }));

    // Call contributeNow directly
    contributeData(details);

    console.log(formData);
  };

  //Handle Email Validation
  const [isEmailValid, setEmailValid] = useState(true);
  const handleEmail = (e) => {
    let email = e.target.value.trim();

    if (!email || emailValidation().test(email) === false) {
      setEmailValid(false);
    } else {
      setEmailValid(true);
      setFormData({ ...formData, email: email });
    }
  };
  const [isNameValid, setNameValid] = useState(true);
  const handleName = (e) => {
    let name = e.target.value.trim();
    if (!name || nameValidation().test(name) === false) {
      setNameValid(false);
    } else {
      setNameValid(true);
      setFormData({ ...formData, name: name });
    }
  };

  //Reset Data function to reset form inputs
  const resetData = () => {
    setCurrency({
      value: "",
      symbol: "",
    });
    setFormData(initialFormState);
    setEmailValid(true);
    setNameValid(true);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: currency.value || "USD", // Use a supported currency
              value: formData.amount, // Ensure this is a valid number
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId; // Return the order ID
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        console.log("details:", details?.payer);
        handleSubmitForm(details);
        // contributeData(formData);
        handleClose();
      })
      .catch((error) => {
        console.error("Capture error:", error);
        alert("Error capturing payment: " + error);
      });
  };

  return (
    <Dialog open={open ? open : paymentStatus.isOpen}>
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
          <Typography
            sx={{ ml: 2, flex: 1, padding: "0.5rem 0" }}
            variant="h6"
            component="div"
          >
            {paymentStatus.isOpen
              ? "Thank you for contributing"
              : isNavbar
              ? "Contribute For The Cause"
              : `Contribute To ${projectHeading ? projectHeading : "Project"}`}
          </Typography>
        </Toolbar>
      </AppBar>
      {open ? (
        <>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
          >
            <DialogContentText>
              We Need your support FOR tv broadcast, webcast, books, magazines,
              Self Elevating Workshops / seminars, workshops & Seminars in
              schools & colleges ,Medical camp & dispensary, education support &
              to run many other projects for humanity & noble cause Your Monthly
              Contribution help us to serve the needy and less privileged
              brethren of our society. It enables us to provide them with the
              basic services without any discrimination of religion, caste and
              creed.
            </DialogContentText>
            <FormControl
              sx={{
                display: "flex",
              }}
            >
              <RadioGroup
                row
                aria-labelledby="radio-buttons-group-label"
                defaultValue={""}
                name="radio-buttons-group"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flex: 1,
                }}
                onChange={handleAmount}
              >
                <FormControlLabel
                  value="$-USD"
                  control={<Radio />}
                  label="USD"
                />
                <FormControlLabel
                  value="€-EUR"
                  control={<Radio />}
                  label="EURO"
                />
                <FormControlLabel
                  value="CA$-CAD"
                  control={<Radio />}
                  label="CAD"
                />
              </RadioGroup>
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="amount-input-box" required>
                Amount
              </InputLabel>
              <OutlinedInput
                required
                id="amount-input-box"
                onChange={handleForm("amount")}
                startAdornment={
                  <InputAdornment position="start">
                    {currency.symbol ? currency.symbol : ""}
                  </InputAdornment>
                }
                label="Amount"
                type="number"
                inputProps={{ min: "0" }}
                onKeyPress={(e) => {
                  if (numberValidation().test(e.key) === false) {
                    e.preventDefault();
                  }
                }}
                disabled={!currency.symbol ? true : false}
                placeholder={
                  !formData.currency ? "Please select above options" : ""
                }
              />
              {parseInt(formData.amount) === 0 && (
                <FormHelperText error id="accountId-error">
                  Please enter some amount
                </FormHelperText>
              )}
            </FormControl>
            {/* {parseInt(formData.amount) > 5000 && (
          <FormControl>
            <InputLabel htmlFor="pan-card-details">
              Enter Pan Card No (Required if donation is above ₹ 5000)
            </InputLabel>
            <OutlinedInput
              id="pan-card-details"
              value={formData.panNumber?.toUpperCase()}
              onChange={handleForm("panNumber")}
              label="Enter Pan Card No (Required if donation is above ₹ 5000)"
              type="text"
              hidden={true}
              disabled={amount === "other" ? false : true}
              placeholder={amount === "" ? "Please select above options" : ""}
            />
          </FormControl>
        )} */}
            <FormControl>
              <InputLabel htmlFor="name-input-box" required>
                Name
              </InputLabel>
              <OutlinedInput
                required
                id="name-input-box"
                label="Name"
                onChange={handleName}
              />
              {!isNameValid && (
                <FormHelperText error id="name-error">
                  Please enter valid name
                </FormHelperText>
              )}
            </FormControl>
            {/* <FormControl>
          <InputLabel htmlFor="address-input-box" required>
            Address
          </InputLabel>
          <OutlinedInput
            required
            id="address-input-box"
            label="Address"
            onChange={handleForm("address")}
          />
        </FormControl> */}
            {/* <FormControl>
          <InputLabel id="state-select-label" required>
            State
          </InputLabel>
          <Select
            required
            labelId="state-select-label"
            id="state-select"
            value={formData.state}
            label="State"
            onChange={handleForm("state")}
          >
            {stateList?.map((list, index) => {
              return (
                <MenuItem key={index} value={list.name}>
                  {list.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl> */}
            {/* <FormGroup
          sx={{
            display: "flex",
            flexDirection: { lg: "row", md: "row", xs: "column" },
            gap: 1.5,
          }}
        >
          <FormControl sx={{ flex: 1 }}>
            <Autocomplete
              freeSolo
              onChange={(event, newValue) => {
                setFormData({ ...formData, city: newValue });
              }}
              onInputChange={(event, newInputValue) => {
                setFormData({ ...formData, city: newInputValue });
              }}
              disabled={formData.state === "" ? true : false}
              id="contribute-modal-city"
              options={newCityList.map((option) => option.label)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={
                    formData.state === ""
                      ? "Please select the State first"
                      : "City"
                  }
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl
            sx={{
              flex: 1,
            }}
          >
            <InputLabel htmlFor="zip-input-box" required>
              Zip
            </InputLabel>
            <OutlinedInput
              required
              id="zip-input-box"
              label="Zip"
              type="text"
              onChange={handleForm("zip")}
            />
          </FormControl>
        </FormGroup> */}
            <FormGroup
              sx={{
                display: "flex",
                flexDirection: { lg: "row", md: "row", xs: "column" },
                gap: 1.5,
              }}
            >
              <FormControl sx={{ flex: 1 }}>
                <InputLabel htmlFor="mobile-input-box" required>
                  Mobile
                </InputLabel>
                <OutlinedInput
                  required
                  id="mobile-input-box"
                  label="Mobile"
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
                  type="email"
                  onChange={handleEmail}
                />
                {!isEmailValid && (
                  <FormHelperText error id="email-error">
                    Please enter valid email address
                  </FormHelperText>
                )}
              </FormControl>
            </FormGroup>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            {/* <Button
          onClick={handleSubmitForm}
          disabled={
            formData.amount === "" ||
            formData.amount === "other" ||
            formData.name === "" ||
            formData.mob === "" ||
            formData.email === "" ||
            parseInt(formData.amount) === 0 ||
            (parseInt(formData.amount) > 5000 && formData.panNumber === "") ||
            !isEmailValid
              ? true
              : false
          }
        >
          Submit
        </Button> */}

            <PayPalScriptProvider
              key={currency?.value}
              options={{
                clientId: paypalInitialValues.clientId,
                components: "buttons",
                intent: paypalInitialValues.intent,
                currency: currency?.value || "USD",
              }}
            >
              <ButtonWrapper
                showSpinner={false}
                disabled={
                  formData.amount === "" ||
                  formData.amount === "other" ||
                  formData.name === "" ||
                  formData.mob === "" ||
                  formData.email === "" ||
                  parseInt(formData.amount) === 0 ||
                  !isEmailValid
                    ? true
                    : false
                }
                createOrder={createOrder}
                onApprove={onApprove}
              />
            </PayPalScriptProvider>
          </DialogActions>
        </>
      ) : (
        <>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              width: 1,
              height: 1,
            }}
          >
            <img
              src={paymentSuccessfull}
              alt="Payment Successfull"
              width={400}
              height={350}
            />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
