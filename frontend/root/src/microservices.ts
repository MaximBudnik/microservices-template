/*  This file is auto-generated */
import {Microservice} from "./components/LazyService/types";
import {config} from "./config";

export let microservices:{[key:string]:Microservice} = {

}

export const setMicroservices = ()=>{
    microservices = {
        service: {
            url: config.microservices.service.url,
            scope: 'service',
            module: './Service',
        },
    }
}
