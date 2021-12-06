import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login, ModuleEmployee } from '../models/employee';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  ruta = environment.host+":"+environment.port+"/public"
  private options = {
    headers: { 'Content-Type': 'application/json' }
  }
  constructor(
    private http: HttpClient,
    private globalService: GlobalService,
    private router: Router
    ) { }

  login(email: string, password: string): Observable<ModuleEmployee> {
    let query = {
      "query": `mutation {
          login(email: \"${email}\", password: \"${password}\"){
            token,message,full_name}
          }`
    }
    return this.http.post<ModuleEmployee>(this.ruta, query, this.options)
  }

  
  logout(){
    /*
    return this.http.get<any>(
      this.ruta,
      this.globalService.getHeadersToken()
    ).pipe(tap((response) => {
      this.globalService.removeToken()
      this.router.navigate(['/']);
    }));
    */
    this.globalService.removeToken()
    this.router.navigate(['/']);
  }

}

