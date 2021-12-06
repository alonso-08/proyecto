import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-card-employee',
  templateUrl: './card-employee.component.html',
  styleUrls: ['./card-employee.component.scss']
})
export class CardEmployeeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Employee,) { }
  
  ngOnInit(): void {
  }

}
