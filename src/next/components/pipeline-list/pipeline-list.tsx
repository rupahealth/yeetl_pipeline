import { useState } from "react";
import { Pane } from "evergreen-ui";
import { Pipeline } from "../../../common/interfaces/pipeline.interface";

interface PipelineListProps {
  pipelines: Pipeline[];
}

export default function PipelineList({ pipelines }: PipelineListProps) {
  const [hover, setHover] = useState(false);

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
                onClick={() => console.log("Clicked")}
              >
                Remove
              </div>
            </div>
          ))
        : "No pipelines found"}
    </Pane>
  );
}
