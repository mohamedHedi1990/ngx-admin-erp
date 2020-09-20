import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSocietesComponent } from './list-societes.component';

describe('ListSocietesComponent', () => {
  let component: ListSocietesComponent;
  let fixture: ComponentFixture<ListSocietesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSocietesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSocietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
