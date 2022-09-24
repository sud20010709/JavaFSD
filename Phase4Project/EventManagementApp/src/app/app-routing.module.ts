import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashComponent } from './employee-dash/employee-dash.component';
import { LoginComponent } from './login/login.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'changepassword', component: ChangepasswordComponent,
  },
  {
    path: 'employees', component: EmployeeDashComponent
  },
  {
    path: 'employees/:id', component: EmployeeDashComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
