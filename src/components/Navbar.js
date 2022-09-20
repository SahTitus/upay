import { Add, Menu } from "@mui/icons-material";
import { Avatar, Button, IconButton } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";
import { logout } from "../redux/auth";

import { Box, Divider, List, ListItem, Drawer } from "@mui/material";

import { Apps, Home, People, Paid, Logout } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useStateContex } from "../store/StateProvider";

const listItems = [
  {
    listIcon: <Home />,
    listText: "Admin",
    add: false,
    link: "/admin",
  },
  {
    listIcon: <Apps />,
    listText: "Dashboard",
    add: false,
    link: "/",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsAdmin } = useStateContex();

  const toggleSlider = () => {
    setOpen(!open);
  };

  const handleAddStu = () => {
    setIsAdmin(false);
    // window.location.reload(true);
    navigate("/addstudent");
  };

  const logOut = () => {
    dispatch(logout());
    window.location.reload(true);
    // closeDrawer()
  };

  const sideList = () => (
    <Box
      className={styles.sidebar}
      component="div"
      sx={{ width: "250px", marginTop: "10px" }}
    >
      <div className={styles.side__user}>
        {user ? (
          <>
            <Avatar
              className={styles.side__avatar}
              src={user?.result?.image}
              alt="Juaneme8"
            >
              {user?.result?.name.charAt(0)}{" "}
            </Avatar>
            <div className={styles.side__userInfo}>
              <p>{user?.result?.name}</p>
              <span>{user?.result?.indexNo || user?.result?.email}</span>
            </div>
          </>
        ) : (
          <div className={`${styles.navbar__topColor}`}></div>
        )}
      </div>
      <Divider />
      <List>
        {listItems.map((listItem, index) => (
          <Link className={styles.link} key={index} to={listItem?.link}>
            <ListItem
              button
              key={index}
              className={`${styles.drawer__listItem} ${
                listItem.add && styles.add__button
              }`}
            >
              <div className={styles.drawer__listIcon}>{listItem.listIcon}</div>
              <div className={styles.drawer__listText}>{listItem.listText}</div>
            </ListItem>
          </Link>
        ))}

        {!admin && (
          <Link className={styles.link} to="/pay">
            <ListItem button className={`${styles.drawer__listItem} `}>
              <div className={styles.drawer__listIcon}>
                <Paid />
              </div>
              <div className={styles.drawer__listText}>Make payment</div>
            </ListItem>
          </Link>
        )}

        {admin && (
          <Link className={styles.link} to="/students">
            <ListItem button className={`${styles.drawer__listItem} `}>
              <div className={styles.drawer__listIcon}>
                <People />
              </div>
              <div className={styles.drawer__listText}>Students</div>
            </ListItem>
          </Link>
        )}
        {!user ? (
          <Link className={styles.signIn__wrapper} to="/auth">
            <Button className={styles.signIn}>Sign In</Button>
          </Link>
        ) : (
          <ListItem
            onClick={logOut}
            button
            className={`${styles.drawer__listItem} `}
          >
            <div className={styles.drawer__listIcon}>
              <Logout />
            </div>
            <div className={styles.drawer__listText}>Log out</div>
          </ListItem>
        )}
        <Link
          onClick={handleAddStu}
          to="/addstudent"
          className={styles.navLink}
        >
          {admin?.result?.admin && user && (
            <ListItem
              button
              className={`${styles.drawer__listItem} ${styles.add__button} `}
            >
              <div className={styles.drawer__listIcon}>
                <Add />
              </div>
              <div className={styles.drawer__listText}>Add Student</div>
            </ListItem>
          )}
        </Link>
      </List>
    </Box>
  );

  return (
    <div className={styles.navbar}>
      {/* <Sidebar toggleSlider={toggleSlider} open={open} setOpen={setOpen} /> */}
      <IconButton onClick={toggleSlider} className={styles.menu}>
        <Menu />
      </IconButton>
      <Link to="/profile">
        <IconButton className={styles.avatar_container}>
          <Avatar
            className={styles.side__avatar}
            src={user?.result?.image}
            alt="Juaneme8"
          >
            {user?.result?.name.charAt(0)}{" "}
          </Avatar>
        </IconButton>
      </Link>
      <Drawer
        className={styles.drawer}
        onClick={toggleSlider}
        open={open}
        anchor="left"
        onClose={toggleSlider}
      >
        {sideList()}
      </Drawer>
    </div>
  );
};

export default Navbar;
