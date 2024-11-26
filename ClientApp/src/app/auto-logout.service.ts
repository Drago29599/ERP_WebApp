import { Injectable } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  private autoLogoutSubscription: Subscription | null = null;
  constructor(private loginService: LoginService,
    private router: Router) { }

  // Start checking the token expiration every minute
  startAutoLogoutCheck() {
    // Set a timer to check every 1 minute
    this.autoLogoutSubscription = timer(0, 60 * 1000).subscribe(() => {
      if (this.loginService.hasTokenExpired()) {
        this.logout();
      }
    });
  }

  // Stop checking when the user logs out or the session ends
  stopAutoLogoutCheck() {
    if (this.autoLogoutSubscription) {
      this.autoLogoutSubscription.unsubscribe();
    }
  }

  // Handle logout process
  private logout() {
    this.loginService.logout();  // Log the user out
    this.router.navigate(['/']);  // Redirect to login page
    alert('Your session has expired. Please log in again.');  // Optional: Notify the user
  }
}
