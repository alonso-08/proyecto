import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  url = environment.host+":"+environment.port+"/graphql"
  private options = {
    headers: { 'Content-Type': 'application/json' }
  }
  constructor() { }

  getHeadersToken() {
    this.options.headers['Authorization'] = 'Bearer ' + this.getToken()
    return this.options
  }
  getToken() {
    return localStorage.getItem('jwt')
  }

  removeToken(){
    localStorage.removeItem('jwt')
    localStorage.removeItem('user')
  }
}
