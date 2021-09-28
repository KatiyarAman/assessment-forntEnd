import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { TagInputModule } from 'ngx-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';
import { SkillCardComponent } from './skillCardComponent/skill-card.component';
import { QuestionnaireListModalComponent } from './questionnaireListModal/questionnaire-list-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomFormDesign } from './customFormDesign/custom-formDesign.component';
import { CustomFormDirective, VarDirective } from './customFormDesign/custom-formDesign.directive';
import { QuillModule } from 'ngx-quill';
import { NouisliderModule } from 'ng2-nouislider';
import { QuestionRowComponent } from './questionRow/question-row.component';
import { QuestionnaireDetailsComponent } from './quetionnaireDetails/questionnaire-details.component';
import { QuestionnaireAutoPickModal } from './questionnaireAutoPickModal/questionnaire-auto-pick-modal.component';
import { SelectedQuestionsListComponent } from './selectedQuestionsList/selected-questions-list.component';
import { CustomCardSelectorComponent } from './custom-card-selector/custom-card-selector.component';
import { CustomCardSelectorGroupComponent } from './custom-card-selector-group/custom-card-selector-group.component';
import { ArchwizardModule } from 'angular-archwizard';
import { WebcamComponent } from './webcam/webcam.component';
import { IntroVideoRecorder } from './introVideoRecorder/intro-video-recorder.component';
import { PortalFormDesign } from './poratalCustomFormDesign/portal-form.component';
import { PortalFormDirective } from './poratalCustomFormDesign/portal-form.directive';
import { PopupFormDesign } from './popupForm/popupForm.component';
// import {
//     SocialLoginModule, 
//     SocialAuthServiceConfig,
//     GoogleLoginProvider
//   } from 'angularx-social-login';

  
@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        NgbCollapseModule,
        TranslateModule,
        CustomFormDesign,
        CustomFormDirective,
        VarDirective,
        PortalFormDesign,
        PortalFormDirective,
        PopupFormDesign
    ],
    imports: [
        ArchwizardModule,
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        PerfectScrollbarModule,
        QuillModule.forRoot(),
        NouisliderModule,
        TagInputModule,
        NgSelectModule,
        HttpClientModule,
        TranslateModule,
        // SocialLoginModule,        
    ],
    declarations: [        
        CustomFormDesign,
        SkillCardComponent,
        QuestionRowComponent,
        QuestionnaireDetailsComponent,
        QuestionnaireListModalComponent,
        QuestionnaireAutoPickModal,
        SelectedQuestionsListComponent,
        CustomCardSelectorComponent,
        CustomCardSelectorGroupComponent,
        CustomFormDirective,
        VarDirective,
        WebcamComponent,
        PortalFormDesign,
        PortalFormDirective,
        IntroVideoRecorder,
        PopupFormDesign
    ],
    providers: [
    //   {
    //     provide: 'SocialAuthServiceConfig',
    //     useValue: {
    //         autoLogin: false,
    //         providers: [
    //             {
    //                 id: GoogleLoginProvider.PROVIDER_ID,
    //                 provider: new GoogleLoginProvider(
    //                 'clientId'
    //                 )
    //             },
    //         ]
    //     } as SocialAuthServiceConfig,
    //     }
    ]
})
export class CustomFormModule { }
