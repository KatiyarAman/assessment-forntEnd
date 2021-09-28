import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentToolService } from 'app/shared/services/assessment-tool.service';

@Component({
  selector: 'app-candidate-verification',
  templateUrl: './candidate-verification.component.html',
  styleUrls: ['./candidate-verification.component.scss']
})
export class CandidateVerificationComponent implements OnInit {

  constructor(private route: ActivatedRoute, private assessmentToolService: AssessmentToolService) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.assessmentToolService.verifyCandidateEmail(params.verificationToken, params.token,params.jobPostingId)
    });
  }

}
