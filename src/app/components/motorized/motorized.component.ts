import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Motorized } from '../../interfaces/motorized';
import { Motorizedstatus } from '../../interfaces/motorizedstatus';

@Component({
  selector: 'app-motorized',
  templateUrl: './motorized.component.html',
  styleUrls: ['./motorized.component.scss']
})
export class MotorizedComponent implements OnInit {
  motorizeds: Motorized[] = [];
 
  isloading =false;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getData();
    
  }
  async getData() {
    var resp = await this.api.getData("/api/motorized/listar");
    
    
    if (resp.data.length > 0) {
      this.motorizeds= [];
      resp.data.forEach((element: any) => {
        this.motorizeds.push({
          id: element.id,
          name: element.name,
          lastname : element.lastname,
          email : element.email,
          password : element.password,
          phone: element.phone,
          dni: element.dni,
          placa: element.placa,
          soat: element.soat,
          dateOfBirth: element.dateOfBirth,
          motorizedStatus: element.motorizedStatus
        } as Motorized);
      });
    }else{
      this.motorizeds = [];
    }
    console.log("data")
    console.log(this.motorizeds);
  }
 
  async delete(id: number){

    this.isloading = true;
    if(confirm("Esta seguro de eliminar")){
      this.api.deleteData("/api/motorized/borrar/",id).then((resp)=>{
        alert("borrado con exito")
        this.api.showSuccess("Eliminar motorizado")
        this.getData();
      }).catch(e=>{
        this.api.showError("Eliminar motorizado")
      })
    }
    
    this.isloading = false;
    
  }

}
