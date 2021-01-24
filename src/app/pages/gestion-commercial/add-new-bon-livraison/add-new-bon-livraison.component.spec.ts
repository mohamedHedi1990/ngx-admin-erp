import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBonLivraisonComponent } from './add-new-bon-livraison.component';

describe('AddNewBonLivraisonComponent', () => {
  let component: AddNewBonLivraisonComponent;
  let fixture: ComponentFixture<AddNewBonLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBonLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBonLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
