import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDevisComponent } from './add-new-devis.component';

describe('AddNewDevisComponent', () => {
  let component: AddNewDevisComponent;
  let fixture: ComponentFixture<AddNewDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
