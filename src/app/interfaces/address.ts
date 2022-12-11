import { Client } from './client';
export interface Address {
    id_address?:string,
    address?:string,
    city?:string,
    latitude?:string,
    longitude?:string,
    number?:string,
    reference?:string,
    street?:string,
    cliente:Client

}
