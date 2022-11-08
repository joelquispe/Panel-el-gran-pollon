import { Motorizedstatus } from './motorizedstatus';
export interface Motorized {
    id?:number;
    name?:string;
    lastname?:string;
    email?:string;
    password?:string;
    dni?:string;
    phone?:string;
    placa?:string;
    soat?:string;
    dateOfBirth?:string;
    motorizedStatus?:Motorizedstatus;
}
