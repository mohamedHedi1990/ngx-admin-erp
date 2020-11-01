import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouveauEncaissementComponent } from './nouveau-encaissement.component';

describe('NouveauEncaissementComponent', () => {
  let component: NouveauEncaissementComponent;
  let fixture: ComponentFixture<NouveauEncaissementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouveauEncaissementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouveauEncaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
