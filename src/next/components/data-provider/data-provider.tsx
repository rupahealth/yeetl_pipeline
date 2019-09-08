import React, { Component } from "react";
import { autoBind } from "react-extras";

import { Data } from "./data.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

interface DataProviderProps {
  children: JSX.Element | JSX.Element[];
}

const DataContext = React.createContext({
  repos: {},
  createRepo: (_repo: Repo) => null,
  deleteRepo: (_id: string) => null,
  updateRepo: (_id: string, _repo: Repo) => null
});

class DataProvider extends Component<DataProviderProps, Data> {
  constructor(props) {
    super(props);

    this.state = {
      repos: {
        "workos-inc/workos": {
          localPath: "/Users/maxchehab/projects/workos",
          name: "workos-inc/workos",
          url: "https://github.com/workos-inc/workos"
        },
        "maxchehab/gh-code": {
          localPath: "/Users/maxchehab/projects/gh-code",
          name: "maxchehab/gh-code",
          url: "https://github.com/maxchehab/gh-code"
        }
      }
    };

    autoBind(this);
  }

  updateRepo(id: string, repo: Repo) {
    const repos = Object.assign(this.state.repos, { [id]: repo });
    this.setState({ repos });
  }

  createRepo(repo: Repo) {
    const repos = Object.assign(this.state.repos, {
      [new Date().getTime().toString()]: repo
    });
    this.setState({ repos });
  }

  deleteRepo(id: string) {
    const repos = Object.assign(this.state.repos, {});
    const { name } = repos[id];
    const message = `⚠️ Are you sure you want to delete all data for the repo '${name}'?`;

    if (confirm(message)) {
      delete repos[id];
    }

    this.setState({ repos });
  }

  render() {
    const { children } = this.props;
    const { repos } = this.state;

    return (
      <DataContext.Provider
        value={{
          repos,
          createRepo: this.createRepo,
          deleteRepo: this.deleteRepo,
          updateRepo: this.updateRepo
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
