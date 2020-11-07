import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatNonEngageComponent } from './etat-non-engage.component';

describe('EtatNonEngageComponent', () => {
  let component: EtatNonEngageComponent;
  let fixture: ComponentFixture<EtatNonEngageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatNonEngageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatNonEngageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
