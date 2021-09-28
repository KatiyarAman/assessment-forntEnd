import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateAssessmentTestComponent } from './candidate-assessment-test.component';

describe('CandidateAssessmentTestComponent', () => {
  let component: CandidateAssessmentTestComponent;
  let fixture: ComponentFixture<CandidateAssessmentTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateAssessmentTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidateAssessmentTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
