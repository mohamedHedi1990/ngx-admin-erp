import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCompteComponent } from './add-new-compte.component';

describe('AddNewCompteComponent', () => {
  let component: AddNewCompteComponent;
  let fixture: ComponentFixture<AddNewCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
