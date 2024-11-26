import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(): boolean {
    if (this.loginService.hasTokenExpired()) {
      // If the token has expired, log the user out and redirect to the login page (or home page)
      this.loginService.logout();
      this.router.navigate(['home']);  // Redirect to login page (or home)
      return false; // Prevent access to the route
    }
    return true; // Allow access to the route if the token is valid
  }
}
