import { IActivity } from '../models/IActivity';
import axios, { AxiosResponse } from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/api';

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
    new Promise<AxiosResponse>(resolve => setTimeout(() => resolve(response), ms));

const request = {
    delete: (url: string) => axios.delete(url).then(sleep(2000)).then(responseBody),
    get: (url: string) => axios.get(url).then(sleep(2000)).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(sleep(2000)).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(sleep(2000)).then(responseBody),
};

const activitiesBaseUrl = '/activities';

const Activities = {
    create: (activity: IActivity) => request.post(activitiesBaseUrl, activity),
    delete: (id: string) => request.delete(`${activitiesBaseUrl}/${id}`),
    details: (id: string): Promise<IActivity> => request.get(`${activitiesBaseUrl}/${id}`),
    list: (): Promise<IActivity[]> => request.get(activitiesBaseUrl),
    update: (activity: IActivity) => request.put(`${activitiesBaseUrl}/${activity.id}`, activity),
};

export default { Activities };