import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public http: HttpClient) {
    this.http = http
  }

  async validateLogin(loginObj: any) {
    return this.http.post('api/Home/Login', loginObj).
      pipe(map((data: any) => { return data })).toPromise();
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<any>('api/Home/Login', loginObj);
  }


  //getDetails(Id: string) {
  //  return this.http.get('')
  //}
  
}
