import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisTemplateComponent } from './devis-template.component';

describe('DevisTemplateComponent', () => {
  let component: DevisTemplateComponent;
  let fixture: ComponentFixture<DevisTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevisTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevisTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
