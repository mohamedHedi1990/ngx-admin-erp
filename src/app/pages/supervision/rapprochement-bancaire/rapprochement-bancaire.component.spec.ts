import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapprochementBancaireComponent } from './rapprochement-bancaire.component';

describe('RapprochementBancaireComponent', () => {
  let component: RapprochementBancaireComponent;
  let fixture: ComponentFixture<RapprochementBancaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapprochementBancaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapprochementBancaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
