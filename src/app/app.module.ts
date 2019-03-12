import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatInputModule, MatCardModule, MatButtonModule,
MatToolbarModule, MatExpansionModule, MatProgressSpinnerModule, MatPaginatorModule, MatSelectModule
} from '@angular/material';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSignupComponent } from './user/user-signup/user-signup.component';
import { HeaderComponent } from './header/header.component';
import { UserSigninComponent } from './user/user-signin/user-signin.component';
import { ProductComponent } from './products/products.component';
import { OrderConfirmationComponent } from './orders/order-confirmation.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDriverComponent } from './dashboard-driver/dashboard-driver.component';
// import { SigninInterceptor } from './user/signin-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserSignupComponent,
    HeaderComponent,
    UserSigninComponent,
    ProductComponent,
    OrderConfirmationComponent,
    CheckoutComponent,
    DashboardComponent,
    DashboardDriverComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
