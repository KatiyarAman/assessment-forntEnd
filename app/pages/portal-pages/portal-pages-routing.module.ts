import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssessmentQuestionComponent } from "./assessment-question/assessment-question.component";
import { AssessmentTestComponent } from "./assessment-test/assessment-test.component";
import { CandidateApplyFormComponent } from "./candidate-apply-form/candidate-apply-form.component";
import { CandidateAssessmentTestComponent } from "./candidate-assessment-test/candidate-assessment-test.component";
import { CandidateProfileCompleteForm } from "./candidate-profile-complete-form/candidate-profile-complete-form.component";
import { CandidateRegistrationComponent } from "./candidate-registration-form/candidate-registration.component";
import { CandidateVerificationComponent } from "./candidate-verification/candidate-verification.component";
import { JobProfileViewComponent } from "./job-profile-view/job-profile-view.component";

const routes: Routes = [
    {
        path: "",
        children: [            
            {
                path: 'job-description',
                component: JobProfileViewComponent
            },
            {
                path: 'candidate-apply',
                component: CandidateApplyFormComponent
            },
            {
                path: 'candidate-verification',
                component: CandidateVerificationComponent
            },
            {
                path: 'candidate-registration',
                component: CandidateRegistrationComponent
            },
            {
                path: 'candidate-profile-complete-form',
                component: CandidateProfileCompleteForm
            },
            {
                path: 'candidate-assessment-test',
                component: CandidateAssessmentTestComponent
            },{
                path:'assessment-test',
                component:AssessmentTestComponent
            },{
                path:'assessment-question',
                component:AssessmentQuestionComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PortalPagesRoutingModule {

}