import React, { Component } from "react";
import { autoBind } from "react-extras";
import { ulid } from "ulid";

import { Data } from "../../../common/interfaces/data.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

interface DataProviderProps {
  children: JSX.Element | JSX.Element[];
}

const DataContext = React.createContext({
  repos: {},
  createRepo: async (_repo: Partial<Repo>) => null,
  deleteRepo: (_repo: Repo) => null,
  findRepo: (_id: string) => null,
  updateRepo: (_repo: Repo) => null,
  loaded: false
});

class DataProvider extends Component<DataProviderProps, Data> {
  constructor(props) {
    super(props);

    autoBind(this);

    this.state = {
      repos: {},
      loaded: false
    };
  }

  async componentDidMount() {
    const { data } = ((await browser.storage.local.get("data")) as unknown) as {
      data: Data;
    };

    if (!data) {
      await browser.storage.local.set({
        data: {
          repos: {}
        }
      });

      return this.setState({ loaded: true });
    }

    this.setState({ ...data, loaded: true });
  }

  updateRepo(repo: Repo) {
    const repos = Object.assign(this.state.repos, { [repo.id]: repo });

    this.setState({ repos });

    const data = { repos } as any;
    browser.storage.local.set({ data });
  }

  async createRepo(repo: Partial<Repo>): Promise<Repo> {
    const id = ulid();
    repo.id = id;

    const repos = Object.assign(this.state.repos, {
      [id]: repo
    });

    this.setState({ repos });

    const data = { repos } as any;
    await browser.storage.local.set({ data });

    return repo as Repo;
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
    const { repos, loaded } = this.state;

    return (
      <DataContext.Provider
        value={{
          repos,
          createRepo: this.createRepo,
          deleteRepo: this.deleteRepo,
          updateRepo: this.updateRepo,
          findRepo: this.findRepo,
          loaded
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
