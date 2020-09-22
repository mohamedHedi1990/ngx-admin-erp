import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFacturesFournisseursComponent } from './liste-factures-fournisseurs.component';

describe('ListeFacturesFournisseursComponent', () => {
  let component: ListeFacturesFournisseursComponent;
  let fixture: ComponentFixture<ListeFacturesFournisseursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFacturesFournisseursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFacturesFournisseursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
