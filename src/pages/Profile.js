import { ArrowBack, Edit, Logout } from "@mui/icons-material";
import React, { useEffect, } from "react";
import styles from "../styles/Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Circle } from "@mui/icons-material";
import { logout } from "../redux/auth";
import { Avatar, Button } from "@mui/material";
import { useDispatch } from "react-redux";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    if (!user) navigate("/auth");
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profile__header}>
        <ArrowBack onClick={() => navigate("/")} />
      </div>
      <div className={styles.profile__card}>
        <Avatar
          className={styles.profile__avatar}
          src={user?.result?.image}
          alt={user?.result?.name}
        >
          {user?.result?.name.charAt(0)}{" "}
        </Avatar>

        <div className={styles.profile__cardInfo}>
          <h4>{user?.result?.name} </h4>
          <p className={styles.profile__cardInfoFollow}>
            <span className={styles.followers}>{user?.result?.email}</span>
            <Circle className={styles.bullet} />
            <span className={styles.following}>{user?.result?.program}</span>
          </p>
        </div>

        <div className={styles.profile__cardButtons}>
          <Button
            onClick={() => navigate("/auth")}
            className={styles.profile__cardButton}
          >
            <Edit className={styles.editIcon} />
            Edit
          </Button>
          <Button onClick={logOut} className={styles.profile__cardButton}>
            <Logout className={styles.logoutIcon} />
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
