import { Clear, Edit } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "../actions/auth";
import { useStateContex } from "../store/StateProvider";
import styles from "../styles/Student.module.css";

const Student = ({email, indexNo, id, name, program, level, timestamp}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setCurrentId, setIsAdmin } = useStateContex();

  const handleEdit = () => {
    setCurrentId(id)
    setIsAdmin(true);
navigate('/addstudent')
  }

  return (
    <div className={styles.student}>
      <div className={styles.student__mobile}>
        <div className={styles.student__left}>
          <Avatar className={styles.student__avatar}></Avatar>
          <div className={styles.student__info}>
            <p>{name} <span className={styles.student__level}>Level {level}</span></p>
            <span className={styles.student__course}>{program}</span>
            <span className={styles.student__email}> {indexNo || email}</span>
          </div>
        </div>

        <div className={styles.student__buttons}>
         <IconButton onClick={handleEdit}> <Edit className={styles.edit} /></IconButton>
         <IconButton onClick={() => dispatch(deleteUser(id))}>   <Clear className={styles.delete}/></IconButton>
       
        </div>
      </div>
    </div>
  );
};

export default Student;
