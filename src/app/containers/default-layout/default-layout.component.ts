import { Component, OnInit } from '@angular/core';

import { navItems } from './_nav';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent  implements OnInit{

  public navItems = navItems;
  user :User = {};
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private localStorage:LocalStorageService) {

  }
  ngOnInit(): void {  
    const user = this.localStorage.get('user');
    console.log(user)
    this.user = this.localStorage.get("user");
  }

  

}
