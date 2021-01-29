import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureTemplateComponent } from './facture-template.component';

describe('FactureTemplateComponent', () => {
  let component: FactureTemplateComponent;
  let fixture: ComponentFixture<FactureTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactureTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactureTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
