import { withRouter } from "next/router";
import { Popup } from "../components/popup";
import { NewPipeline } from "../components/create-new-pipeline";

const NewPipelinePage = () => {
  return (
    <Popup>
      <NewPipeline />
    </Popup>
  );
};

export default withRouter(NewPipelinePage);
