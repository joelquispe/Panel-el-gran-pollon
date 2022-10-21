import { Category } from './category';
export interface Plate {
    id?:number,
    name?:string,
    description?:string,
    price?:number,
    status?:boolean,
    stock?:number,
    image?:string,
    category?:Category;
}
