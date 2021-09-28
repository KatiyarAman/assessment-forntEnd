import { NgModule } from '@angular/core';
import { AssessmentToolRoutingModule } from './assessment-tool-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssessmentWelcomeScreen } from './assessment-welcome-screen/assessment-welcome-screen.component';
import { AssessmentScreenWrapperComponent } from './assessment-screens-wrapper/assessment-screen-wrapper.component';

@NgModule({
    declarations: [
        AssessmentScreenWrapperComponent,
        AssessmentWelcomeScreen
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AssessmentToolRoutingModule
    ]
})
export class AssessmentToolModule {

}