import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Category } from '../../interfaces/category';
import { Plate } from '../../interfaces/plate';
@Component({
  selector: 'app-platillo',
  templateUrl: './platillo.component.html',
  styleUrls: ['./platillo.component.scss']
})
export class PlatilloComponent implements OnInit {

  
  plates :Plate[] = [];
  status="";
  isloading =false;
  constructor() { }

  ngOnInit(): void {
    
    this.getData();
  }

  

  async getData(){
    var resp = await axios.get("/api/plates/listar",{
      headers: {
        "Access-Control-Allow-Origin ":"*",
        'Content-Type': 'application/json',
      }
    });
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
    }
  }

  async delete(id:number){
    this.isloading = true;
    if(confirm("Esta seguro de eliminar")){
      await axios.delete("/api/plates/borrar/"+id,{
        headers: {
          "Access-Control-Allow-Origin ":"*",
          'Content-Type': 'application/json',
        }
      }).then((resp)=>{
        alert("borrado con exito")
        this.getData();
      })
    }
    
    this.isloading = false;
     
  }

  

}
