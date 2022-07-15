import React, { Component } from "react";
import { autoBind } from "react-extras";
import { ulid } from "ulid";

import { Data, Settings } from "../../../common/interfaces/data.interface";
import { Pipeline } from "../../../common/interfaces/pipeline.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

interface DataProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface DataProviderState extends Data {
  loaded: boolean;
}

const DEFAULT_STATE = {
  loaded: false,
  pipelines: [],
};

const DataContext = React.createContext({
  createPipeline: (_pipeline: Partial<Pipeline>) => null,
  deletePipeline: (_pipeline: Pipeline) => null,
  findPipeline: (_id: string) => null,
  updatePipeline: (_pipeline: Pipeline) => null,
  resetStorage: () => null,
  ...DEFAULT_STATE,
});

class DataProvider extends Component<DataProviderProps, DataProviderState> {
  constructor(props) {
    super(props);

    autoBind(this);

    this.state = DEFAULT_STATE;
  }

  async componentDidMount() {
    const { data } = (await browser.storage.local.get("data")) as unknown as {
      data: Data;
    };

    if (!data) {
      await browser.storage.local.set({
        data: DEFAULT_STATE,
      });

      return this.setState({ loaded: true });
    }

    this.setState({ ...data, loaded: true });
  }

  updatePipeline(pipeline: Pipeline) {
    const { pipelines } = this.state;
    let updatedPipelines = [...pipelines];
    updatedPipelines = updatedPipelines.map((p) => {
      if (p.id === pipeline.id) {
        return pipeline;
      }

      return p;
    });

    this.setState({ pipelines: updatedPipelines });

    const data = { updatedPipelines } as any;
    browser.storage.local.set({ data });
  }

  createPipeline(pipeline: Partial<Pipeline>): Pipeline {
    console.log("9999999999999");
    const { pipelines } = this.state;
    const id = ulid();
    pipeline.id = id;

    const newPipelines = [...pipelines];
    newPipelines.push(pipeline as Pipeline);

    this.setState({ pipelines: newPipelines });

    const data = { pipelines: newPipelines } as any;
    browser.storage.local.set({ data });

    console.log(pipelines);

    return pipeline as Pipeline;
  }

  findPipeline(id: string): Pipeline {
    const { pipelines } = this.state;

    if (!id) {
      return null;
    }

    return pipelines.find((p) => p.id === id);
  }

  deletePipeline({ id }: Pipeline) {
    const { pipelines } = this.state;
    const tempPipelines = [...pipelines];

    const index = tempPipelines.findIndex((p) => p.id === id);

    tempPipelines.splice(index, 1);

    this.setState({ pipelines: tempPipelines });

    const data = { pipelines: tempPipelines } as any;
    browser.storage.local.set({ data });
  }

  async resetStorage() {
    await browser.storage.local.set({
      data: DEFAULT_STATE,
    });

    return this.setState({ pipelines: [] });
  }

  render() {
    const { children } = this.props;
    const { pipelines, loaded } = this.state;

    return (
      <DataContext.Provider
        value={{
          pipelines,
          createPipeline: this.createPipeline,
          deletePipeline: this.deletePipeline,
          updatePipeline: this.updatePipeline,
          findPipeline: this.findPipeline,
          resetStorage: this.resetStorage,
          loaded,
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
