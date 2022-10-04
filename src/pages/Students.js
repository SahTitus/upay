import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Student from "../components/Student";
import { getUsers } from "../actions/auth";
import styles from "../styles/Students.module.css";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, isLoading } = useSelector((state) => state.auth);
  const sortUsers = users
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={styles.students}>
      <div className="arrowBack__navbar">
        <IconButton onClick={() => navigate(-1)} className={styles.menu}>
          <ArrowBack />
        </IconButton>
      </div>

      <div className={styles.titles}>
        <p>Students</p>
        <p>Actions</p>
      </div>

      <div className={styles.list}>
        {isLoading ? (
          <div className={styles.loading}>
            {isLoading && (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
            {users.length > 0 && !isLoading && <h3>No data found</h3>}
          </div>
        ) : (
          sortUsers.map((user) => (
            <Student
              key={user._id}
              id={user._id}
              timestamp={user.createdAt}
              name={user.name}
              level={user.level}
              program={user.program}
              email={user.email}
              indexNo={user?.indexNo}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Students;
