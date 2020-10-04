import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDecaissementsComponent } from './list-decaissements.component';

describe('ListDecaissementsComponent', () => {
  let component: ListDecaissementsComponent;
  let fixture: ComponentFixture<ListDecaissementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDecaissementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDecaissementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
