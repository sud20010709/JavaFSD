import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const baseURL = 'http://localhost:3000/employees';
@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {

  constructor(private _http:HttpClient) { }
  //Create Employee Using POST method
  postEmployee(data:any){
    return this._http.post<any>("http://localhost:3000/employees",data).pipe(map((res:any)=>{
      return res;
    }))
  }

  //Get Employee data using GET method
  getEmployee(){
    return this._http.get<any>("http://localhost:3000/employees").pipe(map((res:any)=>{
      return res;
    }))
  }

  //Update Employee data using GET method
  updateEmployee(data:any, id:number){
    return this._http.put<any>("http://localhost:3000/employees/"+id,data).pipe(map((res:any)=>{
      return res;
    }))
  }

   //Delete Employee data using GET method
   deleteEmployee(id:number){
    return this._http.delete<any>("http://localhost:3000/employees/"+id).pipe(map((res:any)=>{
      return res;
    }))
  }
   //Get Employee Deatils
  getDetails(id: any): Observable<any> {
    return this._http.get(`${baseURL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  //Search Employee
  read(id): Observable<any> {
    return this._http.get(`${baseURL}/${id}`);
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}