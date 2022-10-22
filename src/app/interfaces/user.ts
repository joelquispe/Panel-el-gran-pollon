import { Rol } from './rol';
export interface User {
    id?:string;
    username?:string;
    password?:string;
    rol?:Rol;
}
