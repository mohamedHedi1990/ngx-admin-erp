import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEchenaciersComponent } from './liste-echenaciers.component';

describe('ListeEchenaciersComponent', () => {
  let component: ListeEchenaciersComponent;
  let fixture: ComponentFixture<ListeEchenaciersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeEchenaciersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeEchenaciersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
