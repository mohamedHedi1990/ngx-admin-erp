import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEncaissementsComponent } from './list-encaissements.component';

describe('ListEncaissementsComponent', () => {
  let component: ListEncaissementsComponent;
  let fixture: ComponentFixture<ListEncaissementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEncaissementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEncaissementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
