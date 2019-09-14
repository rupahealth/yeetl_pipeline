import { Data } from "./data.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

export interface DataConsumerState extends Data {
  updateRepo(repo: Repo): void;
  deleteRepo(repo: Repo): void;
  createRepo(repo: Repo): void;
  findRepo(id: string): Repo;
}
