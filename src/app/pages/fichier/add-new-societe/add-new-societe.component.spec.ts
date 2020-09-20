import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSocieteComponent } from './add-new-societe.component';

describe('AddNewSocieteComponent', () => {
  let component: AddNewSocieteComponent;
  let fixture: ComponentFixture<AddNewSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
