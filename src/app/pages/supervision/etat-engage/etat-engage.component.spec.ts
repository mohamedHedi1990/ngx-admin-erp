import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatEngageComponent } from './etat-engage.component';

describe('EtatEngageComponent', () => {
  let component: EtatEngageComponent;
  let fixture: ComponentFixture<EtatEngageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatEngageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatEngageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
