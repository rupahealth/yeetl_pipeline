import { Component } from "react";
import { autoBind } from "react-extras";

import { PipelineList } from "../components/pipeline-list";
import { Popup } from "../components/popup";
import { Pipeline } from "../../common/interfaces/pipeline.interface";
import { ResultsList } from "../components/results-list";

interface IndexState {
  pipelines: Pipeline[];
}

// const query = (queryString: string) => {
//   var query = {} as any;
//   var pairs = (queryString[0] === "?"
//     ? queryString.substr(1)
//     : queryString
//   ).split("&");

//   for (var i = 0; i < pairs.length; i++) {
//     var pair = pairs[i].split("=");
//     query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
//   }
//   return query;
// };

export default class Index extends Component<any, IndexState> {
  constructor(props: any) {
    super(props);

    this.state = {
      pipelines: [],
    };

    autoBind(this);
  }

  searchInput: HTMLInputElement;

  pipelines = [{}];

  render() {
    const { pipelines } = this.state;

    return (
      <Popup>
        <PipelineList pipelines={pipelines} />
      </Popup>
    );
  }
}
