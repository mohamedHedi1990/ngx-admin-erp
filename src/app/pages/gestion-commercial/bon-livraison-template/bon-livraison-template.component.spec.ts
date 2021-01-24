import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivraisonTemplateComponent } from './bon-livraison-template.component';

describe('BonLivraisonTemplateComponent', () => {
  let component: BonLivraisonTemplateComponent;
  let fixture: ComponentFixture<BonLivraisonTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonLivraisonTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonLivraisonTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
