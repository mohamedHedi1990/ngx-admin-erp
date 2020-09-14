import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeContactsComponent } from './liste-contacts.component';

describe('ListeContactsComponent', () => {
  let component: ListeContactsComponent;
  let fixture: ComponentFixture<ListeContactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeContactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
