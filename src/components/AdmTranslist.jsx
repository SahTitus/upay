import React from "react";
import { Avatar, IconButton } from "@mui/material";
import styles from "../styles/Admin.module.css";
import { Check, Clear } from "@mui/icons-material";
import av from "../images/av.svg";
import moment from "moment";
import { Person, PersonFill } from "react-bootstrap-icons";

const AdmTranslist = ({
  users,
  timestamp,
  image,
  name,
  dep,
  id,
  amount,
  status,
}) => {
  return (
    <>
      <div className={styles.trans__table}>
        <div className={styles.table__columns}>
          <h4 className={styles.tables__heading}>Name</h4>
          {users?.map((user, i) =>
            user.transData.map((data) => (
              <div
                key={user._id + i + data.amount}
                className={`${styles.column__info} ${styles.column__infoLeft}`}
              >
                <div className={styles.imge}>
                  {user?.result?.image ? (
                    <img
                      className={styles.large__image}
                      src={user?.result?.image}
                      alt="oh"
                    />
                  ) : (
                    <PersonFill className={styles.personFill} />
                  )}
                </div>
                <p> {user.name}</p>
              </div>
            ))
          )}
        </div>
        <div className={styles.table__columns}>
          <h4 className={styles.tables__heading}>ID</h4>

          {users?.map((user, i) =>
            user.transData.map((data) => (
              <div
                key={user._id + i + data.amount}
                className={styles.column__info}
              >
                {user._id}
              </div>
            ))
          )}
        </div>
        <div className={`${styles.table__columns} ${styles.columnProgram}`}>
          <h4 className={styles.tables__heading}>Department</h4>

          {users?.map((user, i) =>
            user.transData.map((data) => (
              <div
                key={user._id + i + data.amount}
                className={styles.column__info}
              >
                {user.program}
              </div>
            ))
          )}
        </div>
        <div
          className={`${styles.table__columns} ${styles.status} ${styles.statusColumn}`}
        >
          <h4 className={styles.tables__heading}>Status</h4>
          <div className={styles.column__stat}>
            {users?.map((user, i) =>
              user.transData.map((data) => (
                <div
                  key={user._id + i + data.amount}
                  className={`${styles.column__info} ${styles.status__info}`}
                >
                  <strong>GHS {data.amount}</strong>
                  {data.status ? (
                    <span className={styles.success}>
                      <Check />{" "}
                    </span>
                  ) : (
                    <span className={styles.failed}>
                      <Clear />
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={styles.histories}>
        <div className={styles.listItem}>
          <div className={styles.image}>
            {image ? (
              <img className={styles.list__image} src={image} alt="oh" />
            ) : (
              <PersonFill className={styles.personFill} />
            )}
          </div>
          <div className={styles.info}>
            <p className={styles.title}>
              {name} <span> {id}</span>
            </p>

            <span className={styles.timestamp}>{timestamp}</span>
          </div>
          <div className={styles.status}>
            <strong>GHS {amount}</strong>
            {status ? (
              <span className={styles.success}>
                <Check />{" "}
              </span>
            ) : (
              <span className={styles.failed}>
                <Clear />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmTranslist;
