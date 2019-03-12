import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user-model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/header/header.component';


@Component({
  providers: [HeaderComponent],
  selector: 'app-user-signin',
  templateUrl: './user-signin.component.html',
  styleUrls: ['./user-signin.component.css']
})
export class UserSigninComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private header: HeaderComponent) {}
  ngOnInit() {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
  loginUser(form: NgForm) {
    const user = {
      mobile: form.value.mobile,
      pwd: form.value.pwd,
    };
    this.userService.loginUser(user);
    this.router.navigate(['/']);
  }

}
