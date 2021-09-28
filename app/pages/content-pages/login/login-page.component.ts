import { Component, ViewChild, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { AppService } from 'app/shared/services/app.service';
import { AuthService } from 'app/shared/auth/auth.service';
import * as swalFunctions from 'app/shared/data/sweet-alerts';
import { NgbTooltip, NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'app/shared/services/alerts.service';
import { environment } from 'environments/environment';
import { ForgotPasswordPopUpComponent } from '../forgot-password-popup/forgot-password-popup.component';
import { CookieStorage } from 'cookie-storage';
import { RememberMeService } from '../../../shared/services/remember-me.service';
declare let returnUrl :string
declare let oauthToken: string
declare let verticleMenu: string

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
          <div class="form-group position-relative has-icon-right" >
            <input class="form-control" type="password" name="newPassword" id="newPassword" formControlName="newPassword" [ngClass]="{'is-invalid': submitted && f.newPassword.errors}" placeholder="New Password" required appPassword />
            <small class="form-text text-muted danger" *ngIf="submitted && f.newPassword.errors && f.newPassword.errors.required">Please Enter New Password</small>
          </div>
          <div class="form-group position-relative has-icon-right" >
            <input class="form-control" type="password" name="confirmPassword" id="confirmPassword" formControlName="confirmPassword" [ngClass]="{'is-invalid': submitted && (f.confirmPassword.errors || notMatch)}" placeholder="Reenter Password" required appPassword />
            <small class="form-text text-muted danger" *ngIf="submitted && f.confirmPassword.errors && f.confirmPassword.errors.required">Please ReEnter Password</small>
            <small class="form-text text-muted danger" *ngIf="submitted && notMatch">Password Not Matched</small>
          </div>
      </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary btn-raised btn-info" (click)="save()">Save</button>
    <button type="button" class="btn btn-secondary btn-raised btn-danger" (click)="activeModal.dismiss('Close click')">Close</button>
  </div>
`
})

export class ChangePasswordComponent implements OnInit {
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
  selector: 'ngbd-modal-otp',
  providers: [AlertService],
  template: `
  <div class="modal-header">
    <h4 class="modal-title">Hi there!</h4>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
      <p>OTP</p>
      <form [formGroup]="otpForm" noValidate>
        <input type="hidden" formControlName="tenantOrClientId" class="form-control" placeholder="Subscriber Id" />
        <input type="hidden" formControlName="username" class="form-control" placeholder="Username" />
        <input type="hidden" formControlName="password" class="form-control" placeholder="Password" />
          <div class="form-group position-relative has-icon-right" >
            <input class="form-control" type="password" name="otp" id="otp" formControlName="otp" [ngClass]="{'is-invalid': submitted && f.otp.errors}"  />
            <small class="form-text text-muted danger" *ngIf="submitted && f.otp.errors && f.otp.errors.required">Please Enter OTP</small>
          </div>
      </form>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary btn-raised btn-info" (click)="save()">Submit</button>
    <button type="button" class="btn btn-secondary btn-raised btn-danger" (click)="activeModal.dismiss('Close click')">Close</button>
  </div>
`
})

export class OTPComponent implements OnInit {
  // @Input() url: String;
  @Input() loginDetails: string;
  @Output() success: EventEmitter<any> = new EventEmitter()
  submitted = false
  notMatch = false;
  otpForm  : FormGroup
  
  constructor(public activeModal: NgbActiveModal, private appService: AppService, private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService, private authService: AuthService) { 
      
      //api/user/
  }

  ngOnInit(){
      // console.log("test" + this.appService.menuId)
      console.log(this.loginDetails)
      let loginObject = JSON.parse(this.loginDetails)
      this.otpForm = this.formBuilder.group({
        username: new FormControl(loginObject.username),
        password: new FormControl(loginObject.password),
        tenantOrClientId: new FormControl(loginObject.tenantOrClientId),
        otp: ['',Validators.required]
      })
      //console.log(this.username)
      
      // this.trialPeriodForm.setValue({id: this.id, trialPeriod: this.trialPeriod})
  }

  get f() { return this.otpForm.controls }
  save(){
      this.submitted = true
      if(this.otpForm.invalid){
          return
      }
      const formObject = this.appService.getNewObject(this.otpForm.value)
      console.log(formObject)
      this.authService.signinUser(formObject).subscribe(data=>{
          console.log(data)
          console.log(data)
          this.activeModal.dismiss('Close click')
          this.success.emit(data)
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
  providers: [AlertService],
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
  urlGoogle = environment.login_url+"/oauth2/authorize/google?redirect_uri="+environment.root
  urlFacebook = environment.login_url+"/oauth2/authorize/facebook?redirect_uri="+environment.root
  swal =  swalFunctions;
  public menuItems: any[];

  constructor(private router: Router, private authService: AuthService, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private alertService: AlertService,
    private route: ActivatedRoute, private appService: AppService, private rememberMeService: RememberMeService) {
  }
  params: any
  ngOnInit(){
    this.returnUrl = returnUrl
    this.route.params.subscribe(params => {
      // this.onCustomAction(params);
      // this.params = params;
      console.log(params)
      this.params = params
      // this.appService
    });
    if(localStorage.getItem("error")){
      this.error = localStorage.getItem("error")
      localStorage.removeItem("error")
    }
    if(localStorage.getItem(environment.oauth_token)){
      this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      this.appService.getMenuList().subscribe(menu=>{
        console.log(menu)
        // this.appService.ROUTES = this.getProperMenu(menu["data"]);
        verticleMenu = JSON.stringify(this.getProperMenu(menu["data"]))
        localStorage.setItem("verticleMenu",verticleMenu)
        this.appService.getModuleActions(120).subscribe(actions=>{
          console.log(actions)
          // this.appService.ROUTES = this.getProperMenu(menu["data"]);
          // localStorage.setItem("actions",JSON.stringify(actions))
          this.spinner.hide();
          localStorage.removeItem("tenantId")
          this.router.navigate([this.returnUrl]);
        },error=>{
          console.log(error)
          this.alertService.typeError(error["error"], error["status"]+"-Error in Menu List")
        })
        // this.spinner.hide();
        
      },error=>{
        console.log(error)
        this.alertService.typeError(error["error"], error["status"]+"-Error in Menu List")
      })
    }
    console.log(this.params.token)
  
  
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      tenantOrClientId: new FormControl(localStorage.getItem("tenantId")),
      rememberme: new FormControl(false)
    });
    
    if (this.rememberMeService.isRememberMeCookieAvailable()) {
      let credentails = this.rememberMeService.getCredentialsFromCookie();
      console.log(credentails);
      this.loginForm.setValue(credentails);
      this.onSubmit();
    }
    // this.returnUrl = this.params.returnUrl
  }

  get lf() {
    return this.loginForm.controls;
  }

  openContent(username, forgotPassword) {
    const modalRef = this.modalService.open(ChangePasswordComponent);
    modalRef.componentInstance.name = 'Enter Trial Period in Days!';
    // console.log(this.id+'--'+this.trialPeriod)
    modalRef.componentInstance.username = username
    // modalRef.componentInstance.trialPeriod = this.trialPeriod
    modalRef.componentInstance.success.subscribe((result) => {
      console.log(result)
      if (!forgotPassword) {
          this.appService.getMenuList().subscribe(menu => {
          console.log(menu)
          // this.appService.ROUTES = this.getProperMenu(menu["data"]);
          verticleMenu = JSON.stringify(this.getProperMenu(menu["data"]))
          localStorage.setItem("verticleMenu",verticleMenu)
          this.appService.getModuleActions(120).subscribe(actions=>{
            console.log(actions)
            // this.appService.ROUTES = this.getProperMenu(menu["data"]);
            // localStorage.setItem("actions",JSON.stringify(actions))
            this.spinner.hide();
            localStorage.removeItem("tenantId")
            this.router.navigate([this.returnUrl]);
          },error=>{
            console.log(error)
            this.alertService.typeError(error["error"], error["status"]+"-Error in Menu List")
          })
        },error=>{
          console.log(error)
          this.alertService.typeError(error["error"], error["status"]+"-Error in Menu List")
        })
      }
      //Clear the auth token from local storage and redirect to login page.
      else {
        this.authService.logout();
      }
      // this.getSourceData()
      // this.router.navigate([this.returnUrl]);
    });
  }

  openOTP(loginDetails) {
    const modalRef = this.modalService.open(OTPComponent);
    modalRef.componentInstance.name = 'Enter OTP';
    // console.log(this.id+'--'+this.trialPeriod)
    modalRef.componentInstance.loginDetails = loginDetails
    // modalRef.componentInstance.trialPeriod = this.trialPeriod
    modalRef.componentInstance.success.subscribe((result)=>{
        console.log(result)
        this.callMainMenu(result)
    })
  }
  // On submit button click
  onSubmit() {
    console.log("test");
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

    this.loginForm.get('tenantOrClientId').setValue(localStorage.getItem("tenantId"));

    const credentials = this.appService.getNewObject(this.loginForm.value)
    console.log(credentials);
    
    this.loading = true
    this.loginFormSubmitted = false;
    this.authService.signinUser(credentials).subscribe(data => {
      console.log(data)
      if(data.errorCode && data.errorCode == 2001){
        let success = this.openOTP(JSON.stringify(credentials))
        console.log(success)
      } else if (data["token"]) {
        if (credentials.rememberme) {
          console.log("Saving Credentials to cookie");
          this.rememberMeService.saveCredentialsToCookie(credentials);
        }
        this.callMainMenu(data);
      }
    },
    error => {
        console.log(error)
        this.spinner.hide();
        this.isLoginFailed = true;
        this.error = error.error;
        this.loading = false;
        this.loginForm.reset();
        this.loginForm.get("tenantOrClientId").setValue(localStorage.getItem("tenantId"))
    });
  }

  callMainMenu(data){
    if(data["firstLogin"]){
      // this.swal.ChangePassWord(this.returnUrl)
      this.openContent(data["userName"], data["forgotPasswordToken"])
    } else {
      this.appService.getMenuList().subscribe(menu => {
        console.log(menu)
        // this.appService.ROUTES = this.getProperMenu(menu["data"]);
        verticleMenu = JSON.stringify(this.getProperMenu(menu["data"]))
        localStorage.setItem("verticleMenu",verticleMenu)
        this.appService.getModuleActions(120).subscribe(actions=>{
          console.log(actions)
          // this.appService.ROUTES = this.getProperMenu(menu["data"]);
          // localStorage.setItem("actions",JSON.stringify(actions))
          this.spinner.hide();
          localStorage.removeItem("tenantId")
          this.router.navigate([this.returnUrl]);
        },error=>{
          console.log(error)
          this.alertService.typeError(error["error"], error["status"]+"-Error in Menu List")
        })
      },error=>{
        console.log(error)
        this.alertService.typeError(error["error"], error["status"]+"-Error in Menu List")
      })
      
    }
  }

  getProperMenu(menuList){
    
    menuList.forEach(menu => {
      if(menu["parentId"] == null){
        menu["parentId"] = 0
      }      
      if(menu["apiPath"] == null){
        menu["apiPath"] = ""
      }
      if(menu["badge"] == null){
        menu["badge"]=""
      }
      if(menu["badgeClass"] == null){
        menu["badgeClass"]=""
      }
      if(menu["path"] == null){
        menu["path"]=""
      }      
      if(menu["className"] == null){
        menu["className"]=""
      }
      if(menu["icon"] == null){
        menu["icon"] = ""
      }
      if(menu["subModules"]){
        menu["submenu"] = this.getProperMenu(menu["subModules"])
      }else{
        menu["submenu"] = []
      }
      
    });
    // console.log(menuList)
    return menuList
  }

  forgotPassword() {
    const modelRef: NgbModalRef = this.modalService.open(ForgotPasswordPopUpComponent);
    modelRef.componentInstance.username = this.loginForm.get('username').value;
    modelRef.componentInstance.tenantId = this.loginForm.get('tenantOrClientId').value;
    modelRef.componentInstance.success.subscribe(user => {
      if (user && user.token) {
        // temporary saving the token to local storage for changing the password
        oauthToken =  user.token;
        localStorage.setItem(environment.oauth_token,user.token)
        this.openContent(user.userName, user.forgotPasswordToken);
      }
    });
  }
}
