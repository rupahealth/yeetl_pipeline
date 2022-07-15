import { useState } from "react";
import { Pane, Button } from "evergreen-ui";
import { Pipeline } from "../../../common/interfaces/pipeline.interface";
import { exportCSVFile } from "../../utils/csv.util";

interface ResultsListsProps {
  connectedRecords: any[]; // TODO: Figure out interface for these responses on the backend
  unmatchedRecords: any[];
}

export default function PipelineList({
  connectedRecords,
  unmatchedRecords,
}: ResultsListsProps) {
  const [hover, setHover] = useState(false);

  connectedRecords = [
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
      orderLink: "https://labs.rupahealth.com/admin/order",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
      orderLink: "https://labs.rupahealth.com/admin/order",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
      orderLink: "https://labs.rupahealth.com/admin/order",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
      orderLink: "https://labs.rupahealth.com/admin/order",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
      orderLink: "https://labs.rupahealth.com/admin/order",
    },
  ];

  unmatchedRecords = [
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
  ];

  const headers = {
    patientName: "Patient Full Name",
    date: "Received Date",
  };

  const handleExportToCsv = () => {
    exportCSVFile(headers, unmatchedRecords, "UnmatchedRecords");
  };

  return (
    <Pane
      color={"#000"}
      width={"100%"}
      fontSize={"16px"}
      marginTop={"10px"}
      paddingBottom={"10px"}
      paddingLeft={"15px"}
      paddingRight={"15px"}
    >
      <div
        style={{
          display: "block",
          borderBottom: "1px solid #EDF0F2",
          paddingBottom: "20px",
        }}
      >
        <h3>Matched Records</h3>
        {connectedRecords.length
          ? connectedRecords.map((record) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <div>{record.patientName}</div>
                <div>{record.date}</div>
                <div style={{ width: "33%" }}>
                  <a href={record.orderLink}>Link to Order</a>
                </div>
              </div>
            ))
          : "No records were successfully matched"}
      </div>

      <div
        style={{
          display: "block",
          borderBottom: "1px solid #EDF0F2",
          paddingBottom: "20px",
        }}
      >
        <h3>Unmatched Records</h3>
        {unmatchedRecords.length
          ? unmatchedRecords.map((record) => (
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "space-between",
                }}
              >
                <div>{record.patientName}</div>
                <div>{record.date}</div>
              </div>
            ))
          : "All records were successfully matched"}
      </div>

      <div style={{ display: "block", marginTop: "20px" }}>
        <Button
          appearance={"primary"}
          onClick={handleExportToCsv}
          style={{
            width: "100%",
            height: "100%",
            "text-align": "center",
            display: "block",
            "font-size": "16px",
          }}
        >
          Export Unmatched as CSV
        </Button>
      </div>
    </Pane>
  );
}
