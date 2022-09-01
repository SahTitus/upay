import {
  AlternateEmail,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Auth.module.css";
import Go from "../images/Go.png";
import { signInWithPopup, GoogleAuthProvider } from "@firebase/auth";
import { auth } from "../firebase";
import {
	authData
} from "../../redux/auth";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(false);
  const [formData, setFormData] = useState(initialState);
  console.log(formData);

  // const { darkMode } = useStateContex();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const user = await signInWithPopup(auth, provider)
    const token = user._tokenResponse.idToken
    const result = user.user
    try {
    dispatch(authData({ result, token}))
      console.log(user)
      navigate(-1);
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div className={styles.auth}>
      <div className={styles.form__container}>
        <h2>{!user ? "Sign up" : "Sign in"}</h2>
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
               className={styles.auth_input}
            />
          </Box>
         {!user && (
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
             name="name"
           />
         </Box>
         )}
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
              name="password"
            />
            <IconButton className={styles.showPassword}  onClick={toggleShowPassword}>
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
            />
          </Box>
        )}
        </form>
      {!user && (
          <p className={styles.terms}>
          By signing up your`re agree to our <span>Terms & Conditions</span> and{" "}
          <span>Privacy Policy</span>
        </p>
      )}
        <Button
          className={styles.signIn__button}
          //   onClick={handleSubmit}
          // onClick={signInWithEmailAndPassword}
        >
          {user ? "Sign In" : "Sign Up"}
        </Button>
        <div className={styles.divider}>
          <hr />
          <p>or</p>
          <hr />
        </div>
        <Button
          className={styles.signInWithGoogle__button}
          // onClick={signInWithGoogle}
        >
          <img className={styles.googleLogo} src={Go} alt="" />
          Continue with Google
        </Button>

        <p className={styles.login__newUser}>
          {!user ? "Joined us before?" : "New to Upay?"}
          <span onClick={() => setUser((prevState) => !prevState)}>
            {!user ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
