/*  This file is auto-generated */
import {Microservice} from "./components/LazyService/types";
import {config} from "./config";

export const microservices:{[key:string]:Microservice} = {
    service: {
        url: config.microservices.service.url,
        scope: 'service',
        module: './Service',
    },
}
