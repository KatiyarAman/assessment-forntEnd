import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { CustomFilterModule } from 'app/customFilter/customFilter.module';
import { ScreenFilterModule } from 'app/screenFilter/screenFilter.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CustomCardListComponent, NgbdModalContents } from './customCardList/custom-card-list.component';
import { CustomActions } from './customCardList/custom-card-list.directive';

@NgModule({
    declarations: [
        CustomCardListComponent,
        NgbdModalContents,
        CustomActions
    ],
    imports : [
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
    exports: [
        CustomCardListComponent,
        CustomActions,
        NgbdModalContents
    ]
})
export class CustomCardListViewModule {
    
}