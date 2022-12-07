import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { Motorized } from '../../../interfaces/motorized';
import { Motorizedstatus } from '../../../interfaces/motorizedstatus';

@Component({
  selector: 'app-motorized-form',
  templateUrl: './motorized-form.component.html',
  styleUrls: ['./motorized-form.component.scss'],
})
export class MotorizedFormComponent implements OnInit {
  
  motoStatus: Motorizedstatus[] = [];
  motorized: Motorized = {motorizedStatus:{id:1}};
  
  id: string | null;
  title = 'Crear motorizado';
  constructor(
    private api: ApiService,

    private router: Router,
    private aRouter: ActivatedRoute
  ) {
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.getDataStatus();
    if (this.id != null) {
      this.title = 'Editar motorizado';
      this.getData();
    }
  }
  async getData() {
    this.api
      .getDataById('/api/motorized/buscar/', this.id)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        if (e.response.data != null) {
          this.motorized = e.response.data;
        }
      });
  }

  async handleForm() {
    console.log(this.motorized.motorizedStatus.id)
    if (this.id != null) {
      this.edit();
    } else {
      console.log(this.motorized)
      this.save();
    }
  }
  async save() {
    this.api
      .saveData('/api/motorized/registrar', this.motorized)
      .then((resp) => {
        this.api.showSuccess('Crear motorizado');
        this.router.navigate(['/motorizados']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Crear motorizado');
        console.log(e);
      });
  }
  async edit() {
    this.api
      .editData('/api/motorizados/editar/', this.id, this.motorized)
      .then((resp) => {
        this.api.showSuccess('Editar motorizado');
        this.router.navigate(['/motorizados']);
        console.log(resp);
      })
      .catch((e) => {
        this.api.showError('Editar motorizado');
        console.log(e);
      });
  }
  async getDataStatus(){
    var resp = await this.api.getData("/api/motorizedStatus/listar");
    console.log(resp)
    if(resp.data.length > 0) {
      resp.data.forEach((element:any)=>{
        this.motoStatus.push({
          id: element.id,
          name: element.name
        } as Motorizedstatus);
      })
    }
    this.motorized.motorizedStatus = this.motoStatus[0];
  }
  
}
