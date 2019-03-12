import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { UserSigninComponent } from './user/user-signin/user-signin.component';
import { ProductComponent } from './products/products.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './orders/order-confirmation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDriverComponent } from './dashboard-driver/dashboard-driver.component';

const routes: Routes = [
                          {path: 'signup', component: UserSignupComponent},
                          {path: 'signin', component: UserSigninComponent},
                          {path: '', component: ProductComponent},
                          {path: 'checkout', component: CheckoutComponent},
                          {path: 'order_confirmed', component: OrderConfirmationComponent},
                          {path: 'dashboard', component: DashboardComponent},
                          {path: 'driver_dashboard', component: DashboardDriverComponent}
                       ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
