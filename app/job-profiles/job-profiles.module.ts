import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { JobProfilesRoutingModule} from "./job-profiles-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgSelectModule } from '@ng-select/ng-select';
import { IndexComponent } from "./index/index.component";
import { CustomDataTableModule } from 'app/customDataTable/customDataTable.module';
import { CustomFormModule } from 'app/customForm/customFrom.module';
import { FormComponent } from './form/form.component';
import { JobProfilesComponent } from './job-profiles.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomWizardFormModule } from 'app/customWizardForm/custom-wizard-form.module';
//import { ViewComponent } from './view/view.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule,
        NgSelectModule,
        HttpClientModule,
        JobProfilesRoutingModule,
        CustomDataTableModule,
        ArchwizardModule,
        CustomFormModule,
        CustomWizardFormModule
    ],
    declarations: [
        JobProfilesComponent,
        IndexComponent,
        FormComponent,
        // NgbdModalContent
       // ViewComponent
    ],
    providers:[]

})
export class JobProfilesModule { }
