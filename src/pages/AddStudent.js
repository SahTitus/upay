import {
  AlternateEmail,
  Class,
  Lock,
  Person,
  School,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
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
import styles from "../styles/Auth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup, updateUser } from "../actions/auth";
import { useStateContex } from "../store/StateProvider";
import Navbar from "../components/Navbar";

const initialState = {
  name: "",
  email: "",
  program: "",
  level: "",
  image:"",
  goId: "",
  password: "",
  confirmPassword: "",
};

const AddStudent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  console.log(formData);

  const { currentId, isAdmin } = useStateContex();
  console.log(currentId)
  const user = useSelector((state) =>
    currentId ? state.auth.users.find((user) => user._id === currentId) : null
  );

  const id = user?.result?._id;

  useEffect(() => {
    if (user) setFormData({ ...user, confirmPassword: user.password });
  }, [user]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updateUser(currentId, formData, navigate));
    } else {
      dispatch(signup(formData, navigate));
    }

    setFormData({ ...formData, initialState: "" });
    console.log(formData);
  };

  const [hasSpace, setHasSpace] = useState(true);

  useEffect(() => {
    if (!user) navigate("/auth")
  }, [user])

  useEffect(() => {
    if (isAdmin && currentId) {
      setHasSpace(false);
    } else {
      const whiteSpace =
        hasWhiteSpace(formData?.password) ||
        hasWhiteSpace(formData?.confirmPassword);
      setHasSpace(whiteSpace);
    }
  }, [currentId && isAdmin]);

  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }
  const doesMatch =
    formData?.password !== formData?.confirmPassword &&
    formData.confirmPassword;
  const disableBtn =
    !formData?.name?.length > 0 ||
    !formData?.email?.length > 0 ||
    !formData?.email?.trim() ||
    !formData?.password?.length > 0 ||
    !formData?.password?.trim() ||
    !formData?.level ||
    hasSpace;

  return (
    <div className={styles.addStudent}>
      <Navbar />
      <div className={styles.addStudent__header}>
        {" "}
        <h3>{currentId ? "Edit Student" : "Add a Student"}</h3>
      </div>
      <form className={styles.form}>
        <Box
          id={styles.auth_inputBox}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <AlternateEmail sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            onChange={handleChange}
            id={styles.auth_input}
            required
            label="Email"
            value={formData.email}
            name="email"
            variant="standard"
            className={styles.auth_input}
          />
        </Box>

        <Box
          id={styles.auth_inputBox}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <Person sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            onChange={handleChange}
            id={styles.auth_input}
            required
            label="Full name"
            variant="standard"
            className={styles.auth_input}
            value={formData.name}
            name="name"
          />
        </Box>
        <Box
          id={styles.auth_inputBox}
          sx={{ display: "flex", alignItems: "flex-end" }}
        >
          <School sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            onChange={handleChange}
            id={styles.auth_input}
            required
            label="Program"
            variant="standard"
            className={styles.auth_input}
            value={formData.program}
            name="program"
          />
        </Box>
        <Box
          id={styles.auth_inputBox}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Class sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <div>
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel id="demo-controlled-open-select-label">
                Level
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
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

        {currentId && isAdmin ? null : (
          <>
            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={handleChange}
                id={styles.auth_input}
                className={styles.auth_input}
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                variant="standard"
                value={formData.password}
                name="password"
                error={doesMatch}
                helperText={doesMatch ? "Password does not match." : null}
              />
              <IconButton
                className={styles.showPassword}
                onClick={toggleShowPassword}
              >
                {!showPassword ? (
                  <VisibilityOff className="showPassword" />
                ) : (
                  <Visibility className="showPassword" />
                )}
              </IconButton>
            </Box>

            <Box
              id={styles.auth_inputBox}
              sx={{ display: "flex", alignItems: "flex-end" }}
            >
              <Lock sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                onChange={handleChange}
                className={styles.auth_input}
                id={styles.auth_input}
                required
                type={showPassword ? "text" : "password"}
                label="Confirm password"
                value={formData.confirmPassword}
                name="confirmPassword"
                variant="standard"
              />
            </Box>
          </>
        )}
      </form>
      <Button
        disabled={disableBtn || formData.confirmPassword !== formData.password}
        className={`${styles.signIn__button} ${
          (disableBtn || formData.confirmPassword !== formData.password) &&
          styles.disableBtn
        }`}
        onClick={handleSubmit}
      >
        {currentId ? "Save Changes" : "Add Student"}
      </Button>
    </div>
  );
};

export default AddStudent;
