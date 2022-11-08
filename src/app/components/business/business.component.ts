import { Component, OnInit } from '@angular/core';
import { Business } from '../../interfaces/business';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.scss']
})
export class BusinessComponent implements OnInit {
  business :Business= {};
  public photo: File = null;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }
  handleForm(){

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
