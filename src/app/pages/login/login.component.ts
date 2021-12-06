import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  public formLogin: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private message: MatSnackBar,
    private router: Router
    ) {
    this.formLogin = this.formBuilder.group({ usuario: ['', Validators.required], password: ['', Validators.required] })
  }

  ngOnInit(): void {
  }
  login() {
    this.loginService.login(this.formLogin.value.usuario, this.formLogin.value.password).subscribe(res => {
      let auth = res.data.login
      if (auth.token != '' && auth.token != null && auth.token != undefined && auth.message == "valid access") {
        console.log(res)
        localStorage.setItem('jwt', auth.token)
        localStorage.setItem('user', auth.full_name)
        this.router.navigateByUrl("/home")
      }else{
        this.message.open('Invalid username and/or password', 'OK', {
          duration: 4000
        })
      }
    }, err => {
      this.message.open('Server Not Found', 'OK', {
        duration: 4000
      })
    })
  }
}
