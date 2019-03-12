import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Order } from '../orders/order-model';
import { UserService } from '../user/user.service';
@Injectable({ providedIn: 'root'})
export class OrderService {
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {}
  private ordersUpdated = new Subject<{orders: []}>();
  getOrders(type: string) {
    let document;
    this.httpClient.get<{error: string, document: any}>('http://localhost:3100/api/order?type=' + type).
    subscribe(responseData => {
      console.log(responseData);
      document = responseData.document;
      this.ordersUpdated.next({orders: ([...responseData.document] as [] )});
    });
    return document;
  }

  getOrdersUpdateListener() {
    return this.ordersUpdated.asObservable();
  }
}
