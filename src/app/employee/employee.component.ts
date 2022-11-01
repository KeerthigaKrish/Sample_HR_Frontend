import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  department: any[] = [];
  employee: any[] = [];
  moduleTitle = "";
  EMPLOYEE_ID = 0;
  EMPLOYEE_NAME = "";
  JOINED_DATE = "";
  DEPARTMENT_NAME = "";
  imageSrc = environment.PHOTO_URL;

   imageAlt = "123.png";

  ngOnInit(): void {
    this.refreshlist();
  }
  refreshlist() {
    
    this.http.get<any>(environment.API_URL + 'department')
      .subscribe(data => {
        this.department = data;
      });
    this.http.get<any>(environment.API_URL + 'employee')
      .subscribe(data => {
        this.employee = data;
      });
  }
    addClick(){
      this.moduleTitle = "Add Employee";
      this.EMPLOYEE_ID= 0;
      this.EMPLOYEE_NAME = "";
      this.JOINED_DATE = "";
      this.DEPARTMENT_NAME = "";
      this.imageAlt = "123.png";
    }
  editClick(emp:any) {
     this.moduleTitle = "Edit Employee";
    this.EMPLOYEE_ID = emp.EMPLOYEE_ID;
    this.EMPLOYEE_NAME = emp.EMPLOYEE_NAME;
      this.JOINED_DATE = emp.JOINED_DATE;
      this.DEPARTMENT_NAME =emp.DEPARTMENT_NAME;
      this.imageAlt = emp.PHOTO;
  }
  createClick() {
    var val = {
     
      EMPLOYEE_NAME: this.EMPLOYEE_NAME,
      JOINED_DATE:this.JOINED_DATE,
      DEPARTMENT_NAME: this.DEPARTMENT_NAME,
      PHOTO: this.imageAlt
    };
    this.http.post(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshlist();
      });
  }
  updateClick() {
    var val = {
     EMPLOYEE_ID: this.EMPLOYEE_ID,
      EMPLOYEE_NAME: this.EMPLOYEE_NAME,
      JOINED_DATE:this.JOINED_DATE,
      DEPARTMENT_NAME: this.DEPARTMENT_NAME,
      PHOTO: this.imageAlt
    };
    this.http.put(environment.API_URL + 'employee', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshlist();
      });
  }
  deleteClick(id: any) {
    if (confirm('Are your sure?')) {
      this.http.delete(environment.API_URL + 'employee/' + id)
        .subscribe(res => {
          alert(res.toString());
          this.refreshlist();
        });
    }
  }
  imageUpload(event:any){
      var file = event.target.files[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      this.http.post(environment.API_URL + 'employee/SaveFile', formData)
        .subscribe((data: any) => {
          this.imageAlt = data.toString();
      });
    }
}

