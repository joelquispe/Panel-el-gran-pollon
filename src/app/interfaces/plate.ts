import { Category } from './category';
export interface Plate {
    id?:number,
    name?:string,
    description?:string,
    price?:string,
    status?:string,
    stock?:string,
    image?:string,
    category?:Category;
}
