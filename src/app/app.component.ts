import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IColumnAccessor } from 'tabledy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  columns: IColumnAccessor<any> [] = [
    {
      name: 'name',
      label: 'Name column',
      sortable: true,
      accessor: item => {
        return item.name;
      }
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      sortable: false
    },
    {
      name: 'salary',
      label: 'Salary (monthly)',
      sortable: true,
      accessor: item => {
        return item.salary;
      },
      responsive: true
    }
  ];

  data: Observable<any> = of([
    {
      name: 'Juan',
      phoneNumber: '(907) 842 27',
      salary: 150032
    },
    {
      name: 'Federico',
      phoneNumber: '(907) 752 27',
      salary: 10000
    },
    {
      name: 'Frederick',
      phoneNumber: '(907) 842 93',
      salary: 3655
    },
    {
      name: 'Pedro',
      phoneNumber: '(907) 842 27',
      salary: 2433
    },
  ]);
}
