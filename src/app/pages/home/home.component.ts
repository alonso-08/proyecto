import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public nameUser = null
  public itemsMenu = [
    {
      name: 'Employees',
      icon: 'people'
    }
  ]
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  constructor(
    private loginService: LoginService,
    private changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.nameUser = localStorage.getItem('user')
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  logOut(){
    this.loginService.logout()
  }
}
