import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { LoginResponseModel, User, studentDataModel } from '../models/login-model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  $user = new BehaviorSubject<User | undefined>(undefined);
  constructor(public http: HttpClient, private cookieService: CookieService) {
    this.http = http
  }

  async validateLogin(loginObj: any) {
    return this.http.post('api/Home/validateAssociate', loginObj).
      pipe(map((data: any) => { return data })).toPromise();
  }

  login(loginObj: any): Observable<any> {
    return this.http.post<LoginResponseModel>('api/Home/Login', loginObj)
      .pipe(map((data: any) => data));;      ;
  }

  setTokenExpirationToken() {
    const expiration = Date.now() + 30 * 60 * 1000;  // Set expiration time to 30 minutes 
    localStorage.setItem('tokenExpiration', expiration.toString());  // Store expiration time
  }

  //setting the user
  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('userName', user.userName);
  }

  //Get user while refresh from local storage
  getUser(): User | undefined {
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');

    if (userName && userId) {
      const user: User = {
        userName : userName,
        userId : userId 
      }
      return user;
    }
    return undefined;
  }


  User(): Observable<User | undefined>{
    return this.$user.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //Get the token expiration time
  getTokenExpiration(): number | null {
    const expiration = localStorage.getItem('tokenExpiration');
    return expiration ? parseInt(expiration, 10) : null;
  }

  // Check if the token has expired
  hasTokenExpired(): boolean {
    const expiration = this.getTokenExpiration();
    if (!expiration) return true;  // If no expiration time is set, assume expired

    return Date.now() > expiration;
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  getUserName() {
    return localStorage.getItem('userName');
  }

  // Clear the stored token and user info
  logout(): void {
    //localStorage.removeItem('token');
    //localStorage.removeItem('userId');
    //localStorage.removeItem('userName');
    //localStorage.removeItem('tokenExpiration');  // Remove expiration time
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);

  }


  getStudentData( userId: string , userName: string): Observable<any> {
    // Set headers including the Authorization token
    //const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<studentDataModel>(`api/Home/GetStudentData?userName=${userName}`);
  }
}
