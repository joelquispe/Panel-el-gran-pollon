import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Plate } from '../interfaces/plate';
import { Category } from '../interfaces/category';

type DataInput = Plate | Category | Object;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private storage: AngularFireStorage) { }
  public fileRef(fileName: string) {
    return this.storage.ref(fileName);
  }
  async deleteFile(url:string){
    this.storage.storage.refFromURL(url).delete();
  }
  async deletePhoto(url:string){
    this.storage.ref(url).delete();
  }
  public uploadFile(fileName: string, data: DataInput) {
    return this.storage.upload(fileName, data);
  }
  
}
