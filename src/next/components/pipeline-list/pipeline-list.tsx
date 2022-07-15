import { useState } from "react";
import { Pane, Button } from "evergreen-ui";
import { Pipeline } from "../../../common/interfaces/pipeline.interface";
import { navigate } from "../../utils/navigate.util";
import router, { withRouter } from "next/router";
import { withData } from "../../hocs/with-data";

interface PipelineListProps {
  pipelines: Pipeline[];
  deletePipeline: (pipeline: Pipeline) => void;
}

function PipelineList({ pipelines, deletePipeline }: PipelineListProps) {
  const [hover, setHover] = useState(false);

  const handleRemovePipeline = (pipeline) => {
    deletePipeline(pipeline);
  };

  return (
    <Pane
      alignItems={"left"}
      color={"#000"}
      width={"100%"}
      borderBottom={"1px solid #EDF0F2"}
      fontSize={"16px"}
      marginTop={"10px"}
      paddingBottom={"10px"}
      paddingLeft={"15px"}
      paddingRight={"15px"}
    >
      {pipelines.length
        ? pipelines.map((pipeline) => (
            <div style={{ display: "flex", width: "100%" }}>
              <div
                style={
                  hover
                    ? {
                        cursor: "pointer",
                        color: "#0075CD",
                      }
                    : {}
                }
                onMouseEnter={() => {
                  setHover(true);
                }}
                onMouseLeave={() => {
                  setHover(false);
                }}
              >
                {pipeline.name}
              </div>
              <div
                style={{
                  color: "red",
                  cursor: "pointer",
                  marginLeft: "auto",
                  paddingRight: "15px",
                }}
                onClick={() => handleRemovePipeline(pipeline)}
              >
                Remove
              </div>
            </div>
          ))
        : "No pipelines found"}
      <div style={{ marginTop: "100px" }}>
        <Button
          appearance={"primary"}
          onClick={() => navigate(router, "/pipeline/new")}
          style={{
            width: "100%",
            height: "100%",
            "text-align": "center",
            display: "block",
            "font-size": "16px",
          }}
        >
          Create Pipeline
        </Button>
        <Button
          appearance={"secondary"}
          onClick={() => navigate(router, "/editor")}
          style={{
            width: "100%",
            height: "100%",
            "text-align": "center",
            display: "block",
            "font-size": "16px",
          }}
        >
          Go to Pipeline Editor
        </Button>
      </div>
    </Pane>
  );
}

export default withRouter(withData(PipelineList));
