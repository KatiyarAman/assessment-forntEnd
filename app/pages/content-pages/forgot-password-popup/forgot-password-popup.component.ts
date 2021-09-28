import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AlertService } from 'app/shared/services/alerts.service';
import { AppService } from 'app/shared/services/app.service';

@Component({
    selector: 'app-forgot-passowrd-popup',
    templateUrl: './forgot-password-popup.component.html',
    providers: [AlertService]
})
export class ForgotPasswordPopUpComponent implements OnInit {

    @Input() username: string;
    @Input() tenantId: number;
    @Output() success: EventEmitter<any> = new EventEmitter<any>();
    forgotPassword: FormGroup;
    submitted: boolean = false;

    constructor(public activeModal: NgbActiveModal, private appService: AppService, private router: Router , private route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService) {

    }

    ngOnInit(): void {
        this.forgotPassword = this.formBuilder.group({
            username: [this.username],
            email: ['',Validators.required],
            mobileNumber: ['', Validators.required],
            tenantOrClientId: [this.tenantId, Validators.required]
        });
    } 

    get form() { 
        return this.forgotPassword.controls;
    }

    submit() {
        this.submitted = true;
        if (this.forgotPassword.invalid)
            return;
        const formObject = this.appService.getNewObject(this.forgotPassword.value);
        console.log("forgot password reqeust")
        console.log(formObject);
        this.appService.forgotPassword(formObject).subscribe(data => {
            console.log("Forgot Password Response ")
            console.log(data);
            this.alertService.typeSuccess("Change Your Password", "Account Found!!");
            this.activeModal.dismiss('Close click');
            this.success.emit(data);
        }, err => {
            this.alertService.typeError("We Not Found Your Account", "Account Not Found");
        });
    }
}
