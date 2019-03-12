import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean;
  number: number;
  flag: Boolean = false;
  type: string;
  constructor(private userService: UserService, private router: Router) {}
  reload() {
    window.location.reload();
  }
  ngOnInit() {
  this.loggedIn = this.userService.isAuthenticated();
  this.number = this.userService.getUser().mobile;
  this.type = this.userService.getUser().type;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
    location.reload();
  }
}
