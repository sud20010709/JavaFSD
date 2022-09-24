import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  
  changepasswordForm: any;

  constructor(private formBuiler: FormBuilder, private _http:HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.changepasswordForm = this.formBuiler.group({
      email:[''],
      password:['']
    })
    
  }
  changepassword(){
    this._http.post<any>("http://localhost:3000/logindetails",this.changepasswordForm.value).subscribe(res=>{
      alert("Password Changed");
      this.changepasswordForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("Something went wrong.")

    })

  }
}
