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
import React, { useEffect, useState } from "react";
import { CircleFill } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addFees, getAdmin } from "../actions/auth";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/Pay.module.css";
import * as programs from "../constants/programs/programs.js";

const Pay = () => {
  const [openLevel, setOpenLevel] = React.useState(false);
  const [openPro, setOpenPro] = React.useState(false);

  const [formData, setFormData] = useState({
    amount: "",
    level: "",
    program: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAmountToPay, isAdmin } = useStateContex();
  const admin = JSON.parse(localStorage.getItem("admin"));

  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    setAmountToPay(formData.amount);
  }, [formData.amount]);

  const handleClose = () => {
    setOpenLevel(false);
    setOpenPro(false);
  };

  const handleOpen = (a, b) => {
    if (a) {
      setOpenLevel(false);
    } else {
      setOpenLevel(true);
    }
  };
  const handleOpenPro = () => {
    setOpenPro(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdmin = (e) => {
    e.preventDefault();
    dispatch(getAdmin(formData?.password, navigate));
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(addFees(admin?._id || admin.result._id, formData, navigate));
  };

  const isNumber = isNaN(+formData?.amount) || hasWhiteSpace(formData?.amount);
  const disable =
    !formData?.amount.length ||
    isNumber ||
    formData?.level === "" ||
    formData?.type === "";

  function hasWhiteSpace(s) {
    return s?.indexOf(" ") >= 0;
  }

  useEffect(() => {
    if (!user) navigate("/auth");
  }, [user]);

  return (
    <div className={styles.pay}>
      <div>
        <IconButton
          onClick={() => navigate(isAdmin ? -1 : "/")}
          className={`${styles.closeFeesForm} ${styles.menu}`}
        >
          <ArrowBack className={styles.pay__arrowBack} />
        </IconButton>
      </div>
      <div className={styles.form__container}>
        <div className={styles.pay__top}>
          {isAdmin ? <h3>Fees details</h3> : <h3>Admin</h3>}
          <div className={styles.pay__topBullets}>
            <CircleFill className={styles.circleFill} />
            <CircleFill className={styles.circleGray} />
          </div>
        </div>

        <form className={styles.form}>
          <div className={styles.type__container}>
            {!isAdmin ? (
              <Box
                id={styles.auth_inputBox}
                sx={{ display: "flex" }}
                className={styles.pay__typeInput}
              >
                <TextField
                  error={isNumber}
                  helperText={isNumber ? "Enter a valid data." : null}
                  onChange={handleChange}
                  fullWidth
                  id={styles.pay_input}
                  required
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={formData.password}
                  className={styles.pay__input}
                  name="password"
                />
              </Box>
            ) : (
              <Box
                id={styles.auth_inputBox}
                sx={{ display: "flex", alignItems: "center" }}
                fullWidth="true"
              >
                <FormControl fullWidth="true" sx={{ m: 1, minWidth: 200 }}>
                  <InputLabel id="demo-controlled-open-select-label">
                    Program
                  </InputLabel>
                  <Select
                    fullWidth="true"
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    open={openPro}
                    onClose={handleClose}
                    onOpen={handleOpenPro}
                    name="program"
                    label="Program"
                    value={formData.program}
                    onChange={handleChange}
                  >
                    {programs.courses.map((course) => (
                      <MenuItem value={course}>{course}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </div>
          <div className={styles.pay__inputFlex}>
            {isAdmin && (
              <>
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
                <Box
                  id={styles.auth_inputBox}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <div>
                    <FormControl
                      required
                      className={styles.pay__levelInput}
                      sx={{ m: 1 }}
                    >
                      <InputLabel id="demo-controlled-open-select-label">
                        Level
                      </InputLabel>
                      <Select
                        sx={{}}
                        labelId="demo-controlled-open-select-label"
                        id="demo-controlled-open-select"
                        open={openLevel}
                        onClose={handleClose}
                        onOpen={() => handleOpen("", "b")}
                        value={formData.level}
                        name="level"
                        label="Level"
                        onChange={handleChange}
                      >
                        <MenuItem value={100}>100</MenuItem>
                        <MenuItem value={200}>200</MenuItem>
                        <MenuItem value={300}>300</MenuItem>
                        <MenuItem value={400}>400</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </Box>
              </>
            )}
          </div>

          {isAdmin ? (
            <Button
              disabled={disable}
              className={`${styles.pay__button} ${
                disable && styles.disable__btn
              }`}
              onClick={handleSave}
            >
              Save
            </Button>
          ) : (
            <Button
              disabled={
                !formData?.password?.length > 0 || !formData?.password?.trim()
              }
              className={`${styles.pay__button} `}
              onClick={handleAdmin}
            >
              Login
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Pay;
