import { withRouter } from "next/router";
import { useEffect, useState } from "react";
import { Popup } from "../components/popup";
import { ResultsList } from "../components/results-list";
import { post } from "../utils/request.util";

interface RequestDataObj {
  Patient: string;
  Received: string;
  Status: string;
}

interface RequestDataTransformations {
  from: string;
  to: string;
  match_on: boolean;
}

export interface RequestData {
  data: RequestDataObj[];
  model: string;
  transformations: RequestDataTransformations[];
}

const Results = ({}) => {
  const [connectedRecords, setConnectedRecords] = useState([]);
  const [unmatchedRecords, setUnmatchedRecords] = useState([]);
  useEffect(() => {
    const postData = async () => {
      const data = await post({
        data: [
          {
            Patient: "test patient",
            Received: "07/15/22",
            Status: "Received",
          },
        ],
        model: "core_order",
        transformations: [
          {
            from: "Patient",
            to: "test patient",
            match_on: true,
          },
          {
            from: "Received",
            to: "07/15/22",
            match_on: false,
          },
          {
            from: "Status",
            to: "Received",
            match_on: true,
          },
        ],
      });

      setConnectedRecords(data.connectedRecords);
      setUnmatchedRecords(data.unmatchedRecords);
    };

    postData();
  }, []);

  return (
    <Popup>
      <ResultsList
        connectedRecords={connectedRecords}
        unmatchedRecords={unmatchedRecords}
      />
    </Popup>
  );
};

export default withRouter(Results);
