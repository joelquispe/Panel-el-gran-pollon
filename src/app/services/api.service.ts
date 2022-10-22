import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Plate } from '../interfaces/plate';
import { Category } from '../interfaces/category';
import axios from 'axios';
import { ToastrService } from 'ngx-toastr';

type DataInput = Plate | Category | Object;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private toastr: ToastrService,
    private storage: AngularFireStorage
  ) {}
  public fileRef(fileName: string) {
    return this.storage.ref(fileName);
  }
  async deleteFile(url: string) {
    this.storage.storage.refFromURL(url).delete();
  }

  public uploadFile(fileName: string, data: DataInput) {
    return this.storage.upload(fileName, data);
  }

  async deleteData(url: string, id: number) {
    return axios.delete(url + id, {
      headers: {
        'Access-Control-Allow-Origin ': '*',
        'Content-Type': 'application/json',
      },
    });
  }
  async getData(url: string) {
    return await axios.get(url, {
      headers: {
        'Access-Control-Allow-Origin ': '*',
        'Content-Type': 'application/json',
      },
    });
  }
  async getDataById(url: string, id: string) {
    return axios.get(url + id.toString(), {
      headers: {
        'Access-Control-Allow-Origin ': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  async saveData(url: string, data: DataInput) {
    return axios.post(url, data, {
      headers: {
        'Access-Control-Allow-Origin ': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  async editData(url: string, id: string, data: DataInput) {
    return axios.put(url + id, data, {
      headers: {
        'Access-Control-Allow-Origin ': '*',
        'Content-Type': 'application/json',
      },
    });
  }

  async login(url: string, data: DataInput,paramss:DataInput) {
    return axios.post(url, data, {
      params: paramss ,
      headers: {
        'Access-Control-Allow-Origin ': '*',
        'Content-Type': 'application/json',
      },
    });
  }
  //toast
  showError(title: string) {
    this.toastr.success(title, 'Sucedio un error');
  }

  showSuccess(title: string) {
    this.toastr.success(title, 'Fue un exito');
  }
}
