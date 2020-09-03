import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisirSocieteComponent } from './saisir-societe.component';

describe('SaisirSocieteComponent', () => {
  let component: SaisirSocieteComponent;
  let fixture: ComponentFixture<SaisirSocieteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisirSocieteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisirSocieteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
