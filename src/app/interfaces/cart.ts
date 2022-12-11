import { Client } from './client';
export interface Cart {
    id?: number,
    total?:string,
    isInOrder?:boolean,
    cliente:Client
}
