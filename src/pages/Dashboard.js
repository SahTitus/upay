import React, { useEffect } from "react";
import styles from "../styles/Dashboard.module.css";
import av from "../images/av.svg";
import { Box, Button, CircularProgress } from "@mui/material";
import PaidChart from "../components/PaidChart";
import Histories from "../components/Histories";
import { getUser, getUsers } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
const Dashboard = () => {
  const userLocal = JSON.parse(localStorage.getItem("profile"));
  const { user, users, isLoading } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = userLocal?.result?._id;

  useEffect(() => {
    if (!id) {
      navigate("/auth");
    } else {
      dispatch(getUser(id));
    }
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const level100Fees = user?.transData?.map((data) =>
    data.level === 100 ? data.amount : null
  );
  const level200Fees = user?.transData?.map((data) =>
    data.level === 200 ? data.amount : null
  );
  const level300Fees = user?.transData?.map((data) =>
    data.level === 300 ? data.amount : null
  );
  const level400Fees = user?.transData?.map((data) =>
    data.level === 400 ? data.amount : null
  );

  const sortData = user?.transData
    ?.slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const sumEarnings = (arr = []) => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      const el = arr[i];
      sum += +el;
    }
    return sum;
  };

  const allFees = users?.find((user) => user?.admin === true);

  const myFees = allFees?.fees?.map((fee) =>
    fee?.level === parseInt(user?.level) && fee?.program === user?.program
      ? fee.amount
      : null
  );

  const payableFees = () => {
    if (parseInt(user?.level) === 100) {
 
      return sumEarnings(myFees?.flat()).toFixed(2) - sumEarnings(level100Fees?.flat()).toFixed(2);
    } else if (parseInt(user?.level) === 200) {
      return sumEarnings(myFees?.flat()).toFixed(2) - sumEarnings(level200Fees?.flat()).toFixed(2);
    } else if (parseInt(user?.level) === 300) {
      return sumEarnings(myFees?.flat()).toFixed(2) - sumEarnings(level300Fees?.flat()).toFixed(2);
    } else {
      return sumEarnings(myFees?.flat()).toFixed(2) - sumEarnings(level400Fees?.flat()).toFixed(2);
      
    }

  };


    // const payableFees = ;

  return (
    <div className={styles.dashboard}>
      <Navbar />
      {/* {showWelcome ? ( <div className={styles.upay}> <h1>WELCOME</h1></div>) : ''} */}
      <div className={styles.panel__wrapper}>
        <div className={styles.panel}>
          <div className={styles.toPay}>
            <p>Hi {userLocal?.result?.name?.split(" ")[0]},</p>
            <h4>Payable Fee</h4>
            <strong>GHS {payableFees()}</strong>
            <Link className={styles.paynowLink} to="/pay">
              <Button className={styles.paynow}> Pay Now</Button>
            </Link>
          </div>
          <img src={av} alt="avatar" className={styles.avatarSvg} />
        </div>
      </div>

      <div className={styles.details}>
        <PaidChart
          level={100}
          amountPaid={sumEarnings(level100Fees?.flat()).toFixed(2)}
          debt={200}
          percentage={50}
        />
        <PaidChart
          level={200}
          amountPaid={sumEarnings(level200Fees?.flat()).toFixed(2)}
          debt={200}
          percentage={30}
        />
        <PaidChart
          level={300}
          amountPaid={sumEarnings(level300Fees?.flat()).toFixed(2)}
          debt={100}
          percentage={80}
        />
        <PaidChart
          level={400}
          amountPaid={sumEarnings(level400Fees?.flat()).toFixed(2)}
          debt={0}
          percentage={100}
        />
      </div>
      <div className={styles.histories}>
        <p className={styles.his__topText}>Transaction List</p>

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
          sortData?.map((data, i) => {
            return (
              <Histories
                key={user._id + data.timestamp + i}
                amount={data.amount}
                level={data.level}
                failed={data.status}
                timestamp={data.timestamp}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Dashboard;
