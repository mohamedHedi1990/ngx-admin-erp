import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvoirTemplateComponent } from './avoir-template.component';

describe('AvoirTemplateComponent', () => {
  let component: AvoirTemplateComponent;
  let fixture: ComponentFixture<AvoirTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvoirTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvoirTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
