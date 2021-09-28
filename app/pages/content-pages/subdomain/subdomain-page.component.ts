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
  selector: 'app-login-page',
  providers: [AlertService],
  templateUrl: './subdomain-page.component.html',
  styleUrls: ['./subdomain-page.component.scss']
})

export class SubdomainPageComponent implements OnInit {

  loginFormSubmitted = false;
  isLoginFailed = false;
  loginForm: FormGroup
  returnUrl: any
  loading = false
  error = ""
  swal =  swalFunctions;
  public menuItems: any[];
  // loginForm = new FormGroup({
  //   username: new FormControl('guest@apex.com', [Validators.required]),
  //   password: new FormControl('Password', [Validators.required]),
  //   rememberMe: new FormControl(true)
  // });

  


  constructor(private router: Router, private authService: AuthService, private modalService: NgbModal,
    private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private alertService: AlertService,
    private route: ActivatedRoute, private appService: AppService) {
  }

  ngOnInit(){
    console.log(this.route)
    this.route.params.subscribe(params => {
      // this.onCustomAction(params);
      // this.params = params;
      console.log(params)
      if(params.error){
        this.error = params.error
      }
      // this.params = params
      // this.appService
    });
    
    this.loginForm = this.formBuilder.group({
      subdomain: new FormControl('', [Validators.required]),
      // password: new FormControl('', [Validators.required]),
      // tenantOrClientId: new FormControl('', [Validators.required])
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  get lf() {
    return this.loginForm.controls;
  }

  // openContent(username) {
  //   const modalRef = this.modalService.open(ChangePasswordComponent);
  //   modalRef.componentInstance.name = 'Enter Trial Period in Days!';
  //   // console.log(this.id+'--'+this.trialPeriod)
  //   modalRef.componentInstance.username = username
  //   // modalRef.componentInstance.trialPeriod = this.trialPeriod
  //   modalRef.componentInstance.success.subscribe((result)=>{
  //       console.log(result)
  //       this.appService.getMenuList().subscribe(menu=>{
  //         console.log(menu)
  //         // this.appService.ROUTES = this.getProperMenu(menu["data"]);
  //         window.localStorage.setItem("verticleMenu",JSON.stringify(this.getProperMenu(menu["data"])))
  //         this.spinner.hide();
  //         this.router.navigate([this.returnUrl]);
  //       },error=>{
  //         console.log(error)
  //         this.alertService.typeError(error["error"], error["status"]+"-Error in Menu List")
  //       })
  //       // this.getSourceData()
  //       // this.router.navigate([this.returnUrl]);
  //   })
  // }
  // On submit button click
  onSubmit() {console.log("test")
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
    this.appService.subdomain(credentials.subdomain).subscribe(data => {
      console.log(data)
      this.spinner.hide();
      window.localStorage.setItem("subdomain",credentials.subdomain)
      console.log("/"+credentials.subdomain+'/pages/login')
      window.location.href = environment.httpPath+document.location.host+"/"+credentials.subdomain
      console.log(window.location.href)
      // window.localStorage.setItem("tenantId",data)
      // this.router.navigate(["/"+credentials.subdomain,{tenantId: data, returnUrl: this.returnUrl}]);
    },
    error => {
        console.log(error)
        this.spinner.hide();
        this.isLoginFailed = true;
        this.error = error.message;
        this.loading = false;
        this.loginForm.reset();
    });
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
      menu["submenu"] = this.getProperMenu(menu["subModules"])
    });
    // console.log(menuList)
    return menuList
  }

}
