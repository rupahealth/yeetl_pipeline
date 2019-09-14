import React, { Component } from "react";
import { autoBind } from "react-extras";
import { ulid } from "ulid";

import { Data } from "./data.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

interface DataProviderProps {
  children: JSX.Element | JSX.Element[];
}

const DataContext = React.createContext({
  repos: {},
  createRepo: (_repo: Repo) => null,
  deleteRepo: (repo: Repo) => null,
  findRepo: (_id: string) => null,
  updateRepo: (_repo: Repo) => null
});

class DataProvider extends Component<DataProviderProps, Data> {
  constructor(props) {
    super(props);

    autoBind(this);

    this.state = {
      repos: {}
    };
  }

  async componentDidMount() {
    // const id = ulid();

    // await browser.storage.local.set({
    //   data: {
    //     repos: {
    //       [id]: {
    //         id,
    //         name: "maxchehab/gh-code",
    //         localPath: "/Users/maxchehab/projects/gh-code",
    //         url: "https://github.com/maxchehab/gh-code"
    //       }
    //     }
    //   }
    // });

    const { data } = ((await browser.storage.local.get("data")) as unknown) as {
      data: Data;
    };

    if (!data) {
      return await browser.storage.local.set({
        data: {
          repos: {}
        }
      });
    }

    this.setState(data);
  }

  updateRepo(repo: Repo) {
    const repos = Object.assign(this.state.repos, { [repo.id]: repo });

    this.setState({ repos });

    const data = { repos } as any;
    browser.storage.local.set({ data });
  }

  createRepo(repo: Repo) {
    const repos = Object.assign(this.state.repos, {
      [ulid()]: repo
    });

    this.setState({ repos });

    const data = { repos } as any;
    browser.storage.local.set({ data });
  }

  findRepo(id: string): Repo {
    const { repos } = this.state;

    if (!id) {
      return null;
    }

    return repos[id];
  }

  deleteRepo({ id }: Repo) {
    const repos = Object.assign(this.state.repos, {});

    delete repos[id];

    this.setState({ repos });

    const data = { repos } as any;
    browser.storage.local.set({ data });
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
          updateRepo: this.updateRepo,
          findRepo: this.findRepo
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
