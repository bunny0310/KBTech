import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Subscription } from 'rxjs';
import { OrderService } from '../orders/order-service';
import { DeliveryService } from './delivery.service';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-driver',
  templateUrl: './dashboard-driver.component.html',
  styleUrls: ['./dashboard-driver.component.css']
})
export class DashboardDriverComponent implements OnInit, OnDestroy {
  private ordersSub: Subscription;
  orders: [] = [];
  statuses = ['Created', 'Reached', 'Picked', 'Enroute', 'Delivered', 'Canceled'];
  selectedType: string;
  constructor(private orderService: OrderService, private deliveryService: DeliveryService, private userService: UserService,
    private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('token') == null || this.userService.getUser().type !== 'delivery') {
      this.router.navigate(['/signin']);
    }
    this.orderService.getOrders(this.selectedType);
    this.ordersSub = this.orderService.getOrdersUpdateListener().subscribe((orderData) => {
      this.orders = orderData.orders;
    });
  }
  updateStatus(order_id: string, status: string) {
    const data = {
      token: localStorage.getItem('token'),
      type: this.userService.getUser().type,
      order_id: order_id,
      status: status
    };
    this.deliveryService.update_status(data);
  }
  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }
}
