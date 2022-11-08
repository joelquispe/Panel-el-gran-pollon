import { Component, OnInit, ElementRef,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Business } from '../../interfaces/business';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('photo') imageHtml : ElementRef<HTMLElement>;
  business :Business= {};
  isEdit = false;
  id ="";
  public photo: File = null;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit(): void {
    this.getDataProfile();
  }
  handleForm(){
    if(this.isEdit){
      this.edit();
    }else{
      this.save()
    }
    
  }
  async edit() {
    await this.api.deleteFile(this.business.image)
    await this.uploadPhoto();
    this.api
      .editData('/api/business/editar/', this.business.id.toString(), this.business)
      .then((resp) => {
        this.api.showSuccess('Editar perfil');
        window.location.reload();
        this.router.navigate(['/perfil']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Editar perfil');
        console.log(e);
      });
  }
  async save() {
    await this.uploadPhoto();

    this.api
      .saveData('/api/business/registrar', this.business)
      .then((resp) => {
        this.api.showSuccess('Negocio');
        this.router.navigate(['/profile']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Categoria');
        console.log(e);
      });
  }
  async getDataProfile() {
    this.api
      .getData('/api/business/listar')
      .then((resp) => {
        console.log(resp);
        console.log(resp.data);
        if(resp.data != ""){
          this.business = resp.data[0];
          console.log(this.business)
          this.isEdit = true;
        }
        
      })
      .catch((e) => {
       
      });
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
    this.business.image = await ref.getDownloadURL().toPromise();
  }
}
