import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauReglementComponent } from './nouveau-reglement.component';

describe('NouveauReglementComponent', () => {
  let component: NouveauReglementComponent;
  let fixture: ComponentFixture<NouveauReglementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauReglementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauReglementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
