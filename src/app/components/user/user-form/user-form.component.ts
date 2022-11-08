import { Component, OnInit } from '@angular/core';
import { Rol } from '../../../interfaces/rol';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  rols: Rol[] = [];
  user: User = {};
  id: string | null;
  title = 'Crear usuario';
  nameV = false;
  constructor(
    private api: ApiService,

    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDataRol();
    if (this.id != null) {
      this.title = 'Editar usuario';
      this.getData();
    }
  }
  async getData() {
    this.api
      .getDataById('/api/user/buscar/', this.id)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        if (e.response.data != null) {
          this.user = e.response.data;
          console.log(this.user);
        }
      });
  }
  async getDataRol() {
    var resp = await this.api.getData('/api/rol/listar');

    console.log(resp.data);
    if (resp.data.length > 0) {
      this.rols = [];
      resp.data.forEach((element: any) => {
        this.rols.push({
          id: element.id,
          name: element.name,
        } as Rol);
      });
    }
  }
  async handleForm() {
    console.log(this.user);
    if (this.id != null) {
      this.edit();
    } else {
      this.save();
    }
  }
  async save() {
    this.api
      .saveData('/api/user/registrar', this.user)
      .then((resp) => {
        this.api.showSuccess('Usuario');
        this.router.navigate(['/usuarios']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Usuario');
        console.log(e);
      });
  }
  async edit() {
    this.api
      .editData('/api/user/editar/', this.id, this.user)
      .then((resp) => {
        this.api.showSuccess('Editar usuario');
        this.router.navigate(['/usuarios']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Editar usuario');
        console.log(e);
      });
  }
}
