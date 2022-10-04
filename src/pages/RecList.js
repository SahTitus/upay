import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdmTranslist from "../components/AdmTranslist";
import { getUsers } from "../actions/auth";
import styles from "../styles/Students.module.css";
import { useStateContex } from "../store/StateProvider";
import { IconButton } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const RecList = () => {
  let feesData = [];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useStateContex();
  const { users } = useSelector((state) => state.auth);
  const sortData = feesData
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  users.map((user) =>
    user.transData.filter((data) => {
      if (data.paymentType === "School Fees" && type === "schFees") {
        feesData.push(user);
      } else if (
        data.paymentType === "Departmental Fees" &&
        type === "depFees"
      ) {
        feesData.push(user);
      } else {
        feesData.push(user);
      }
      return null;
    })
  );

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
        <p>Status</p>
      </div>

      <div className={styles.trans__list}>
        {type !== "depFees" &&
          type !== "schFees" &&
          users.map((user, i) =>
            user.transData.map((data) => (
              <AdmTranslist
                key={i + data.amount}
                name={user.name}
                id={124849356}
                status={data.status === "success" ? true : false}
                dep={user.program}
                amount={data.amount}
                timestamp={data.timestamp}
              />
            ))
          )}

        {type === "schFees" &&
          users.map((user, i) =>
            user.transData.map(
              (data) =>
                data.paymentType === "School Fees" &&
                type === "schFees" && (
                  <AdmTranslist
                    key={i + data.amount}
                    name={user.name}
                    id={124849356}
                    status={data.status === "success" ? true : false}
                    dep={user.program}
                    amount={data.amount}
                    timestamp={data.timestamp}
                  />
                )
            )
          )}

        {type === "depFees" &&
          users.map((user, i) =>
            user.transData.map(
              (data) =>
                data.paymentType === "Departmental Fees" &&
                type === "depFees" && (
                  <AdmTranslist
                    key={i + data.amount}
                    name={user.name}
                    id={124849356}
                    status={data.status === "success" ? true : false}
                    dep={user.program}
                    amount={data.amount}
                    timestamp={data.timestamp}
                  />
                )
            )
          )}
      </div>
    </div>
  );
};

export default RecList;
