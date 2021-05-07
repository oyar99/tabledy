# Tabledy

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/georgipeltekov/ngx-file-drop/blob/master/LICENSE)

## Overview

An angular +9 module that provides an easy-to-use data-table that supports filtering, sorting, and pagination.

It is a [MatTable](https://material.angular.io/components/table/overview) wrapper that enables you to implement nice-looking tables rapidly.

## Getting started

```bash
npm install tabledy
```

### Import the 'Tabledy' module

```Typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { TabledyModule } from 'tabledy';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TabledyModule // <-- Tabledy module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Configure your table in your component

```Typescript
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
```

### Add your component in the template

```HTML
<!--
Create a template for each of the columns you want to display
You can access the elemnt at that cell with let-element.
You can customize your table however you want
-->
<ng-template #idCell let-element='element'>
  {{ element.id }}
</ng-template>

<ng-template #userCell let-element='element'>
  {{ element.userId }}
</ng-template>

<ng-template #titleCell let-element='element'>
  {{ element.title }}
</ng-template>

<ng-template #completedCell let-element='element'>
  <span *ngIf="element.completed">&#10003;</span>
  <span *ngIf="!element.completed">X</span>
</ng-template>

<!--
Create a template that will show up on mobile devices
-->

<ng-template #responsiveCell let-element='element'>
  {{ element.id }}
</ng-template>

<!--
Your awesome table!
-->
<ngx-tabledy
    searchLabel="Search Item"
    [data]="data"
    [columns]="columns"
    [columnTemplates]="[idCell, userCell, titleCell, completedCell]"
    [responsiveTemplate]="responsiveCell">
</ngx-tabledy>
```


## Properties

Name  | Description | Default Value
------------- | ------------- | -------------
searchLabel  | String for the search label | 'Search'
placeholderLabel  | String for the placeholder of the search input | 'Search'
hasPaginator  | Whether the table will support pagination | true
hasFilter  | Whether the table will support search filter | true
isResponsive  | Whether the table will support responsive templates | true
hasExpandibleRow  | Whether the table will have an expandible row which can be defined with a responsive template | false
data  | An observable of the data to display | 
columns  | An array of column descriptions
columnTemplates  | An array of ng-templates which should match the column description
columnWidths  | An array of widths (percentage) that each column will occupy
responsiveTemplate | The responsive/expandible row template

## License

[MIT](/LICENSE)