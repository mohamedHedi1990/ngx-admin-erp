import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBonsLivraisonComponent } from './list-bons-livraison.component';

describe('ListBonsLivraisonComponent', () => {
  let component: ListBonsLivraisonComponent;
  let fixture: ComponentFixture<ListBonsLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBonsLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBonsLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
