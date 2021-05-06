import { NgModule } from '@angular/core';
import { TabledyComponent } from './tabledy.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [TabledyComponent],
  imports: [
    CommonModule,
    NoopAnimationsModule,
    FormsModule,
    LayoutModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  exports: [TabledyComponent]
})
export class TabledyModule { }
