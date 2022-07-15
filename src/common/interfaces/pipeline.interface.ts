interface PipelineExtractConfig {
  from: number;
  to: string;
}

interface PipelineConfig {
  table: string;
  extractConfig: PipelineExtractConfig[];
}

export interface Pipeline {
  name: string;
  configuration: PipelineConfig;
}
