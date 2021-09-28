import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { HttpClientModule } from '@angular/common/http';
import { ScreenFilterDesign } from './screenFilterDesign/screen-filterDesign.component';
import { ScreenFilterDirective, ScreenVarDirectives } from './screenFilterDesign/screen-filterDesign.directive';



@NgModule({
    exports: [
        CommonModule,
        NgbModule,
        TranslateModule,
        ScreenFilterDesign,
        ScreenFilterDirective,
        ScreenVarDirectives
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
        TranslateModule  
    ],
    declarations: [        
        ScreenFilterDesign,
        ScreenFilterDirective,
        ScreenVarDirectives
    ]
})
export class ScreenFilterModule { }
