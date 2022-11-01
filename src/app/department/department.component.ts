import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, JsonpClientBackend } from '@angular/common/http';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {

  constructor(private http: HttpClient) { }

  department: any[] = [];
  moduleTitle = "";
  DEPARTMENT_ID = 0;
  DEPARTMENT_NAME = "";

  departmentIdFilter = "";
  departmentNameFilter = "";
  departmentsWithoutFilter: any[]=[];

  ngOnInit(): void {
    this.refreshlist();
  }
  refreshlist() {
    
    this.http.get<any>(environment.API_URL + "department")
      .subscribe(data => {
        this.department = data;
        this.departmentsWithoutFilter = data;
      });
  }
  addClick() {
    this.moduleTitle = "Add Department";
    this.DEPARTMENT_ID = 0;
    this.DEPARTMENT_NAME = "";
  }
  editClick(dep: any) {
    this.moduleTitle = "Edit Department";
    this.DEPARTMENT_ID = dep.DEPARTMENT_ID;
    this.DEPARTMENT_NAME = dep.DEPARTMENT_NAME;
  }
  createClick() {
    var val = {
      DEPARTMENT_NAME: this.DEPARTMENT_NAME
    };
    this.http.post(environment.API_URL + 'department', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshlist();
      });
  }
  updateClick() {
    var val = {
      DEPARTMENT_ID: this.DEPARTMENT_ID,
      DEPARTMENT_NAME: this.DEPARTMENT_NAME
    };
    this.http.put(environment.API_URL + 'department', val)
      .subscribe(res => {
        alert(res.toString());
        this.refreshlist();
      });
  }
  deleteClick(id: any) {
    if (confirm('Are your sure?')) {
      this.http.delete(environment.API_URL + 'department/' + id)
        .subscribe(res => {
          alert(res.toString());
          this.refreshlist();
        });
    }
  }
  
  FilterFn() {
    var departmentIdFilter = this.departmentIdFilter;
    var departmentNameFilter = this.departmentNameFilter;

    this.department = this.departmentsWithoutFilter.filter(
      function (el: any) {
        return el.DEPARTMENT_ID.toString().toLowerCase().includes(
          departmentIdFilter.toString().trim().toLowerCase()
        )&&
          el.DEPARTMENT_NAME.toString().toLowerCase().includes(
            departmentNameFilter.toString().trim().toLowerCase())
      }
    );
  }

 
  sortResult(prop:any,asc:any) {
    this.department = this.departmentsWithoutFilter.sort(function (a: any, b: any) {
       if(asc){
        return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
      }
      else{
        return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
      }
    } );

}


}
