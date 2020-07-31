export interface BaseParameter {
  type: string;
  name: string;
  title: string;
}

export interface NumberParameter extends BaseParameter {
  type: 'number';
}

export interface SelectParameter extends BaseParameter {
  type: 'select';
  items: Array<{ value: string; title: string }>;
}

export type Parameters = Array<NumberParameter | SelectParameter>;

export interface WebService {
  name: string;
  title: string;
  description: string;
  parameters: {
    input: Parameters;
    output: any;
  };
  commands: {
    [commandName: string]: string;
  };
}

export interface ServerResponse {
  name: string;
  title: string;
  description: string;
  parameters: {
    input: Parameters;
    output: any;
  };
}

export interface FormData {
  [k: string]: string;
}
