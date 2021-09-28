import { NgModule } from "@angular/core";
import { PortalPagesRoutingModule } from "./portal-pages-routing.module";
import { AssessmentToolService } from '../../shared/services/assessment-tool.service';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { JobProfileViewComponent } from "./job-profile-view/job-profile-view.component";
import { CandidateApplyFormComponent } from "./candidate-apply-form/candidate-apply-form.component";
import { CandidateVerificationComponent } from "./candidate-verification/candidate-verification.component";
import { CandidateRegistrationComponent } from "./candidate-registration-form/candidate-registration.component";
import { CustomFormModule } from '../../customForm/customFrom.module';
import { CandidateProfileCompleteForm } from "./candidate-profile-complete-form/candidate-profile-complete-form.component";
import { JobProfilePopupComponent } from "./job-profile-popup/job-profile-popup.component";
import { CandidateAssessmentTestComponent } from './candidate-assessment-test/candidate-assessment-test.component';
import { AssessmentTestComponent } from './assessment-test/assessment-test.component';
import { AssessmentQuestionComponent } from './assessment-question/assessment-question.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        PortalPagesRoutingModule,
        CustomFormModule
    ],
    declarations:[
        JobProfileViewComponent,
        CandidateApplyFormComponent,
        CandidateVerificationComponent,
        CandidateRegistrationComponent,
        CandidateProfileCompleteForm,
        JobProfilePopupComponent,
        CandidateAssessmentTestComponent,
        AssessmentTestComponent,
        AssessmentQuestionComponent,    ],
    providers: [
        AssessmentToolService
    ]
})
export class PortalModule {}