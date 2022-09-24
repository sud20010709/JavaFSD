import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeserviceService } from '../employeeservice.service';
import { EmployeeData } from './employee.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {
  currentEmployee :any;
  message = '';
  formValue!: FormGroup;
  employeeModelObj: EmployeeData = new EmployeeData;
  allEmployeeData: any;
  showAdd!:boolean
  showbtn!:boolean
  searchID='';

  constructor(  private employeeserviceService: EmployeeserviceService,
    private router: Router, private route: ActivatedRoute,private formbuiler: FormBuilder, private api: EmployeeserviceService) { }

  ngOnInit(): void {
    this.message = '';
    this.getData(this.route.snapshot.paramMap.get('id'));
    this.formValue = this.formbuiler.group({
      id:[''],
      firstname: [''],
      lastname: [''],
      email: ['']

    })
    this.getAllEmployees();

  }
  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }

  // Now Subscribing our data which is mapped
  addEmployee() {
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;

    this.api.postEmployee(this.employeeModelObj).subscribe(res => {
      console.log(res);
      alert("Employee added succesfully! :)");

      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllEmployees();
    },
      err => {
        alert("Something went wrong! :(")
      }
    )
  }

  //Get All Enployees
  getAllEmployees() {
    this.api.getEmployee().subscribe(res => {
      this.allEmployeeData = res;
    })
  }

  // Delete Employee
  deleteEmployeeData(data:any) {
    this.api.deleteEmployee(data.id).subscribe(res => {
      alert("Employee Data Deleted Succesfully! ")
      this.getAllEmployees();
    })
  }

  //Edit Employee

  onEditEmployee(data:any){
    this.showAdd=false;
    this.showbtn=true;

    this.employeeModelObj.id= data.id

    this.formValue.controls['firstname'].setValue(data.firstname);
    this.formValue.controls['lastname'].setValue(data.lastname);
    this.formValue.controls['email'].setValue(data.email);
  }

  //Update Employee Detail
  updateEmployeeDetail(){
    this.employeeModelObj.firstname = this.formValue.value.firstname;
    this.employeeModelObj.lastname = this.formValue.value.lastname;
    this.employeeModelObj.email = this.formValue.value.email;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(res=>{
      alert("Employee Record Updated");
      
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllEmployees();
    })
  }

  //Search Employee
  
  getEmployee(): void {
    this.employeeserviceService.read(this.searchID)
      .subscribe(
        employee => {
          this.currentEmployee = employee;
          console.log(employee);
        },
        error => {
          console.log(error);
        });
  }
  
  getData(id: string | null): void {
    this.employeeserviceService.getDetails(id)
      .subscribe(
        (employee: null) => {
          this.currentEmployee = employee;
          console.log(employee);
        },
        (error: any) => {
          console.log(error);
        });
  }

}
