import { useEffect, useState } from "react";
import { Pane, Button } from "evergreen-ui";
import { Pipeline } from "../../../common/interfaces/pipeline.interface";
import { navigate } from "../../utils/navigate.util";
import router from "next/router";

interface PipelineEditorProps {
  pipeline: Pipeline;
}

function useRecording<T = any>(handler: (data: T) => void) {
  useEffect(() => {
    const eventHandler = (event: MessageEvent) => {
      console.log("received message", event);

      if (event.data.subject === "extract-result") {
        handler(event.data.data);
      }
    };

    window.addEventListener("message", eventHandler);

    return () => window.removeEventListener("message", eventHandler);
  }, [handler]);
}

function PipelineEditor({ pipeline }: PipelineEditorProps) {
  const [data, setData] = useState([]);

  const handleDataClick = async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    await browser.tabs.sendMessage(tab.id, {
      subject: "extract-data",
      pipeline,
    });

    // setData([
    //   ...data,
    //   { Patient: `mock data ${data.length}`, Received: "07/15/22" },
    // ]);
  };

  useRecording((data) => {
    setData(data);
  });

  const removeDataPoint = (index) => {
    const tempData = [...data];
    tempData.splice(index, 1);
    setData(tempData);
  };

  const setDataValue = (index, field, event) => {
    const tempData = [...data];
    tempData[index][field] = event.target.value;
    setData(tempData);
  };

  if (!pipeline) {
    return <div>loading</div>;
  }

  return (
    <Pane
      alignItems={"left"}
      color={"#000"}
      flexShrink={0}
      width={"100%"}
      borderBottom={"1px solid #EDF0F2"}
      fontSize={"16px"}
      marginTop={"10px"}
      paddingBottom={"10px"}
      paddingLeft={"15px"}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div>
          <h3>{pipeline.name}</h3>
        </div>
        <div style={{ marginLeft: "auto", alignSelf: "center" }}>
          <Button onClick={handleDataClick}>Get Data</Button>
        </div>
      </div>
      <div style={{ marginBottom: "5px" }}>
        {data.map((d, index) => (
          <div>
            <input
              type="text"
              value={d.Patient}
              onChange={(e) => setDataValue(index, "Patient", e)}
            />
            <input type="text" value={d.Received} />
            <Button onClick={() => removeDataPoint(index)}>Delete</Button>
          </div>
        ))}
      </div>
      <div>
        <Button
          appearance={"primary"}
          style={{
            width: "100%",
            height: "100%",
            "text-align": "center",
            display: "block",
            "font-size": "16px",
          }}
          disabled={!data.length}
          onClick={() => navigate(router, "/results")}
        >
          Submit to Django
        </Button>
      </div>
    </Pane>
  );
}

export default PipelineEditor;
