import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Client } from '../../interfaces/client';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customers:Client[]= []
  constructor() { }

  ngOnInit(): void {
    this.getData()
  }
  async getData(){
    var resp = await axios.get("/api/cliente/listar",{
      headers: {
        "Access-Control-Allow-Origin ":"*",
        'Content-Type': 'application/json',
      }
    });
    console.log(resp.data)
    if(resp.data.length > 0){
      resp.data.forEach((element: any) => {
        this.customers.push({
          id: element.id,
          name: element.name,
         
          phone: element.phone,
          email: element.email,
          dateofbirth: element.dateofbirth,
          password: element.password,
          lastname: element.lastname,
  
        } as Client);
       
      });
    }else{
      this.customers = [];
    }
   
  }
}
