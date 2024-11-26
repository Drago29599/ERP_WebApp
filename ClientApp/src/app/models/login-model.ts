import { Data } from "@angular/router"

export interface LoginModel {
  UserName: string,
  Password: string


}


export interface LoginResponseModel {
  jwtToken: string,
  userName: string,
  userId: string

}


export interface studentDataModel {
  EmailId: string,
  FullName: string,
  FathersName: string,
  MothersName: string,
  DateOfBirth: Data,
  PhoneNumber: number

}

export interface User {
  userName: string,
  userId: string
}
