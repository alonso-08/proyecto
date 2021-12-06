import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { CardEmployeeComponent } from '../card-employee/card-employee.component';
import { UpdateEmployeeComponent } from '../update-employee/update-employee.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'last_name', 'email', 'nationality', 'phone', 'civil_status', 'birthday', 'action'];

  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  valueSearch: FormControl = new FormControl('')
  //Datos para paginación
  length = 0;
  pageSize = 0;
  pageSizeOptions = [5, 10, 20, 30]
  //Datos para el control de paginacion y datos actuales
  pageNow = 0;
  pageSizeNow = 5;
  busqueda: string = "";

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {  
    this.getEmployes()
    this.valueSearch.valueChanges.pipe(debounceTime(3000)).subscribe(search => {
      //Reiniciamos el paginator
      this.pageNow = 0
      this.paginator.firstPage()
      //Decidimos si es consuta normal o con busqueda de coicidencia
      if (search != '') {
        this.getEmployes(search)
      } else if (search == '') {
        this.getEmployes()
      }
    })
  }

  updateEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(
      UpdateEmployeeComponent,
      {
        data: employee
      }
    )
    dialogRef.afterClosed().subscribe(flag => {
      if (flag && flag["update"] == true) {
        if (this.valueSearch.value != '') {
          this.getEmployes(this.valueSearch.value)
        } else {
          //Consulta normal
          this.getEmployes()
        }
      }
    })

  }

  getEmployes(search: string = null) {

    this.employeeService.getEmployee(this.pageNow, this.pageSizeNow, search).subscribe(res => {       
      if(search == null){
        //Consulta normal
        this.dataSource.data = res.data.getEmployees
        this.length = res.data.getCountEmployees[0].length
      }else{
        //Consulta con busqueda de coicidencia
        this.dataSource.data = res.data.getEmployeesByMatch
        this.length = res.data.getCountEmployeesByMatch[0].length
      }
    })

  }

  changePage(event: PageEvent) {
    this.pageNow = event.pageIndex;
    this.pageSizeNow = event.pageSize
    //Si hay algo en el campo de busqueda consultamos con ese valor
    if (this.valueSearch.value != '') {
      this.getEmployes(this.valueSearch.value)
    } else {
      //Consulta normal
      this.getEmployes()
    }
  }

  detailEmployee(employee: Employee) {
    const dialogDetailEmployee = this.dialog.open(
      CardEmployeeComponent,
      {
        data: employee
      }
    )
  }
}
