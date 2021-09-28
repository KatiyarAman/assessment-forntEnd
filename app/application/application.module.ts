import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClickOutsideModule } from 'ng-click-outside';
import { CustomActions, CustomDataTableDirective, CustomTableProperty } from './customDataTable/custom-dataTable.directive';
import { CustomDataTable, NgbdModalContents } from './customDataTable/custom-dataTable.component';
import { Dashboard3Component, TourdModalContents1 } from './dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboard4/dashboard4.component';
import { CustomFormDesign } from './customFormDesign/custom-formDesign.component';
import { SkillCardComponent } from './skillCardComponent/skill-card.component';
import { ScreenFilterDesign } from './screenFilterDesign/screen-filterDesign.component';
import { CustomFilterDesign } from './customFilterDesign/custom-filterDesign.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { ChartistModule } from 'ng-chartist';
import { NgApexchartsModule } from 'ng-apexcharts';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { CustomFormDirective, VarDirective } from './customFormDesign/custom-formDesign.directive';
import { ApplicationComponent } from './application.component';
import { ApprovalsViewComponent } from './approvalsView/approvalsView.component';
import { CustomScreenFilters } from './customScreenFilters/customScreenFilters.component';
import { CustomCardListComponent } from './customCardList/custom-card-list.component';
import { WebcamComponent } from './webcam/webcam.component';
import { ArchwizardModule } from 'angular-archwizard';
import { QuillModule } from 'ngx-quill';
import { NouisliderModule } from 'ng2-nouislider';
import { TagInputModule } from 'ngx-chips';
import { CustomCardSelectorComponent } from './custom-card-selector/custom-card-selector.component';
import { CustomCardSelectorGroupComponent } from './custom-card-selector-group/custom-card-selector-group.component';
import { QuestionnaireAutoPickModal } from './questionnaireAutoPickModal/questionnaire-auto-pick-modal.component';
import { QuestionnaireListModalComponent } from './questionnaireListModal/questionnaire-list-modal.component';
import { QuestionRowComponent } from './questionRow/question-row.component';
import { HiringRoundComponent } from './hiring-round/hiring-round.component';
import { PopupFormDesign } from './popupForm/popupForm.component';

@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        TranslateModule
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule,
        PerfectScrollbarModule,
        NgSelectModule,
        HttpClientModule,
        ClickOutsideModule,
        NgxSpinnerModule,
        TranslateModule,
        ApplicationRoutingModule,
        ChartistModule,
        NgApexchartsModule,
        NgbModule,
        MatchHeightModule,
        AngularResizedEventModule,
        SwiperModule,
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
    ],
    declarations: [
        ApplicationComponent,
        CustomDataTableDirective,
        CustomDataTable,
        CustomCardListComponent,
        CustomTableProperty,
        CustomActions,
        NgbdModalContents,
        Dashboard3Component,
        Dashboard4Component,
        CustomFormDesign,
        SkillCardComponent,
        ScreenFilterDesign,
        CustomFilterDesign,
        CustomScreenFilters,
        TourdModalContents1,        
        CustomFormDirective,
        VarDirective,
        WebcamComponent,
        ApprovalsViewComponent,
        CustomCardSelectorComponent,
        CustomCardSelectorGroupComponent,
        QuestionnaireAutoPickModal,
        QuestionnaireListModalComponent,
        QuestionRowComponent,
        HiringRoundComponent,
        PopupFormDesign,
    ]
})
export class ApplicationModule { }
