import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService, private router: Router, private cookieService: CookieService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Check if the request is for the login or any other endpoint that does not require a token
    if (this.isPublicEndpoint(req)) {
      // Skip adding token and token expiration check for login or other public APIs
      return next.handle(req);
    }

    // Get the token from localStorage
    //const token = this.loginService.getToken();

    // If the token exists and is not expired, attach it to the request
    if (!this.loginService.hasTokenExpired()) {
      const authClonedRequest = req.clone({
        setHeaders: {
          'Authorization': this.cookieService.get('Authorization')
        }
      });

      return next.handle(authClonedRequest);
    }
    else {
      // If the token has expired, log out the user
      this.loginService.logout();
      this.router.navigate(['/']);  // Redirect to the login page
      return new Observable<HttpEvent<any>>();  // Return an empty observable to terminate the request
    }

    // If the token is not expired, continue with the request
    //return next.handle(req);
  }

  // Method to check if the request is to a public API that doesn't require a token
  private isPublicEndpoint(req: HttpRequest<any>): boolean {
    // Add logic here to identify public APIs (e.g., login endpoint, public resources)
    const publicEndpoints = ['api/Home/Login', 'api/Home/validateAssociate'];

    return publicEndpoints.some(endpoint => req.url.includes(endpoint));
  }
}
