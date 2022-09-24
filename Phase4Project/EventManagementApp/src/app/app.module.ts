import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { Pipe, PipeTransform } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { OrderModule } from 'ngx-order-pipe';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDashComponent } from './employee-dash/employee-dash.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    ChangepasswordComponent,
    EmployeeDashComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    Ng2SearchPipeModule,
    OrderModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
