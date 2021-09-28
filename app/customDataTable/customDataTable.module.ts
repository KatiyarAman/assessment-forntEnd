import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { CustomDataTableDirective, CustomTableProperty, CustomActions } from './customDataTable/custom-dataTable.directive';
import { CustomDataTable, NgbdModalContents } from './customDataTable/custom-dataTable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ClickOutsideModule } from 'ng-click-outside';
import { CustomFilterModule } from 'app/customFilter/customFilter.module';
import { ScreenFilterModule } from 'app/screenFilter/screenFilter.module';
import { SocialShareButtons } from 'app/shared/components/social-share-buttons/social-share-buttons.component';


@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        TranslateModule,
        CustomDataTableDirective,
        CustomDataTable,
        CustomTableProperty,
        CustomActions,
        NgbdModalContents
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
        CustomFilterModule,
        ScreenFilterModule
    ],
    declarations: [
        CustomDataTableDirective,
        CustomDataTable,
        CustomTableProperty,
        CustomActions,
        NgbdModalContents
    ]
})
export class CustomDataTableModule { }
