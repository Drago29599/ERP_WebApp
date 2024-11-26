import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AutoLogoutService } from '../auto-logout.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  token!: string | null;
  userId!: string | null;
  userName!: any;

  constructor(private loginService: LoginService, private router: Router,
    private autoLogoutService: AutoLogoutService
  ) { }

  ngOnInit(): void {
    //Start auto logout check
    this.autoLogoutService.startAutoLogoutCheck();
    // Retrieve token and user info
    this.token = this.loginService.getToken();
    this.userId = this.loginService.getUserId();
    this.userName = this.loginService.getUserName();
  }

  //Test

  //onLogout() {
  //  this.loginService.logout();
  //  this.router.navigate(['home/login-professor']);  // Redirect to home page after logout
  //}

  ngOnDestroy(): void {
    // Stop the auto logout check when the component is destroyed (i.e., when the user logs out)
    this.autoLogoutService.stopAutoLogoutCheck();
  }
}
