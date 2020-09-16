import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEchanchierComponent } from './add-new-echanchier.component';

describe('AddNewEchanchierComponent', () => {
  let component: AddNewEchanchierComponent;
  let fixture: ComponentFixture<AddNewEchanchierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewEchanchierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEchanchierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
