import { Add, Menu } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useState } from "react";
import styles from "../styles/Navbar.module.css";

import { Box, Divider, List, ListItem, Drawer } from "@mui/material";

import { Apps, Home, People, Receipt, Paid, Logout } from "@mui/icons-material";
import { Link } from "react-router-dom";

const listItems = [
  {
    listIcon: <Home />,
    listText: "Admin",
    add: false,
    link: "/students",
  },
  {
    listIcon: <Apps />,
    listText: "Dashboard",
    add: false,
    link: "/students",
  },
  {
    listIcon: <People />,
    listText: "Students",
    add: false,
    link: "/students",
  },
  {
    listIcon: <Receipt />,
    listText: "Receipts",
    add: false,
    link: "/students",
  },
  {
    listIcon: <Paid />,
    listText: "Make payment",
    add: false,
    link: "/students",
  },
  {
    listIcon: <Logout />,
    listText: "Log out",
    add: false,
    link: "/students",
  },
  {
    listIcon: <Add />,
    listText: "Add Student",
    add: true,
    link: "/students",
  },
];

const Sidebar = () => {
  return (
    <div className={styles.navbar}>
      <Box component="div" sx={{ width: "250px", marginTop: "10px" }}>
        <div className={styles.side__user}>
          <Avatar
            className={styles.side__avatar}
            src="https://i.ibb.co/rx5DFbs/avatar.png"
            alt="Juaneme8"
          />
          <div className={styles.side__userInfo}>
            <p>Sah Jay</p>
            <span>sah@gmail.com</span>
          </div>
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
                <div className={styles.drawer__listIcon}>
                  {listItem.listIcon}
                </div>
                <div className={styles.drawer__listText}>
                  {listItem.listText}
                </div>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;
