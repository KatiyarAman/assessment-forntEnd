import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { ERPRoutingModule } from "./erp-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { ERP } from './erp.component';
import { ChangeCredComponent,LoginPageComponent } from './login/login-page.component';
import { NgxSpinnerModule } from 'ngx-spinner';
//import { ViewComponent } from './view/view.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        HttpClientModule,
        ERPRoutingModule,
        NgxSpinnerModule
    ],
    declarations: [
        ERP,
        LoginPageComponent,
        ChangeCredComponent
        // NgbdModalContent
       // ViewComponent
    ],
    providers:[]

})
export class ERPModule { }
