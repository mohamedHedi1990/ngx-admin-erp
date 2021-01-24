import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProduitComponent } from './add-new-produit.component';

describe('AddNewProduitComponent', () => {
  let component: AddNewProduitComponent;
  let fixture: ComponentFixture<AddNewProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
