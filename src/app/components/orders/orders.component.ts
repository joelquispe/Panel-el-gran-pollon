import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Order } from '../../interfaces/order';
import { Address } from '../../interfaces/address';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.getData()
  } 
  changeState(){
    this.api.notificationSend("mi mensaje de angular",'dmlxpiw5QUCatywCbK4loM:APA91bHddMXzk2uE3lhYUPajs1kWF-0NQtFgS6u1vcNIYcdhSWWqN-OHnDoC35eHNCfAjqbzjnJpjgEXq3OVrQzF4_SaQ8vNZ7iaQIzGzlowthp3k5CQ_UW3ThNqHNk713AauopkRuv_' );

  }
  async getData(){
    var resp = await this.api.getData("/api/order/listar");
    console.log(resp.data)
    console.log("data")
    this.orders = [];
    if(resp.data.length > 0){
      resp.data.forEach((element: any) => {
        this.orders.push({
          address:element.address,
          cart:element.cart,
          cliente:element.cliente,
          status: element.status,
          orderDate: element.orderDate,
          total: element.total,
          id: element.id,

        } as Order);
        
      });
    }else{
      this.orders = [];
    }
  }
}
