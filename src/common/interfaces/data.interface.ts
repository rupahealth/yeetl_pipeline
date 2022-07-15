import { Pipeline } from "./pipeline.interface";
import { Repo } from "./repo.interface";

export interface Data {
  pipelines: Pipeline[];
}

export interface Settings {
  keyboard: {
    enabled: boolean;
  };
}
