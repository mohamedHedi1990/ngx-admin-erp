import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComptesComponent } from './list-comptes.component';

describe('ListComptesComponent', () => {
  let component: ListComptesComponent;
  let fixture: ComponentFixture<ListComptesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComptesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
