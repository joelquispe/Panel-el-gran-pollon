import { Component, OnInit } from '@angular/core';
import { stateOrder } from '../../../enums/stateOrder';
import { ApiService } from '../../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../../interfaces/order';

@Component({
  selector: 'app-change-state',
  templateUrl: './change-state.component.html',
  styleUrls: ['./change-state.component.scss']
})
export class ChangeStateComponent implements OnInit {
  public state:stateOrder;
  id: string | null;
  order:Order
  stateds=[stateOrder.confirm,stateOrder.preparing,stateOrder.packing,stateOrder.comingOut,stateOrder.cancel]
  constructor(private api:ApiService, private router: Router,
    private aRouter: ActivatedRoute) {
      this.id = this.aRouter.snapshot.paramMap.get('id');
     }

  ngOnInit(): void {
    this.getDataCategory()
  }
  async getDataCategory() {
    this.api
      .getDataById('/api/order/buscar/', this.id)
      .then((resp) => {
        console.log(resp);
      })
      .catch((e) => {
        if (e.response.data != null) {
          this.order = e.response.data;
          console.log(this.order);
        }
      });
  }

  async edit() {
   console.log(this.order.status)
    this.api
      .editData('/api/order/editar/', this.id, this.order)
      .then((resp) => {
        this.api.showSuccess('se cambio el estado');
        this.router.navigate(['/ordenes']);
        this.api.notificationSend("Tu pedido esta en: "+this.order.status,this.order.cliente.fcmtoken)
       
      })
      .catch((e) => {
        this.api.showError('Editar orden');
        console.log(e);
      });
  }
}
