import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';
import { ApiService } from '../../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];
  isloading =false;
  constructor( private api: ApiService,
   ) { }

  ngOnInit(): void {
    this.getData();
  }
  async getData() {
    var resp = await this.api.getData("/api/category/listar");
    
    console.log(resp.data);
    if (resp.data.length > 0) {
      this.categories= [];
      resp.data.forEach((element: any) => {
        this.categories.push({
          id: element.id,
          name: element.name,
          image: element.image
        } as Category);
      });
    }else{
      this.categories = [];
    }
  }

  async delete(id: number){

    this.isloading = true;
    if(confirm("Esta seguro de eliminar")){
      this.api.deleteData("/api/category/borrar/",id).then((resp)=>{
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
