import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { AutoLogoutService } from '../auto-logout.service';
import { User } from '../models/login-model';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit,OnDestroy {

  studentData: any;
  token!: string | null;
  userId!: string | null;
  userName!: any;

  user?: User;
  constructor(private loginService: LoginService, private router: Router,
    private autoLogoutService: AutoLogoutService
  ) { }
    
  ngOnInit(): void {

    //Start auto logout check
    this.autoLogoutService.startAutoLogoutCheck();
      //// Retrieve token and user info
      //this.token = this.loginService.getToken();
      //this.userId = this.loginService.getUserId();
    //this.userName = this.loginService.getUserName();

    this.user = this.user = this.loginService.getUser(); 

      // Call the method to fetch student data
      if (this.user) {
        this.getStudentDataBasedOnId(this.user.userId, this.user.userName);
      }
    }

  getStudentDataBasedOnId(userId: string, userName: string) {
    // Call your API to fetch student data
    this.loginService.getStudentData(userId, userName).subscribe(data => {
      this.studentData = data;
      console.log(this.studentData);
    }, error => {
      console.error('Error fetching student data', error);
    });
  }

  

  ngOnDestroy(): void {
    // Stop the auto logout check when the component is destroyed (i.e., when the user logs out)
    this.autoLogoutService.stopAutoLogoutCheck();
  }
}
