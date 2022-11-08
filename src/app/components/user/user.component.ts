import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: User[]=[];
  isLoading = false;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getData();
  }
  async getData() {
    var resp = await this.api.getData("/api/user/listar");
    
    console.log(resp.data);
    if (resp.data.length > 0) {
      this.users= [];
      resp.data.forEach((element: any) => {
        this.users.push({
          id: element.id,
          username: element.username,
          password: element.password,
          rol: element.rol
          
        } as User);
      });
    }else{
      this.users = [];
    }
  }

  async delete(id: number){

    this.isLoading = true;
    if(confirm("Esta seguro de eliminar")){
      this.api.deleteData("/api/user/borrar/",id).then((resp)=>{
        alert("borrado con exito")
        this.api.showSuccess("Eliminar usuario")
        this.getData();
      }).catch(e=>{
        this.api.showError("Eliminar usuario")
      })
    }
    
    this.isLoading = false;
    
  }
}
