import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { CircleFill } from "react-bootstrap-icons";
import { usePaystackPayment } from "react-paystack";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makePayment } from "../actions/auth";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/Pay.module.css";
import usePaystack from "../utils/Paystack";

const Pay = () => {
  const [openType, setOpenType] = React.useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    type: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAmountToPay, setPayData } = useStateContex();
  const { payConfig } = usePaystack();
  const initPayment = usePaystackPayment(payConfig);
  const user = JSON.parse(localStorage.getItem("profile"));

  const id = user?.result?._id;

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with response and after success call.
    const transData = {
      amount: formData.amount,
      paymentType: formData.type,
      email: user.email,
      status: reference.status,
      timestamp: moment().format("D MMMM YYYY, h:mm a"),
    };

    setPayData(transData);
    dispatch(makePayment(id, transData, navigate));
  };

  useEffect(() => {
    setAmountToPay(formData.amount);
  }, [formData.amount]);

  const handleClose = () => {
    setOpenType(false);
  };

  const handleOpen = (a, b) => {
    if (a) {
      setOpenType(true);

    } else {
      setOpenType(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePay = (e) => {
    e.preventDefault();
    initPayment(onSuccess);
    setFormData({ ...formData, initialState: "" });
  };
  const isNumber = isNaN(+formData.amount) || hasWhiteSpace(formData.amount);
  const disable =
    !formData.amount.length ||
    isNumber ||
    formData.type === "";

  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  return (
    <div className={styles.pay}>
      <div className="arrowBack__navbar payNavbar">
        <IconButton onClick={() => navigate(-1)} className={styles.menu}>
          <ArrowBack className={styles.pay__arrowBack} />
        </IconButton>
      </div>
      <div className={styles.form__container}>
        <div className={styles.pay__top}>
          <h3>Payment</h3>
          <div className={styles.pay__topBullets}>
            <CircleFill className={styles.circleFill} />
            <CircleFill className={styles.circleGray} />
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.type__container}>
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex" }}
              className={styles.pay__typeInput}
            >
              <div className={styles.pay__inputWrapper}>
                <FormControl
                  required
                  className={styles.pay__inputBox}
                  sx={{ m: 1 }}
                >
                  <InputLabel
                    sx={{ m: 1 }}
                    id="demo-controlled-open-select-label"
                  >
                    Type
                  </InputLabel>
                  <Select
                    sx={{ m: 1 }}
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openType}
                    onClose={handleClose}
                    onOpen={() => handleOpen("a")}
                    value={formData.type}
                    name="type"
                    label="Type"
                    onChange={handleChange}
                  >
                    <MenuItem value="School Fees">School Fees</MenuItem>
                    <MenuItem value="Departmental Fees">
                      Departmental Fees
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Box>
          </div>
          <div className={styles.pay__inputFlex}>
            <Box
              id={styles.pay_typeInput}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <TextField
                error={isNumber}
                helperText={isNumber ? "Enter a valid data." : null}
                onChange={handleChange}
                id={styles.pay_input}
                required
                label="Amount (GHS)"
                variant="outlined"
                value={formData.amount}
                className={styles.pay__input}
                name="amount"
              />
            </Box>
        
          </div>

          <Button
            disabled={disable}
            className={`${styles.pay__button} ${
              disable && styles.disable__btn
            }`}
            onClick={handlePay}
          >
            Pay Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Pay;
