import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFacturesClientsComponent } from './liste-factures-clients.component';

describe('ListeFacturesClientsComponent', () => {
  let component: ListeFacturesClientsComponent;
  let fixture: ComponentFixture<ListeFacturesClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeFacturesClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeFacturesClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
