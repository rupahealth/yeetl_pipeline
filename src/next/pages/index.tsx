import { Component, Fragment } from "react";
import { Pane } from "evergreen-ui";
import { autoBind } from "react-extras";

import { CreateRepoButton } from "../components/create-repo-button";
import { DataProvider } from "../components/data-provider";
import { RepoList } from "../components/repo-list";
import { SearchBar } from "../components/search-bar";

interface IndexState {
  search: string;
  intent: string;
  name: string;
}

const query = (queryString: string) => {
  var query = {} as any;
  var pairs = (queryString[0] === "?"
    ? queryString.substr(1)
    : queryString
  ).split("&");

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
};

export default class Index extends Component<any, IndexState> {
  constructor(props: any) {
    super(props);

    this.state = {
      search: "",
      intent: null,
      name: null
    };

    autoBind(this);
  }

  searchInput: HTMLInputElement;

  componentDidMount() {
    const { intent, name } = query(window.location.search);

    this.setState({ intent, name });
  }

  onSearch(search: string) {
    this.setState({ search });
  }

  clearSearch() {
    this.onSearch("");

    if (this.searchInput) {
      this.searchInput.focus();
    }
  }

  render() {
    const { search, intent, name } = this.state;

    return (
      <Fragment>
        <DataProvider>
          <CreateRepoButton
            justModal={true}
            showInitially={intent === "create-repo"}
            defaultName={name}
          />
          <Pane
            height={400}
            width={325}
            display={"flex"}
            alignItems={"vertical"}
            flexDirection={"column"}
          >
            <SearchBar
              innerRef={(ref: HTMLInputElement) => (this.searchInput = ref)}
              onSearch={this.onSearch}
              value={search}
            />

            <RepoList search={search} clearSearch={this.clearSearch} />
          </Pane>
        </DataProvider>
      </Fragment>
    );
  }
}
