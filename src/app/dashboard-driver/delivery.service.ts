import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Order } from '../orders/order-model';
import { UserService } from '../user/user.service';
@Injectable({ providedIn: 'root'})
export class DeliveryService {
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {}
  private deliveryusersUpdated = new Subject<{deliveryusers: []}>();
  getDeliveries() {
    let document;
    this.httpClient.get<{error: string, document: any}>('http://localhost:3100/api/order/delivery').
    subscribe(responseData => {
      console.log(responseData);
      document = responseData.document;
      this.deliveryusersUpdated.next({deliveryusers: ([...responseData.document] as [] )});
    });
    return document;
  }

  updateDelivery(data: {}) {
    this.httpClient.post<{message: string}>('http://localhost:3100/api/order/delivery_update', data).subscribe(
      response => {
        console.log(response);
      }
    );
  }
  update_status(data: {}) {
    this.httpClient.post<{message: string}>('http://localhost:3100/api/order/status_update', data).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  getDeliveriesUpdateListener() {
    return this.deliveryusersUpdated.asObservable();
  }
}
