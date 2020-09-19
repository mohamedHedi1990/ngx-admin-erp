import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NouvelleComissionComponent } from './nouvelle-comission.component';

describe('NouvelleComissionComponent', () => {
  let component: NouvelleComissionComponent;
  let fixture: ComponentFixture<NouvelleComissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NouvelleComissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NouvelleComissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
