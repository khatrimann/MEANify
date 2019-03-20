import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListensongComponent } from './listensong.component';

describe('ListensongComponent', () => {
  let component: ListensongComponent;
  let fixture: ComponentFixture<ListensongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListensongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListensongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
