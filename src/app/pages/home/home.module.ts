import { NgModule } from '@angular/core';

import { MaterialModule } from 'src/app/material/material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateEmployeeComponent } from './components/update-employee/update-employee.component';
import { HomeComponent } from './home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { CardEmployeeComponent } from './components/card-employee/card-employee.component';


@NgModule({
  declarations: [
   HomeComponent,
   EmployeesComponent,
   UpdateEmployeeComponent,
   CardEmployeeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
