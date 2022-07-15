interface PipelineExtractConfig {
  from: number;
  to: string;
}

interface PipelineConfig {
  table: string;
  extractConfig: PipelineExtractConfig[];
}

export interface Pipeline {
  id: string;
  name: string;
  configuration: PipelineConfig;
}
