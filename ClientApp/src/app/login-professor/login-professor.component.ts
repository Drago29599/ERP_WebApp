import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login-model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-professor',
  templateUrl: './login-professor.component.html',
  styleUrls: ['./login-professor.component.css']
})
export class LoginProfessorComponent {

  model: LoginModel = {
    UserName: '',
    Password: ''
  };

  constructor(private service: LoginService, private router: Router, private cookieServices: CookieService) {

  }
  onLogin() {
    this.service.login(this.model).subscribe(
      (response) => {

        //set auth cookie
        this.cookieServices.set('Authorization', `Bearer ${response.jwtToken}`, undefined, '/', undefined, true, 'Strict');

        //set user in local storage
        this.service.setUser({
          userId: response.userId,
          userName: response.userName
        });

        //set token expiration time 
        this.service.setTokenExpirationToken();

        this.router.navigate(['home/admin-dashboard']);
      },
      (error) => {
        console.log('Login failed', error);
      }
    );
  }
}
