import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalsViewComponent } from './approvalsView.component';

describe('ApprovalsViewComponent', () => {
  let component: ApprovalsViewComponent;
  let fixture: ComponentFixture<ApprovalsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovalsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
