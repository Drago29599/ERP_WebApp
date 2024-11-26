import { Component, OnInit } from '@angular/core';
import { LoginModel } from './login-model';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
      
  }

  title = 'ClientApp';
  loginObj: LoginModel = {
    ID: 0,
    Pass:""
  };

  Id: number = 0;
  Pass: string = "";
  constructor(private authService: AuthService) {

  }

  validateAssociate() {
    this.loginObj.ID = this.Id;
    this.loginObj.Pass = this.Pass;

    this.authService.validateLogin(this.loginObj).then((res) => {
      console.log(res)
    })
  }

  //getDetails() {
  //  this.authService.
  //}
}
