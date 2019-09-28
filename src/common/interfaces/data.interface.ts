import { Repo } from "./repo.interface";

export interface Data {
  repos: { [id: string]: Repo };
  settings: Settings;
}

export interface Settings {
  keyboard: {
    enabled: boolean;
    shortcuts: string[];
  };
}
