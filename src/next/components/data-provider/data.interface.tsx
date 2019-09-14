import { Repo } from "../../../common/interfaces/repo.interface";

export interface Data {
  repos: { [id: string]: Repo };
  loaded: boolean;
}
