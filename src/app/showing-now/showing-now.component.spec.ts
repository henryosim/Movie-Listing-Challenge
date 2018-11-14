import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowingNowComponent } from './showing-now.component';

describe('ShowingNowComponent', () => {
  let component: ShowingNowComponent;
  let fixture: ComponentFixture<ShowingNowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowingNowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowingNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
