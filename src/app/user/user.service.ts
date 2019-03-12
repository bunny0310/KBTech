import { User } from './user-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
@Injectable({ providedIn: 'root'})
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute) {}
  addUser(user: User) {
    this.httpClient.post<{error: string, userData: User}>('http://localhost:3100/api/user/', user).
    subscribe(responseData => {
      console.log(responseData);
    });
  }
  loginUser(user) {
    this.httpClient.post<{token: string}>('http://localhost:3100/api/user/login', user).
    subscribe(responseData => {
      console.log(responseData);
      localStorage.setItem('token', responseData.token);
    });
  }

  getUser() {
    const token = localStorage.getItem('token');
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
  isAuthenticated(): boolean {
    if (this.getUser()) {
      return true;
    } else {
      return false;
    }
  }
}
