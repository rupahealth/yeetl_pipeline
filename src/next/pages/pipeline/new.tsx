import { useEffect, useState } from "react";
import { Popup } from "../../components/popup";

const INITIAL_STATE = {
  model: "orderedtest",
  table: "//id='10asdf'",
  transformations: [
    { from: 3, to: "Patient", match_on: false },
    { from: 7, to: "Received", match_on: false },
  ],
};

function useRecording<T = any>(handler: (data: T) => void) {
  useEffect(() => {
    const eventHandler = (event: MessageEvent) => {
      console.log("received message", event);

      handler(event.data.data);
    };

    window.addEventListener("message", eventHandler);

    return () => window.removeEventListener("message", eventHandler);
  }, [handler]);
}

type ExtractTransformationRowProps = {
  transformation: typeof INITIAL_STATE["transformations"][0];
  setTransformation: (
    state: typeof INITIAL_STATE["transformations"][0]
  ) => void;
  setParentXPath: (xpath: string) => void;
};
const ExtractTransformationRow = ({
  transformation,
  setTransformation,
  setParentXPath,
}: ExtractTransformationRowProps) => {
  const [recording, setRecording] = useState(false);

  useRecording<{ cell_index: number; parent_selector: string }>(
    async (data) => {
      console.log("00000000000", data, recording);
      if (recording) {
        setTransformation({ ...transformation, from: data.cell_index });
        setParentXPath(data.parent_selector);

        const [tab] = await browser.tabs.query({
          active: true,
          currentWindow: true,
        });

        await browser.tabs.sendMessage(tab.id, { subject: "stop-recording" });
        setRecording(false);
      }
    }
  );

  async function startRecording() {
    setRecording(true);

    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true,
    });

    await browser.tabs.sendMessage(tab.id, { subject: "start-recording" });
  }

  return (
    <div>
      <button disabled={recording} onClick={startRecording}>
        {recording ? "Recording" : "Select Table Data"}
      </button>
      <strong> From:</strong> Index {transformation.from}
      <strong> To: </strong>
      <input
        value={transformation.to}
        onChange={(event) => {
          console.log(event.target.value);
          setTransformation({ ...transformation, to: event.target.value });
        }}
      ></input>
      <strong> Match On: </strong>{" "}
      <input
        type="checkbox"
        checked={transformation.match_on}
        onChange={(event) =>
          setTransformation({
            ...transformation,
            match_on: event.target.checked,
          })
        }
      ></input>
    </div>
  );
};

const NewPipelinePage = () => {
  const [formState, setFormState] = useState(INITIAL_STATE);

  const setTransformation = (
    transformation: typeof INITIAL_STATE["transformations"][0],
    index: number
  ) => {
    const newState: typeof formState = Object.assign<any, typeof formState>(
      {},
      formState
    );
    console.log(newState);
    newState.transformations[index] = transformation;

    setFormState(newState);
    console.log("new state", newState);
  };

  const setParentXPath = (xpath: string) => {
    console.log("new form state thing");
    setFormState({ ...formState, table: xpath });
  };

  const addTransformation = () => {
    setFormState({
      ...formState,
      transformations: [
        ...formState.transformations,
        { from: 1, to: "", match_on: false },
      ],
    });
  };

  return (
    <Popup>
      <>
        <div style={{ marginBottom: "10px" }}>
          <strong>Model: </strong>
          <input
            value={formState.model}
            onChange={(e) =>
              setFormState({ ...formState, model: e.target.value })
            }
          ></input>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <strong>Parent XPath: </strong>
          <input value={formState.table}></input>
        </div>

        {formState.transformations.map((transformation, idx) => (
          <ExtractTransformationRow
            transformation={transformation}
            setTransformation={(transformation) =>
              setTransformation(transformation, idx)
            }
            setParentXPath={setParentXPath}
            key={idx}
          />
        ))}
        <br />
        <button onClick={addTransformation}>Add Transformation</button>
      </>
    </Popup>
  );
};

export default NewPipelinePage;
