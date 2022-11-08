import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from '../../../interfaces/category';
import { Plate } from '../../../interfaces/plate';
import { ApiService } from '../../../services/api.service';
import { ToastrService } from 'ngx-toastr';
declare let alertify: any;
@Component({
  selector: 'app-platillo-form',
  templateUrl: './platillo-form.component.html',
  styleUrls: ['./platillo-form.component.scss'],
})
export class PlatilloFormComponent implements OnInit {
  categories: Category[] = [];

  plate: Plate = { status: true };
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
    this.getDataCategories();
    if (this.id != null) {
      this.title = 'Editar platillo';
      this.getDataPlate();
    }
  }
  async getDataPlate() {
    this.api.getDataById("/api/plates/buscar/",this.id).then((resp)=>{
      
    }).catch(e=>{
      if (e.response.data != null) {
        this.plate = e.response.data;
        console.log(this.plate.category);
      }
    })
    
  }

  async getDataCategories() {
    var resp = await this.api.getData("/api/category/listar");
    
   
    if (resp.data.length > 0) {
      resp.data.forEach((element: any) => {
        this.categories.push({
          id: element.id,
          name: element.name,
          image: element.image
        } as Category);
      });
    }
  }

  changePhoto(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
     
    }
  }
  async uploadPhoto() {
    const photoName = new Date().toISOString();
    let ref = this.api.fileRef(photoName);
    let task = await this.api.uploadFile(photoName, this.photo);
    this.plate.image = await ref.getDownloadURL().toPromise();
  }
  
  async handleForm() {
    if (this.id != null) {
      if (this.photo != null) {
        console.log(this.plate.image)
        console.log("============================")
        await this.api.deleteFile(this.plate.image)
        await this.uploadPhoto();
        console.log(this.plate.image)
        
      }
      this.edit();
      
    } else {
      this.save();
    }
  }
  async save() {
    
    this.nameV = true;
    if (
      this.plate.name != '' &&
      this.plate.description != '' &&
      this.photo != null &&
      this.plate.price != null &&
      
      this.plate.category != null &&
      this.plate.stock != null
    ) {
      await this.uploadPhoto();
      
     
      this.api.saveData('/api/plates/registrar',this.plate).then((resp)=>{
             this.showSuccess("Crear platillo");
          this.router.navigate(['/platillos']);
          console.log(resp);
      }).catch(e=>{
     this.showError("Crear platillo");
          console.log(e);
      })

    }
  }
  async edit() {
    this.nameV = true;
    this.api.editData('/api/plates/editar/',this.id,this.plate).then((resp)=>{
      this.showSuccess("Editar platillo");
        this.router.navigate(['/platillos']);
        console.log(resp);
    }).catch(e=>{
      this.showError("Editar platillo");
      console.log(e);
    })
    
  }

  showSuccess(title:string) {
    this.toastr.success(title, 'Fue un exito');
  }
  showError(title:string) {
    this.toastr.error(title, 'Sucedio un error');
  }

  
}
