import React from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";
import styles from "../styles/Invoice.module.css";

const DownPdf = ({ rootElementId, fileName }) => {
  const downloadPdfDocument = () => {
    const input = document.getElementById(rootElementId);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save(`${fileName} invoice .pdf`);
    });
  };

  return (
    <div className={styles.downloadButton}>
      <Button className={styles.button} onClick={downloadPdfDocument}>
        Download Invoice
      </Button>
    </div>
  );
};

export default DownPdf;
