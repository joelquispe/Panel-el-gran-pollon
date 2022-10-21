import { Component, OnInit } from '@angular/core';
import { Category } from '../../../interfaces/category';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  category: Category = {  };
  public photo: File = null;
  id: string | null;
  title = 'Crear platillo';
  //validation
  nameV = false;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDataCategory();
    if (this.id != null) {
      this.title = 'Editar platillo';
      this.getDataCategory();
    }
  }

  async getDataCategory() {
    this.api.getDataById("/api/category/buscar/",this.id).then((resp)=>{
      console.log(resp);
    }).catch(e=>{
      if (e.response.data != null) {
        this.category = e.response.data;
        console.log(this.category);
      }
    })
    
  }
  changePhoto(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      console.log(this.photo);
    }
  }
  async uploadPhoto() {
    const photoName = new Date().toISOString();
    let ref = this.api.fileRef(photoName);
    let task = await this.api.uploadFile(photoName, this.photo);
    this.category.image = await ref.getDownloadURL().toPromise();
  }
  async handleForm() {
    if (this.id != null) {
      if (this.photo != null) {
        console.log(this.category.image)
        console.log("============================")
        await this.api.deleteFile(this.category.image)
        await this.uploadPhoto();
        console.log(this.category.image)
       
      }
      
    } else {
      
    }
  }
}
