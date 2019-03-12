import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Order } from '../orders/order-model';
import { UserService } from '../user/user.service';
@Injectable({ providedIn: 'root'})
export class ProductService {
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private userService: UserService) {}
  private productsUpdated = new Subject<{products: []}>();
  getProducts() {
    let document;
    this.httpClient.get<{error: string, document: any}>('http://localhost:3100/api/product/').
    subscribe(responseData => {
      console.log(responseData);
      document = responseData.document;
      this.productsUpdated.next({products: ([...responseData.document] as [] )});
    });
    return document;
  }

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

  createOrder(items: Array<{}>) {
    const order: Order = {
      _id: null,
      products: items,
      delivery_person_id: null,
      order_stage: 'Task Created',
      user_id: this.userService.getUser()._id,
      pickup_locations: null
    };
    const ord = {order: order, token: localStorage.getItem('token')};
    this.httpClient.post<{error: string, message: string}>('http://localhost:3100/api/order/', ord).
    subscribe(responseData => {
      console.log(responseData);
    });
  }
}
