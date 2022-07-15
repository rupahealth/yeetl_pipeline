import { useState } from "react";
import { Pane } from "evergreen-ui";
import { Pipeline } from "../../../common/interfaces/pipeline.interface";

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
  ];

  unmatchedRecords = [
    {
      patientName: "Alexander Pearson",
      date: "07/15/22",
    },
  ];

  return (
    <Pane
      alignItems={"left"}
      alignSelf={"flex-end"}
      color={"#000"}
      display={"flex"}
      flexShrink={0}
      width={"100%"}
      borderBottom={"1px solid #EDF0F2"}
      fontSize={"16px"}
      marginTop={"10px"}
      paddingBottom={"10px"}
      paddingLeft={"15px"}
    >
      {connectedRecords.length
        ? connectedRecords.map((record) => (
            <div style={{ display: "flex", width: "100%" }}>
              <div>{record.patientName}</div>
              <div>{record.date}</div>
              <div>{record.orderLink}</div>
            </div>
          ))
        : "No records were successfully matched"}

      {unmatchedRecords.length
        ? unmatchedRecords.map((record) => (
            <div style={{ display: "flex", width: "100%" }}>
              <div>{record.patientName}</div>
              <div>{record.date}</div>
            </div>
          ))
        : "All records were successfully matched"}
    </Pane>
  );
}
