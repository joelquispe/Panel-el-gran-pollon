import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  save(name:string,value:object){
    localStorage.setItem(name,JSON.stringify(value));
  }

  get(name:string){
    return JSON.parse(localStorage.getItem(name)) ;
  }
  remove(name:string){
    localStorage.removeItem(name);
  }
}
