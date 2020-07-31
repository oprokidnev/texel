import axios from 'axios';
import config from '../config';
import { WebService, FormData } from './interfaces';

export const getService = (): Promise<WebService> => {
  return axios.get<WebService>(`${config.getEndpoint()}/config`).then(res => res.data);
};

export const runService = (serviceData: FormData): Promise<any> => {
  return axios.post<any>(`${config.getEndpoint()}/run`, serviceData).then(res => res.data);
};
