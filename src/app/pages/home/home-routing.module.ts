import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { EmployeesComponent } from './components/employees/employees.component';

import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      
      {
        path: '',
        redirectTo: '/employees',
        pathMatch: 'full'
      },
      
      {
        path: 'employees',
        children: [
          {
            path: '',
            component: EmployeesComponent,
          }
        ]
      },
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
