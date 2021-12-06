import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.scss']
})
export class UpdateEmployeeComponent implements OnInit {
  public formEmployee: FormGroup
  public listCivilStatus: string[] = ['unmarried', 'married', 'divorced', 'widower']
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private employeeService: EmployeeService,
    private dialog: MatDialogRef<UpdateEmployeeComponent>,
    private formBuilder: FormBuilder
  ) {
    this.formEmployee = this.formBuilder.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationality: ['', Validators.required],
      phone: ['', Validators.required],
      civil_status: ['', Validators.required],
      birthday: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    for (const field in this.formEmployee.controls) {
      if (field == 'birthday') {
        let date = new Date(parseInt(this.data[field])).toISOString()
        this.formEmployee.controls['birthday'].setValue(date.toString())
      } else {
        this.formEmployee.controls[field].setValue(this.data[field])
      }

    }
  }

  updateEmploye() {
    let employee = this.formEmployee.value
    employee["id_employee"] = this.data.id_employee
    this.employeeService.updateEmployee(employee).subscribe(res => {
      this.dialog.close({ "update": true })
    })
  }
}
