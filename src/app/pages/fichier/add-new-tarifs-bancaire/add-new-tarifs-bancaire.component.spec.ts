import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTarifsBancaireComponent } from './add-new-tarifs-bancaire.component';

describe('AddNewTarifsBancaireComponent', () => {
  let component: AddNewTarifsBancaireComponent;
  let fixture: ComponentFixture<AddNewTarifsBancaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewTarifsBancaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewTarifsBancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
