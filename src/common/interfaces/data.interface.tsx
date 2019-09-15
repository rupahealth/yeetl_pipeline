import { Repo } from "./repo.interface";

export interface Data {
  repos: { [id: string]: Repo };
  loaded: boolean;
}
