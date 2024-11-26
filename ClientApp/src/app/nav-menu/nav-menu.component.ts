import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/login-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  user?: User;
  constructor(private loginService: LoginService, private router: Router) { }


  ngOnInit(): void {
    this.loginService.User().
      subscribe({
        next: (response) => {
          this.user = response;
        }
      })

    this.user = this.loginService.getUser();
  }

  onLogout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/');
  }

}
