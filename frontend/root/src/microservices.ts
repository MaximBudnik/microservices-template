import {Microservice} from "./components/LazyService/types";
import {config} from "./config";

export let microservices:{[key:string]:Microservice} = {

} as const

export const setMicroservices = ()=>{
    microservices = {
        service: {
            url: config.microservices.service.url,
            scope: 'service',
            module: './Service',
        },
    }
}
