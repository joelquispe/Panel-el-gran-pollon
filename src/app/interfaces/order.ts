import { Address } from './address';
import { Client } from './client';
import { Cart } from './cart';
export interface Order {
    id?:number,
    orderDate?:string,
    total?:string,
    status?:boolean,
    address?:Address,
    cliente?:Client,
    cart?:Cart


}
