import {
  AlternateEmail,
  Class,
  Key,
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
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Auth.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup, updateUser } from "../actions/auth";
import { ImageFill } from "react-bootstrap-icons";
import Resizer from "react-image-file-resizer";


const initialState = {
  name: "",
  email: "",
  program: "",
  level: "",
  indexNo: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(true);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const [hasSpace, setHasSpace] = useState(false);
  const userMe = JSON.parse(localStorage.getItem("profile"));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const indexCond = formData?.indexNo?.startsWith("UEB");

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (userMe)
      setFormData({
        ...userMe?.result,
        confirmPassword: userMe?.result?.password,
      });
    setImage(userMe?.result?.image);
    if (userMe?.result?._id) setUser(false);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  let inputFileRef = useRef(null);
  const selectImg = (e) => {
    e.preventDefault();
    inputFileRef.click();
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    Resizer.imageFileResizer(
      file,
      700,
      770,
      "JPEG",
      92,
      0,
      (uri) => {
        setImage(uri);
      },
      "base64"
    );

    if (file["type"].split("/")[0] !== "image") {
      alert("This file is not an image");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      dispatch(signup({ ...formData, image }, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }

    setFormData({ ...formData, initialState: "" });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(
        userMe?.result?._id,
        { ...formData, image: image },
        navigate,
        "goToDashboard"
      )
    );

    setFormData({ ...formData, initialState: "" });
  };

  useEffect(() => {
    if (formData.password || formData.confirmPassword) {
      if (
        hasWhiteSpace(formData?.password) ||
        hasWhiteSpace(formData?.confirmPassword) 
      ) {
        setHasSpace(true);
      }
    }
  }, []);

  function hasWhiteSpace(s) {
    return s.indexOf(" ") >= 0;
  }

  const passError =
    formData?.password?.length < 6 && !!formData?.password?.length;

  const doesMatch =
    formData?.password !== formData?.confirmPassword &&
    formData?.confirmPassword;
  const disableBtn =
    !formData?.email?.length > 0 ||
    !formData?.email?.trim() ||
    !formData?.password?.length > 0 ||
    !formData?.password?.trim() ||
   ( !indexCond && formData.indexNo) ||
    (!user &&
      (!formData?.level ||
        !formData?.name?.length > 0 ||
        !formData?.confirmPassword)) ||
    hasSpace ||
    doesMatch;

  return (
    <div className={styles.auth}>
      <div className={styles.form__container}>
        {!userMe?.result?._id && <h2>{!user ? "Sign up" : "Sign in"}</h2>}
        {userMe?.result?._id && <h2>Edit your profile</h2>}
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
              name="email"
              variant="standard"
              value={formData.email}
              className={styles.auth_input}
            />
          </Box>

          {!user && (
            <>
              <Box
                id={styles.auth_inputBox}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Person sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  onChange={handleChange}
                  // id={styles.auth_input}
                  id="demo-name"
                  required
                  label="Full name"
                  variant="standard"
                  className={styles.auth_input}
                  name="name"
                  value={formData.name}
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
                  name="program"
                  value={formData.program}
                />
              </Box>
              <Box
                id={styles.auth_inputBox}
                sx={{ display: "flex", alignItems: "flex-end" }}
              >
                <Key sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                <TextField
                  onChange={handleChange}
                  id={styles.auth_input}
                  required
                  label="Index Number"
                  variant="standard"
                  className={styles.auth_input}
                  name="indexNo"
                  value={formData.indexNo}
                  error={ formData.indexNo && !indexCond}
                 
                  helperText={
                    !indexCond && formData.indexNo ? "Index number must start with UEB" : null
                  }
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
                      name="level"
                      label="Level"
                      value={formData.level}
                      onChange={handleChange}
                    >
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={200}>200</MenuItem>
                      <MenuItem value={300}>300</MenuItem>
                      <MenuItem value={400}>400</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <IconButton onClick={selectImg} style={{ marginLeft: "30px" }}>
                  <ImageFill />
                </IconButton>
              </Box>
              <input
                multiple
                onChange={handleImage}
                ref={(input) => (inputFileRef = input)}
                style={{ display: "none" }}
                type="file"
              />
            </>
          )}
          <Box
            id={styles.auth_inputBox}
            sx={{
              display: "flex",
              alignItems: "flex-end",
              position: "relative",
            }}
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
              name="password"
              error={passError}
              value={formData.password}
              helperText={
                passError ? "Password must be at least 6 characters long" : null
              }
            />
            <IconButton
              className={`${styles.showPassword} ${passError && styles.errEye}`}
              onClick={toggleShowPassword}
            >
              {!showPassword ? (
                <VisibilityOff className="showPassword" />
              ) : (
                <Visibility className="showPassword" />
              )}
            </IconButton>
          </Box>
          {!user && (
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
                name="confirmPassword"
                variant="standard"
                value={formData.confirmPassword}
                error={!!doesMatch}
                helperText={doesMatch ? "Password does not match." : null}
              />
            </Box>
          )}
        </form>
        {!user && !userMe?.result?._id && (
          <p className={styles.terms}>
            By signing up your`re agree to our <span>Terms & Conditions</span>{" "}
            and <span>Privacy Policy</span>
          </p>
        )}
        {!userMe?.result?._id && (
          <Button
            className={`${styles.signIn__button} ${
              disableBtn && styles.signIn__buttonDisable
            }`}
            onClick={handleSubmit}
            disabled={disableBtn}
          >
            {user ? "Sign In" : "Sign Up"}
          </Button>
        )}

        {userMe?.result?._id && (
          <Button
            className={`${styles.signIn__button} ${
              disableBtn && styles.signIn__buttonDisable
            }`}
            onClick={handleUpdate}
            disabled={disableBtn}
          >
            Save Changes
          </Button>
        )}

        {!userMe?.result?._id && (
          <p className={styles.login__newUser}>
            {!user ? "Joined us before?" : "New to Upay?"}
            <span onClick={() => setUser((prevState) => !prevState)}>
              {!user ? "Sign In" : "Sign Up"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
