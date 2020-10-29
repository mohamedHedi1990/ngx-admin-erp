import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalSupervisionComponent } from './global-supervision.component';

describe('GlobalSupervisionComponent', () => {
  let component: GlobalSupervisionComponent;
  let fixture: ComponentFixture<GlobalSupervisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalSupervisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
