import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'app/shared/services/app.service';
import { AuthService } from 'app/shared/auth/auth.service';
import * as swalFunctions from 'app/shared/data/sweet-alerts';
import { NgbTooltip, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'app/shared/services/alerts.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'ngbd-modal-contents',
  providers: [AlertService],
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Hi there!</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
      <p>Change Password</p>
      <form [formGroup]="changePassword" noValidate>
          <input type="hidden" name="username" id="username" formControlName="username"/>
          <input class="form-control" type="password" name="newPassword" id="newPassword" formControlName="newPassword" [ngClass]="{'is-invalid': submitted && f.newPassword.errors}" placeholder="New Password" required />
          <small class="form-text text-muted danger" *ngIf="submitted && f.newPassword.errors && f.newPassword.errors.required">Please Enter New Password</small>
          <br>
          <input class="form-control" type="password" name="confirmPassword" id="confirmPassword" formControlName="confirmPassword" [ngClass]="{'is-invalid': submitted && (f.confirmPassword.errors || notMatch)}" placeholder="Reenter Password" required />
          <small class="form-text text-muted danger" *ngIf="submitted && f.confirmPassword.errors && f.confirmPassword.errors.required">Please ReEnter Password</small>
          <small class="form-text text-muted danger" *ngIf="submitted && notMatch">Password Not Matched</small>
      </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary btn-raised btn-info" (click)="save()">Save</button>
    <button type="button" class="btn btn-secondary btn-raised btn-danger" (click)="activeModal.dismiss('Close click')">Close</button>
  </div>
`
})

export class ChangeCredComponent implements OnInit {
  // @Input() url: String;
  @Input() username: number;
  @Output() success: EventEmitter<any> = new EventEmitter()
  submitted = false
  notMatch = false;
  changePassword  : FormGroup
  
  constructor(public activeModal: NgbActiveModal, private appService: AppService, private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService) { 
      
      //api/user/
  }

  ngOnInit(){
      // console.log("test" + this.appService.menuId)
      this.changePassword = this.formBuilder.group({
          username: [this.username],
          newPassword: ['',Validators.required],
          confirmPassword: ['',Validators.required]
      })
      console.log(this.username)
      
      // this.trialPeriodForm.setValue({id: this.id, trialPeriod: this.trialPeriod})
  }

  get f() { return this.changePassword.controls }
  save(){
      this.submitted = true
      if(this.changePassword.invalid){
          return
      }
      const formObject = this.appService.getNewObject(this.changePassword.value)
      if(formObject["newPassword"] != formObject["confirmPassword"]){
        this.notMatch = true
        return
      }
      formObject["oldPassword"] = ""
      console.log(formObject)
      // environment.api_url=environment.base_url+"/client";
      this.appService.changePassword(formObject).subscribe(data=>{
          console.log(data)
          console.log(data)
          this.alertService.typeSuccess("Password Has been Change Successfully!","Success!");
          this.activeModal.dismiss('Close click')
          this.success.emit(data)
          // environment.api_url=environment.base_url+"/clients";
          // this.redirect()
         
          
      },
      error=>{
          console.log(error)
          this.alertService.typeError(error.message,"Inconceivable!");
      })
  }
  // redirect(){
  //     this.router.navigate(['/adminpanel/clientMaster'],{  relativeTo: this.route.parent, skipLocationChange: true })
  // }
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit {

  loginFormSubmitted = false;
  isLoginFailed = false;
  loginForm: FormGroup
  returnUrl: any
  loading = false
  error = ""
  swal =  swalFunctions;
  // loginForm = new FormGroup({
  //   username: new FormControl('guest@apex.com', [Validators.required]),
  //   password: new FormControl('Password', [Validators.required]),
  //   rememberMe: new FormControl(true)
  // });

  


  constructor(private router: Router, private authService: AuthService, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder,
    private route: ActivatedRoute, private appService: AppService) {
  }

  ngOnInit(){
    this.route.params.subscribe(params=>{
      console.log(environment.returnUrl)
      console.log(environment.event)
    })
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      tenantOrClientId: new FormControl('', [Validators.required])
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  get lf() {
    return this.loginForm.controls;
  }

  openContent(username) {
    const modalRef = this.modalService.open(ChangeCredComponent);
    modalRef.componentInstance.name = 'Enter Trial Period in Days!';
    // console.log(this.id+'--'+this.trialPeriod)
    modalRef.componentInstance.username = username
    // modalRef.componentInstance.trialPeriod = this.trialPeriod
    modalRef.componentInstance.success.subscribe((result)=>{
        console.log(result)
        // this.getSourceData()
        this.router.navigate([this.returnUrl]);
    })
  }
  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
    {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    const credentials = this.appService.getNewObject(this.loginForm.value)
    console.log(credentials);
    // this.authService.signinUser(this.loginForm.value.username, this.loginForm.value.password)
    //   .then((res) => {
    //     this.spinner.hide();
    //     this.router.navigate(['/dashboard/dashboard1']);
    //   })
    //   .catch((err) => {
    //     this.isLoginFailed = true;
    //     this.spinner.hide();
    //     console.log('error: ' + err)
    //   }
    //   );
    
    this.loading = true
    this.loginFormSubmitted = false;
    this.authService.signinUser(credentials).subscribe(data => {
        console.log(data)
        this.spinner.hide();
        if(data["firstLogin"]){
          // this.swal.ChangePassWord(this.returnUrl)
          this.openContent(data["userName"])
        }else{
          this.router.navigate(['/dashboard/dashboard1',{moduleId: 2, apiPath: ''}], {  relativeTo: this.route.parent, skipLocationChange: true });
        }
        
        
    },
    error => {
        console.log(error)
        this.spinner.hide();
        this.isLoginFailed = true;
        this.error = error.error;
        this.loading = false;
        this.loginForm.reset();
    });
  }

}
