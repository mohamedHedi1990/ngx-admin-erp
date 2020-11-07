import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatGlobalTreserorieComponent } from './etat-global-treserorie.component';

describe('EtatGlobalTreserorieComponent', () => {
  let component: EtatGlobalTreserorieComponent;
  let fixture: ComponentFixture<EtatGlobalTreserorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatGlobalTreserorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatGlobalTreserorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
