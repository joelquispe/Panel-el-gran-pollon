import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Employe } from '../../../interfaces/employe';

@Component({
  selector: 'app-employe-form',
  templateUrl: './employe-form.component.html',
  styleUrls: ['./employe-form.component.scss']
})
export class EmployeFormComponent implements OnInit {
  
 
 employe: Employe = {};
  
  id: string | null;
  title = 'Crear empleado';
  constructor(
    private api: ApiService,

    private router: Router,
    private aRouter: ActivatedRoute
  ) { 
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    
    if (this.id != null) {
      this.title = 'Editar empleado';
      this.getData();
    }
  }
  async getData() {
    this.api
      .getDataById('/api/employe/buscar/', this.id)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        if (e.response.data != null) {
          this.employe = e.response.data;
        }
      });
  }

  async handleForm() {
    console.log(this.employe);
    if (this.id != null) {
      this.edit();
    } else {
      console.log(this.employe)
      this.save();
    }
  }
  async save() {
    this.api
      .saveData('/api/employe/registrar', this.employe)
      .then((resp) => {
        this.api.showSuccess('Crear empleado');
        this.router.navigate(['/empleados']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Crear empleado');
        console.log(e);
      });
  }
  async edit() {
    this.api
      .editData('/api/employe/editar/', this.id, this.employe)
      .then((resp) => {
        this.api.showSuccess('Editar empleado');
        this.router.navigate(['/empleados']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Editar empleado');
        console.log(e);
      });
  }
 

}
