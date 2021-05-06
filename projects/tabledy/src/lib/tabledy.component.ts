import { animate, state, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

export interface IColumnAccessor<T> {
  /** The unique name of the column */
  name: string;
  /** The label displayed on the UI - 
   *  The name will be used instead if this is undefined 
   */
  label?: string;
  /** Whether a column is sortable -
   *  If sortable is true, then you have to specify an accessor function
   *  which returns the logical value of that column upon which sorting is based
   */
  sortable: boolean;
  /** A function that returns a logical value for this column */
  accessor?(arg1: T): any;
  /** Whether this colum should be placed in an expandable row in small screens
   */
  responsive?: boolean;
}

@Component({
  selector: 'tabledy',
  templateUrl: 'tabledy.component.html',
  styleUrls: [
    './tabledy.component.scss'
  ],
  animations: [
    trigger('detailExpand', [
    state(
      'collapsed, void',
      style({ height: '0px', minHeight: '0', display: 'none' })
    ),
    state('expanded', style({ height: '*' })),
    transition('* <=> *', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
  ])
  ]
})
export class TabledyComponent<T> implements OnInit, AfterViewInit, OnDestroy {

  alive = true;

  @Input() searchLabel = 'Search';
  @Input() placeholderLabel = 'Search';
  @Input() hasPaginator = true;
  @Input() hasFilter = true;
  @Input() isResponsive = true;
  @Input() hasExpandibleRow = false;
  @Input() data: Observable<T []>;
  @Input() columns: IColumnAccessor<T> [] = [];
  @Input() columnTemplates: TemplateRef<any> [] = [];
  @Input() columnWidths: number [];
  @Input() responsiveTemplate: TemplateRef<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<T> = new MatTableDataSource();
  query: string;

  _columns: string [];

  smallScreen: boolean;
  expandedElement: T;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small
    ])
      .pipe(takeWhile(()=> this.alive))
      .subscribe(result => {
        this.smallScreen = result.matches;
        this.computeColumns();
    });

    this.smallScreen = this.breakpointObserver.isMatched([Breakpoints.XSmall, Breakpoints.Small]);
  }

  ngOnInit(): void {
    this.data
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => {
        this.dataSource.data = data;
    });

    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm: any, key: any) => {
        return this.nestedFilterCheck(currentTerm, data, key);
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();

      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    }

    if (this.columns.length != this.columnTemplates.length) {
      throw `Number of columns do not match number of templates`;
    }

    this.computeColumns();
  }

  ngAfterViewInit(): void {
    if (this.hasPaginator) {
      this.dataSource.paginator = this.paginator;
    }

    this.dataSource.sortingDataAccessor = (item, property) => {
      const column = this.columns.find(column => column.name === property);
      if (column.accessor) {
        return column.accessor(item);
      }
      throw `Sorting is enabled, but a function for field ${property} was not provided.`;
    };

    this.dataSource.sort = this.sort;
  }

  nestedFilterCheck(search: any, data: any, key: any): any {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  computeColumns(): void {
    if (this.smallScreen || this.hasExpandibleRow) {
      this._columns = this.columns.filter(columnAccesor => !columnAccesor.responsive)
                                  .map(columnAccesor => columnAccesor.name);

      this.expandedElement = null;
    } else {
      this._columns = this.columns.map(columnAccesor => columnAccesor.name);
    }
  }

  search(): void {
    if (this.hasFilter) {
      this.expandedElement = null;
      this.dataSource.filter = this.query;
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

}
