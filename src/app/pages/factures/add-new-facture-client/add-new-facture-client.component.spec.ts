import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFactureClientComponent } from './add-new-facture-client.component';

describe('AddNewFactureClientComponent', () => {
  let component: AddNewFactureClientComponent;
  let fixture: ComponentFixture<AddNewFactureClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFactureClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFactureClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
