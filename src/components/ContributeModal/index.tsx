import React, { useEffect, useState } from "react";
// Import other packages
import {
  Button,
  FormControl,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  InputAdornment,
  FormGroup,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  emailValidation,
  numberValidation,
  nameValidation,
} from "../../validations/index";
import paymentSuccessfull from "../../assets/payment-successful.gif";
import paymentFailed from "../../assets/payment-failed.webp";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import {
  ContributeModalInterface,
  initialFormState,
} from "../../interfaces/ContributeModal";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

// Enum for payment status
const PaymentStatus = {
  CONFIRMED: "CONFIRMED",
  FAILED: "FAILED",
  INITIAL: "INITIAL",
};

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
  const [open, setOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(PaymentStatus.INITIAL);
  const [currency, setCurrency] = useState({ value: "USD", symbol: "$" });
  const [formData, setFormData] = useState(initialFormState);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isNameValid, setNameValid] = useState(true);

  const paypalInitialValues = {
    clientId: process.env.GATSBY_PAYPAL_CLIENT_ID,
    intent: "capture",
  };

  const handleClose = () => {
    onClose(false);
    setOpen(false);
    resetData();
  };

  const resetData = () => {
    setCurrency({ value: "", symbol: "" });
    setFormData(initialFormState);
    setEmailValid(true);
    setNameValid(true);
    setPaymentStatus(PaymentStatus.INITIAL);
  };

  const contributeData = async (data) => {
    const dataRef = collection(db, "contributeDetails");
    await addDoc(dataRef, {
      created: serverTimestamp(),
      formData,
      paymentInformation: data,
    });
  };

  const handleForm = (prop) => (event) => {
    setFormData({ ...formData, [prop]: event.target.value.trim() });
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleEmail = (e) => {
    const email = e.target.value.trim();
    setEmailValid(emailValidation().test(email));
    setFormData({ ...formData, email });
  };

  const handleName = (e) => {
    const name = e.target.value.trim();
    setNameValid(nameValidation().test(name));
    setFormData({ ...formData, name });
  };

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

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: currency.value || "USD",
              value: parseInt(formData?.amount),
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then((details) => {
        setPaymentStatus(PaymentStatus.CONFIRMED);
        contributeData(details);
      })
      .catch(() => {
        setPaymentStatus(PaymentStatus.FAILED);
      });
  };

  return (
    <Dialog open={open}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {paymentStatus === PaymentStatus.CONFIRMED
              ? "Thank you for contributing"
              : paymentStatus === PaymentStatus.FAILED
              ? "Payment failed. Please try again."
              : isNavbar
              ? "Contribute For The Cause"
              : `Contribute To ${projectHeading || "Project"}`}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        {paymentStatus === PaymentStatus.INITIAL && (
          <>
            <DialogContent
              sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
            >
              <DialogContentText>
                We Need your support FOR tv broadcast, webcast, books,
                magazines, Self Elevating Workshops / seminars, workshops &
                Seminars in schools & colleges ,Medical camp & dispensary,
                education support & to run many other projects for humanity &
                noble cause Your Monthly Contribution help us to serve the needy
                and less privileged brethren of our society. It enables us to
                provide them with the basic services without any discrimination
                of religion, caste and creed.
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
                    !formData?.currency ? "Please select above options" : ""
                  }
                />
                {parseInt(formData?.amount) === 0 && (
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
        )}
        {paymentStatus === PaymentStatus.CONFIRMED && (
          <img
            src={paymentSuccessfull}
            alt="Payment Successful"
            width={400}
            height={350}
          />
        )}
        {paymentStatus === PaymentStatus.FAILED && (
          <img
            src={paymentFailed}
            alt="Payment Failed"
            width={400}
            height={350}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
