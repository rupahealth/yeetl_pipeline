interface PipelineTransformations {
  from: number;
  to: string;
  match_on: boolean
}

export interface Pipeline {
  id: string;
  name: string;
  model: string;
  table: string;
  transformations: PipelineTransformations[];
}
