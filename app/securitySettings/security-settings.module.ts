import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { IndexComponent } from "./index/index.component";
import { CustomDataTableModule } from 'app/customDataTable/customDataTable.module';
import { CustomFormModule } from 'app/customForm/customFrom.module';
import { FormComponent } from './form/form.component';
import { SecuritySettingsComponent } from './security-settings.component';
import { SecuritySettingsRoutingModule } from './security-settings-routing.module';
//import { ViewComponent } from './view/view.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        HttpClientModule,
        SecuritySettingsRoutingModule,
        CustomDataTableModule,
        CustomFormModule
    ],
    declarations: [
        SecuritySettingsComponent,
        IndexComponent,
        FormComponent,
        // NgbdModalContent
       // ViewComponent
    ],
    providers:[]

})
export class SecuritySettingsModule { }
