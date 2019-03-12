import { Component } from '@angular/core';
import { ProductService } from '../products/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  constructor(private productService: ProductService, private router: Router) {}
  cart = JSON.parse(localStorage.getItem('cart'));
  checkout() {
    this.productService.createOrder(this.cart);
    localStorage.removeItem('cart');
    this.router.navigate(['/order_confirmed']);
  }
}
