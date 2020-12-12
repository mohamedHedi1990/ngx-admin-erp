import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauDecaissementComponent } from './nouveau-decaissement.component';

describe('NouveauDecaissementComponent', () => {
  let component: NouveauDecaissementComponent;
  let fixture: ComponentFixture<NouveauDecaissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NouveauDecaissementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauDecaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
