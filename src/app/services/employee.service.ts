import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, ModuleEmployee } from '../models/employee';
import { GlobalService } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  getEmployee(page: number, pageSize: number, search: string = null): Observable<ModuleEmployee> {
    if (search == null) {
      let query = {
        "query": `
        query($page: Int!, $pageSize: Int!){
          getCountEmployees(page: $page, pageSize: $pageSize){length},
          getEmployees(page: $page, pageSize: $pageSize){id_employee,name,last_name,email,nationality,phone,civil_status,birthday}
        }`,
        "variables": {
          "page": page,
          "pageSize": pageSize
        }
      }
      return this.http.post<ModuleEmployee>(this.globalService.url, query, this.globalService.getHeadersToken())
    }
    let query = {
      "query": `query($page: Int!, $pageSize: Int!, $match: String!){
        getCountEmployeesByMatch(match: $match){
          length
        },
        getEmployeesByMatch(page: $page, pageSize: $pageSize, match: $match){
          id_employee,name,last_name,email,nationality,phone,civil_status,birthday
        }
      }`,
      "variables": {
        "page": page,
        "pageSize": pageSize,
        "match": search
      }
    }

    return this.http.post<ModuleEmployee>(this.globalService.url, query, this.globalService.getHeadersToken())
  }

  updateEmployee(empleado: Employee): Observable<any> {

    let query = {
      "query": "mutation($id_employee: Int!,$name: String ,$last_name: String ,$email: String ,$nationality: String ,$phone: String ,$civil_status: String ,$birthday: String ) { updateEmployee(id_employee:$id_employee, name: $name ,last_name: $last_name ,email: $email ,nationality: $nationality ,phone: $phone ,civil_status: $civil_status ,birthday: $birthday ) {id_employee, name, last_name, email,nationality,phone, civil_status,birthday } } ",
      "variables": empleado
    }
    return this.http.post<any>(this.globalService.url, query, this.globalService.getHeadersToken())

  }
}

