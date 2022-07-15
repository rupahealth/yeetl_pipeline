import { withRouter } from "next/router";
import { Popup } from "../components/popup";
import { PipelineEditor } from "../components/pipeline-editor";

const PipelineEditorContainer = () => {
  return (
    <Popup>
      <PipelineEditor pipeline={null} />
    </Popup>
  );
};

export default withRouter(PipelineEditorContainer);
