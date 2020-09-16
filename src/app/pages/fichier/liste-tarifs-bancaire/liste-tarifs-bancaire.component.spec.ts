import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTarifsBancaireComponent } from './liste-tarifs-bancaire.component';

describe('ListeTarifsBancaireComponent', () => {
  let component: ListeTarifsBancaireComponent;
  let fixture: ComponentFixture<ListeTarifsBancaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeTarifsBancaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeTarifsBancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
