import { Data, Settings } from "../../../common/interfaces/data.interface";
import { Pipeline } from "../../../common/interfaces/pipeline.interface";
import { Repo } from "../../../common/interfaces/repo.interface";

export interface DataConsumerState extends Data {
  updatePipeline(pipeline: Pipeline): void;
  deletePipeline(pipeline: Pipeline): void;
  createPipeline(pipeline: Partial<Pipeline>): Pipeline;
  findPipeline(id: string): Pipeline;
  resetStorage(footer: string): Promise<void>;
  loaded: boolean;
}
