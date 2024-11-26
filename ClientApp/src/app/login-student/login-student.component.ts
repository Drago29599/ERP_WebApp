import { Component } from '@angular/core';
import { LoginModel } from '../models/login-model';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AutoLogoutService } from '../auto-logout.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent {
  model: LoginModel = {
    UserName: '',
    Password: ''
  };

  constructor(private service: LoginService, private router: Router, private cookieServices: CookieService,
    private autoLogoutService: AutoLogoutService  // Inject AutoLogoutService
  ) {
    
  }

  validateAssociate() {
    console.log(this.model);
    this.service.validateLogin(this.model).then((res) => {
      //routing 
    })
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
        //this.autoLogoutService.startAutoLogoutCheck();  // Start the auto logout check
        this.router.navigate(['home/student-dashboard']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
