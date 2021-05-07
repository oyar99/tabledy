import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IColumnDescription } from 'tabledy';

export interface ITodo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // Data must be an observable.
  // The component will listen to any changes in the data and update accordingly
  data: Observable<ITodo []>;

  // Define each of your columns
  columns: IColumnDescription<ITodo> [] = [
    {
      name: 'id',
      label: 'Id',
      sortable: false,
      responsive: true
    },
    {
      name: 'userId',
      label: 'User',
      sortable: false,
      responsive: true
    },
    {
      name: 'title',
      label: 'Title',
      sortable: true,
      accessor: item => {
          return item.title;
      }
    },
    {
      name: 'completed',
      label: 'Done',
      sortable: false
    }
  ];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.data = this.httpClient.get<ITodo []>(`https://jsonplaceholder.typicode.com/todos/`);
  }
}