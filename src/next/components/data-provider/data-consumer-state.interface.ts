import { Data } from "./data.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

export interface DataConsumerState extends Data {
  updateRepo(id: string, repo: Repo): void;
  deleteRepo(id: string): void;
  createRepo(repo: Repo): void;
  findRepo(id: string): Repo;
}
