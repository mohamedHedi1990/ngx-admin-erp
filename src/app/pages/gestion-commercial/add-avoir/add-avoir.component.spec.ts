import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAvoirComponent } from './add-avoir.component';

describe('AddAvoirComponent', () => {
  let component: AddAvoirComponent;
  let fixture: ComponentFixture<AddAvoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAvoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
