import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Category } from '../../interfaces/category';
import { Plate } from '../../interfaces/plate';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.scss']
})
export class PlatilloComponent implements OnInit {

  
  plates :Plate[] = [];
  status="";
  isloading =false;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    
    this.getData();
  }

  async getData(){
    var resp = await this.api.getData("/api/plates/listar");
    console.log(resp.data)
    this.plates = [];
    if(resp.data.length > 0){
      resp.data.forEach((element: any) => {
        this.plates.push({
          id: element.id,
          name: element.name,
          description: element.description,
          price: element.price,
          category : element.category,
          stock: element.stock,
          status: element.status,
          image: element.image

        } as Plate);
        
      });
    }else{
      this.plates = [];
    }
  }

  async delete(id: number){
    this.isloading = true;
    if(confirm("Esta seguro de eliminar")){
      this.api.deleteData("/api/plates/borrar/",id).then((resp)=>{
        alert("borrado con exito")
        this.api.showSuccess("Eliminar plato")
        this.getData();
      }).catch(e=>{
        this.api.showError("Eliminar plato")
      })
    }
    
    this.isloading = false;
    
  }

  

}
