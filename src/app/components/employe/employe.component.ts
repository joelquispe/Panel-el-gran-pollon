import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Employe } from '../../interfaces/employe';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss'],
})
export class EmployeComponent implements OnInit {
  employees: Employe[] = [];

  isloading = false;
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }
  async getData() {
    var resp = await this.api.getData('/api/employe/listar');

    if (resp.data.length > 0) {
      this.employees = [];
      console.log("===============data get=====")
      console.log(resp.data)
      resp.data.forEach((element: any) => {
        this.employees.push({
          id: element.id,
          name: element.name,
          lastname: element.lastname,
          email: element.email,
          phone: element.phone,
          dni: element.dni,
          dateOfBirth: element.dateOfBirth,
        } as Employe);
      });
    }else{
      this.employees = [];
    }
    console.log(this.employees);
  }
  async delete(id: number){

    this.isloading = true;
    if(confirm("Esta seguro de eliminar")){
      this.api.deleteData("/api/employe/borrar/",id).then((resp)=>{
        alert("borrado con exito")
        this.api.showSuccess("Eliminar empleado")
        this.getData();
      }).catch(e=>{
        this.api.showError("Eliminar empleado")
      })
    }
    
    this.isloading = false;
    
  }
}
