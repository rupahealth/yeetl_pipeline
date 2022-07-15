import { withRouter } from "next/router";
import { Popup } from "../components/popup";
import { ResultsList } from "../components/results-list";

const Results = ({}) => {
  return (
    <Popup>
      <ResultsList connectedRecords={[]} unmatchedRecords={[]} />
    </Popup>
  );
};

export default withRouter(Results);
