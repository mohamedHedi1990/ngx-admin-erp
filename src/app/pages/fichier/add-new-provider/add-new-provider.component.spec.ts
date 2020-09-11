import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewProviderComponent } from './add-new-provider.component';

describe('AddNewProviderComponent', () => {
  let component: AddNewProviderComponent;
  let fixture: ComponentFixture<AddNewProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
