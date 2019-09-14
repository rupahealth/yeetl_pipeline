import { Component, Fragment } from "react";
import { Pane } from "evergreen-ui";
import { autoBind } from "react-extras";

import { DataProvider } from "../components/data-provider";
import { RepoList } from "../components/repo-list";
import { SearchBar } from "../components/search-bar";

interface IndexState {
  search: string;
}

export default class Index extends Component<any, IndexState> {
  constructor(props: any) {
    super(props);

    this.state = {
      search: ""
    };

    autoBind(this);
  }

  searchInput: HTMLInputElement;

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
    const { search } = this.state;

    return (
      <Fragment>
        <DataProvider>
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
