import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatGlobalEngageComponent } from './etat-global-engage.component';

describe('EtatGlobalEngageComponent', () => {
  let component: EtatGlobalEngageComponent;
  let fixture: ComponentFixture<EtatGlobalEngageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatGlobalEngageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatGlobalEngageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
