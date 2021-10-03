import axios from 'axios';
import {setMicroservices} from "./microservices";

export const config = {
    microservices: {
        service: {
            url: '',
        },
    },
    init: (): Promise<void | Record<string, unknown>> =>
        axios.get('/environment.json').then(({data}) => {
            const remoteConfig = typeof data === 'string' ? JSON.parse(data) : data;
            config.microservices = {
                ...config.microservices,
                ...remoteConfig.microservices,
            };
        }).then(setMicroservices),
};
