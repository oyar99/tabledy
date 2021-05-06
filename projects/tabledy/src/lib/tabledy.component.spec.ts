import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabledyComponent } from './tabledy.component';

describe('TabledyComponent', () => {
  let component: TabledyComponent;
  let fixture: ComponentFixture<TabledyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabledyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabledyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
