import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneplaylistComponent } from './oneplaylist.component';

describe('OneplaylistComponent', () => {
  let component: OneplaylistComponent;
  let fixture: ComponentFixture<OneplaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneplaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
