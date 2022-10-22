import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { User } from '../../../interfaces/user';
import { LocalStorageService } from '../../../services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:User ={}
  username ="";
  password ="";
  constructor(private api:ApiService,private route:Router,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
      this.verifyUser();
  }
  verifyUser(){
    const user =this.localStorage.get("user");
    console.log(user)
    if(user != null){
      this.route.navigate(["/"])
    }
  }
  login(){
    this.api.login("/api/user/buscar",{},{
      username: this.username,
      password: this.password
    }).then((resp)=>{
      console.log(resp);
    }).catch(e=>{
      console.log(e);
      const user = e.response.data;
     
      if(user != null){
        this.localStorage.save("user",user);
        this.route.navigate(["/"])
      }
    })
  }
}
