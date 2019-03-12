import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  providers: [HeaderComponent],
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  constructor(private productService: ProductService, private router: Router, private header: HeaderComponent,
    private userService: UserService) {}
  products: [] = [];
  private productsSub: Subscription;
  numbers: [number, number, number, number, number, number, number, number, number, number] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit() {
    if (this.userService.getUser().type === 'admin') {
      this.router.navigate(['/dashboard']);
    }
    if (this.userService.getUser().type === 'delivery') {
      this.router.navigate(['/driver_dashboard']);
    }
    this.productService.getProducts();
    this.productsSub = this.productService.getProductsUpdateListener().subscribe((productData) => {
      this.products = productData.products;
    });
    this.header.ngOnInit();
  }
  addToCart(product_id: string, quantity: number) {
    const cart: Array<{}> = Array<{}>();
    let temp: String;
    if (localStorage.getItem('cart') != null) {
      temp = localStorage.getItem('cart');
      temp = JSON.parse((temp as string));
      cart.push(temp[0]);
      cart.push({product_id: product_id, quantity: quantity});
      const final = JSON.stringify(cart);
      localStorage.removeItem('cart');
      localStorage.setItem('cart', final);
    } else {
      cart.push({product_id: product_id, quantity: quantity});
      const final = JSON.stringify(cart);
      localStorage.setItem('cart', final);
    }
  }

  ngOnDestroy() {
    this.productsSub.unsubscribe();
  }
}
