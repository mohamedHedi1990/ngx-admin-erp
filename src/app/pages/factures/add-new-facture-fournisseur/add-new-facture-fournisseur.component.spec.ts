import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewFactureFournisseurComponent } from './add-new-facture-fournisseur.component';

describe('AddNewFactureFournisseurComponent', () => {
  let component: AddNewFactureFournisseurComponent;
  let fixture: ComponentFixture<AddNewFactureFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewFactureFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewFactureFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
