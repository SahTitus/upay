import React from "react";
import styles from "../styles/Invoice.module.css";
import { useStateContex } from "../store/StateProvider";
import DownPdf from "../utils/DownloadPdf";

const Invoice = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  const user = profile.result

  const { payData } = useStateContex();

  return (
    <div className={styles.invoice__container}>
      <div  className={styles.invoice__container2}>
    <div id="myInvoicePdfDownload"  className={styles.invoice}>
      <div className={styles.invoice__top}>
        <img src={""} alt="" />
        <h1>UPAY</h1>
      </div>
      <div className={styles.invoice__body}>
        <div className={styles.student__infoContainer}>
          <div className={styles.studentInfo}>
            <p className={styles.studHeadings}>Receipt for</p>
            <p>{user?.name}</p>
            <p>{user?.indexNo || user?.email}</p>
            <p>{user?.program}</p>
            <p> Level {payData?.level}</p>
          </div>
          <div className={styles.payment__date}>
            <p className={styles.studHeadings}>Payment date</p>
            <p className={styles.date}>{payData.timestamp}</p>
          </div>
        </div>
        <div className={styles.payment__infoContainer}>
          <div className={styles.payment__info}>
            <div className={styles.payment__type}>
              <p>Payment type</p>
              <p className={styles.type__text}>{payData?.paymentType}</p>
            </div>
            <div className={styles.payment__amount}>
              <p>Amount paid</p>
              <strong>GHS {parseInt(payData?.amount).toFixed(2)}</strong>
            </div>
          </div>
          <div className={styles.invoice__msgContainer}>
          <p className={styles.invoice__msg}>Thank you</p>
          </div>
        </div>
      </div>
    </div>
   
    </div>
   <DownPdf
   fileName={user?.name + payData.paymentType} 
   rootElementId="myInvoicePdfDownload" 
   />
    </div>
  );
};

export default Invoice;
