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
import { ModuleActionMappingRoutingModule } from './module-action-mapping-routing.module';
import { ModuleActionMappingComponent } from './module-action-mapping.component';
//import { ViewComponent } from './view/view.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        HttpClientModule,
        ModuleActionMappingRoutingModule,
        CustomDataTableModule,
        CustomFormModule
    ],
    declarations: [
        ModuleActionMappingComponent,
        IndexComponent,
        FormComponent,
        // NgbdModalContent
       // ViewComponent
    ],
    providers:[]

})
export class ModuleActionMappingModule { }