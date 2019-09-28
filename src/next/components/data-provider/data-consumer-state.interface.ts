import { Data } from "../../../common/interfaces/data.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

export interface DataConsumerState extends Data {
  updateRepo(repo: Repo): void;
  deleteRepo(repo: Repo): void;
  createRepo(repo: Partial<Repo>): Promise<Repo>;
  findRepo(id: string): Repo;
  updateFooter(footer: string): void;
  resetStorage(footer: string): Promise<void>;
  loaded: boolean;
  footer: string;
}
