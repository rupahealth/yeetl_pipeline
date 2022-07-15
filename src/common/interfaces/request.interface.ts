interface RequestDataObj {
  Patient: string;
  Received: string;
  Status: string;
}

interface RequestDataTransformations {
  from: string;
  to: string;
  match_on: boolean;
}

export interface RequestData {
  data: RequestDataObj[];
  model: string;
  transformations: RequestDataTransformations[];
}
