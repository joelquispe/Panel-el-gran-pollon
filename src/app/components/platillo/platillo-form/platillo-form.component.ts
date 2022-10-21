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

  plate: Plate = { status: 'true' };
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
    console.log('/api/plates/buscar/' + this.id.toString());
    await axios
      .get('/api/plates/buscar/' + this.id.toString(), {
        headers: {
          'Access-Control-Allow-Origin ': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        if (e.response.data != null) {
          this.plate = e.response.data;
          console.log(this.plate.category);
        }
      });
  }

  async getDataCategories() {
    var resp = await axios.get('/api/category/listar', {
      headers: {
        'Access-Control-Allow-Origin ': '*',
        'Content-Type': 'application/json',
      },
    });
    console.log(resp.data);
    if (resp.data.length > 0) {
      resp.data.forEach((element: any) => {
        this.categories.push({
          id: element.id,
          name: element.name,
        } as Category);
      });
    }
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
      this.plate.price != '' &&
      this.plate.status != '' &&
      this.plate.category != null &&
      this.plate.stock != null
    ) {
      await this.uploadPhoto();
      axios
        .post('/api/plates/registrar', this.plate, {
          headers: {
            'Access-Control-Allow-Origin ': '*',
            'Content-Type': 'application/json',
          },
        })
        .then((resp) => {
          this.showSuccess("Crear platillo");
          this.router.navigate(['/platillos']);
          console.log(resp);
        })
        .catch((e) => {
          this.showError("Crear platillo");
          console.log(e);
        });
    }
  }
  async edit() {
    this.nameV = true;

    axios
      .put('/api/plates/editar/' + this.id, this.plate, {
        headers: {
          'Access-Control-Allow-Origin ': '*',
          'Content-Type': 'application/json',
        },
      })
      .then((resp) => {
        this.showSuccess("Editar platillo");

        this.router.navigate(['/platillos']);

        console.log(resp);
      })
      .catch((e) => {
        this.showError("Editar platillo");
        console.log(e);
      });
  }

  showSuccess(title:string) {
    this.toastr.success(title, 'Fue un exito');
  }
  showError(title:string) {
    this.toastr.error(title, 'Sucedio un error');
  }

  
}
