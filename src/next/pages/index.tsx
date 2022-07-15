import { Component } from "react";
import { autoBind } from "react-extras";

import { CreateRepoButton } from "../components/create-repo-button";
import { PipelineList } from "../components/pipeline-list";
import { Popup } from "../components/popup";
import { RepoList } from "../components/repo-list";
import { SearchBar } from "../components/search-bar";
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

  componentDidMount() {
    const pipeline: Pipeline = {
      name: "Really Cool Pipeline",
      configuration: {
        table: `//id="table0"`,
        extractConfig: [
          {
            from: 3,
            to: "Patient",
          },
          {
            from: 7,
            to: "Patient",
          },
        ],
      },
    };
    // const { intent, name } = query(window.location.search);
    this.setState({ pipelines: [pipeline] });
  }

  // onSearch(search: string) {
  //   this.setState({ search });
  // }

  // clearSearch() {
  //   this.onSearch("");

  //   if (this.searchInput) {
  //     this.searchInput.focus();
  //   }
  // }

  pipelines = [{}];

  render() {
    const { pipelines } = this.state;

    return (
      <Popup>
        {/* <PipelineList pipelines={pipelines} /> */}
        <ResultsList connectedRecords={[]} unmatchedRecords={[]} />
        {/* <CreateRepoButton
          justModal={true}
          showInitially={intent === "create-repo"}
          defaultName={name}
        />

        <SearchBar
          innerRef={(ref: HTMLInputElement) => (this.searchInput = ref)}
          onSearch={this.onSearch}
          value={search}
        />

        <RepoList search={search} clearSearch={this.clearSearch} /> */}
      </Popup>
    );
  }
}
