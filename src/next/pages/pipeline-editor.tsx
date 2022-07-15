import router, { useRouter, withRouter } from "next/router";
import { Popup } from "../components/popup";
import { PipelineEditor } from "../components/pipeline-editor";
import { useEffect, useState } from "react";

const PipelineEditorContainer = () => {
  const router = useRouter();

  const { pipeline: data } = router.query;

  const [pipeline, setPipeline] = useState();

  useEffect(() => {
    if (data) {
      setPipeline(JSON.parse(String(data)));
    }
  }, [data]);

  return (
    <Popup>
      <PipelineEditor pipeline={pipeline} />
    </Popup>
  );
};

export default withRouter(PipelineEditorContainer);
