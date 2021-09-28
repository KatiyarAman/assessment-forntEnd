import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { ContentPagesRoutingModule } from "./content-pages-routing.module";

import { ComingSoonPageComponent } from "./coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "./error/error-page.component";
import { ForgotPasswordPageComponent } from "./forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "./lock-screen/lock-screen-page.component";
import { LoginPageComponent, ChangePasswordComponent, OTPComponent } from "./login/login-page.component";
import { MaintenancePageComponent } from "./maintenance/maintenance-page.component";
import { RegisterPageComponent } from "./register/register-page.component";
import { AppPasswordDirective } from './login/password.directive';
import { SubdomainPageComponent } from './subdomain/subdomain-page.component';
import { ForgotPasswordPopUpComponent } from './forgot-password-popup/forgot-password-popup.component';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';

@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
    ],

    declarations: [
        ComingSoonPageComponent,
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        RegisterPageComponent,
        ChangePasswordComponent,
        AppPasswordDirective,
        SubdomainPageComponent,
        ForgotPasswordPopUpComponent,
        OTPComponent
    ],
    providers: [
    ]
})
export class ContentPagesModule {}
