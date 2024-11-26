import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginProfessorComponent } from './login-professor/login-professor.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { TokenInterceptor } from './token.interceptor';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { CreateCurriculumComponent } from './create-curriculum/create-curriculum.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { TokenInterceptor } from './services/token.interceptor';

// Import Angular Material modules
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    LoginComponent,
    LoginStudentComponent,
    LoginProfessorComponent,
    StudentDashboardComponent,
    AdminDashboardComponent,
    CurriculumComponent,
    CreateCurriculumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
