import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../orders/order-service';
import { DeliveryService } from './delivery.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private ordersSub: Subscription;
  private deliveriesSub: Subscription;
  orders: [] = [];
  types = ['Created', 'Reached', 'Picked', 'Enroute', 'Delivered', 'Canceled'];
  selectedType: string;
  delivery_users: [] = [];
  constructor(private orderService: OrderService, private deliveryService: DeliveryService, private userService: UserService,
    private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('token') == null || this.userService.getUser().type !== 'admin') {
      this.router.navigate(['/signin']);
    }
    this.orderService.getOrders(this.selectedType);
    this.deliveryService.getDeliveries();
    this.ordersSub = this.orderService.getOrdersUpdateListener().subscribe((orderData) => {
      this.orders = orderData.orders;
    });
    this.deliveriesSub = this.deliveryService.getDeliveriesUpdateListener().subscribe((delData) => {
      this.delivery_users = delData.deliveryusers;
    });
  }
  filter(q: string) {
    this.selectedType = q;
    this.ngOnInit();
  }
  assignDel(order_id: string, del_id: string) {
    const data = {
      token: localStorage.getItem('token'),
      type: this.userService.getUser().type,
      order_id: order_id,
      del_id: del_id
    };
    this.deliveryService.updateDelivery(data);
  }
  ngOnDestroy() {
    this.ordersSub.unsubscribe();
    this.deliveriesSub.unsubscribe();
  }
}
