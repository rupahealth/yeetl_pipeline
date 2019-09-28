import React, { Component } from "react";
import { autoBind } from "react-extras";
import { ulid } from "ulid";

import { Data, Settings } from "../../../common/interfaces/data.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

interface DataProviderProps {
  children: JSX.Element | JSX.Element[];
}

interface DataProviderState extends Data {
  loaded: boolean;
  footer: string;
}

const DEFAULT_STATE = {
  repos: {},
  settings: {
    keyboard: {
      enabled: false,
      shortcuts: ["⌘", "⇧ Shift", "G"]
    }
  },
  loaded: false,
  footer: null
};

const DataContext = React.createContext({
  createRepo: async (_repo: Partial<Repo>) => null,
  deleteRepo: (_repo: Repo) => null,
  findRepo: (_id: string) => null,
  updateRepo: (_repo: Repo) => null,
  updateFooter: (_footer: string) => null,
  resetStorage: () => null,
  updateSettings: (_settings: Settings) => null,
  ...DEFAULT_STATE
});

class DataProvider extends Component<DataProviderProps, DataProviderState> {
  constructor(props) {
    super(props);

    autoBind(this);

    this.state = DEFAULT_STATE;
  }

  async componentDidMount() {
    const { data } = ((await browser.storage.local.get("data")) as unknown) as {
      data: Data;
    };

    if (!data) {
      await browser.storage.local.set({
        data: DEFAULT_STATE
      });

      return this.setState({ loaded: true });
    }

    this.setState({ ...data, loaded: true });
  }

  updateRepo(repo: Repo) {
    const { settings } = this.state;
    const repos = Object.assign(this.state.repos, { [repo.id]: repo });

    this.setState({ repos });

    const data = { repos, settings } as any;
    browser.storage.local.set({ data });
  }

  async createRepo(repo: Partial<Repo>): Promise<Repo> {
    const { settings } = this.state;
    const id = ulid();
    repo.id = id;

    const repos = Object.assign(this.state.repos, {
      [id]: repo
    });

    this.setState({ repos });

    const data = { repos, settings } as any;
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
    const { settings } = this.state;
    const repos = Object.assign(this.state.repos, {});

    delete repos[id];

    this.setState({ repos });

    const data = { repos, settings } as any;
    browser.storage.local.set({ data });
  }

  updateFooter(footer: string) {
    this.setState({ footer });
  }

  async resetStorage() {
    await browser.storage.local.set({
      data: DEFAULT_STATE
    });

    return this.setState({ repos: {} });
  }

  async updateSettings(settings: Settings) {
    const { repos } = this.state;

    this.setState({ settings });

    const data = { repos, settings } as any;
    await browser.storage.local.set({ data });
  }

  render() {
    const { children } = this.props;
    const { repos, loaded, footer, settings } = this.state;

    return (
      <DataContext.Provider
        value={{
          settings,
          repos,
          createRepo: this.createRepo,
          deleteRepo: this.deleteRepo,
          updateRepo: this.updateRepo,
          findRepo: this.findRepo,
          updateFooter: this.updateFooter,
          resetStorage: this.resetStorage,
          updateSettings: this.updateSettings,
          loaded,
          footer
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

const DataConsumer = DataContext.Consumer;

export { DataProvider, DataConsumer, DataContext };
