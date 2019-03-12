import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user-model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {}
  ngOnInit() {
    if (this.userService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }
  createUser(form: NgForm) {
    const user: User = {
      _id: null,
      name: form.value.name,
      mobile: form.value.mobile,
      pwd: form.value.pwd,
      type: 'user'
    };
    this.userService.addUser(user);
  }

}
