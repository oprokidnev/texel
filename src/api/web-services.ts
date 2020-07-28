import axios from 'axios';
import config from '../config';

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
}

export const getServices = (): Promise<WebService[]> => {
  return axios
    .get<WebService[]>(`${config.getEndpoint()}/web-services`)
    .then((res) => res.data);
};
