import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { LoginProfessorComponent } from './login-professor/login-professor.component';
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { AuthGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CurriculumComponent } from './curriculum/curriculum.component';
import { CreateCurriculumComponent } from './create-curriculum/create-curriculum.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

const routes: Routes = [
  //{
  //  path: '/home',
  //  component: NavMenuComponent // Login page (no guard needed)
  //},
  {
    path: 'home/login-student',
    component: LoginStudentComponent // Login page (no guard needed)
  },
  {
    path: 'home/login-professor',
    component: LoginProfessorComponent // Login page (no guard needed)
  },
  {
    path: 'home/student-dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard] // Protected route using auth guard
  },
  {
    path: 'home/admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard], // Protected route using auth guard
    children: [
      { path: 'curriculum/create-curriculum', component: CreateCurriculumComponent }
    ]
  },
  {
    path: 'home/curriculum',
    component: CurriculumComponent,
    canActivate: [AuthGuard] // Protected route using auth guard
  },
  //{
  //  path: 'home/curriculum/create-curriculum',
  //  component: CreateCurriculumComponent,
  //  canActivate: [AuthGuard] // Protected route using auth guard
  //}
  //{
  //  path: 'home',
  //  component: AppComponent// Login page (no guard needed)
  //} home/admin-dashboard
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
