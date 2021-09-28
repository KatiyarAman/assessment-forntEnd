import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ArchwizardModule } from 'angular-archwizard';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill';
import { CustomWizardForm } from './customWizardForm/custom-wizard-form.component';

@NgModule({
    declarations: [
        CustomWizardForm
    ],
    imports: [
        ArchwizardModule,
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        QuillModule.forRoot(),
        NouisliderModule,
        TagInputModule,
        NgSelectModule,
        HttpClientModule
    ],
    exports: [
        CustomWizardForm,
        NgbModule,
        NgbCollapseModule
    ]
})
export class CustomWizardFormModule {

}