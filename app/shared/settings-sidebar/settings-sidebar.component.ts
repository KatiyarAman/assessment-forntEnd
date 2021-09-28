import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, Inject, Renderer2, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { AlertService } from '../services/alerts.service';
import { table } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
declare let verticleMenu: string

@Component({
  providers: [AlertService],
  selector: 'app-settings-sidebar',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.scss', '/assets/sass/libs/select.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSettingsComponent implements OnInit, AfterViewInit, OnDestroy {

  activeTab = "general";
  generalFormSubmitted = false;
  changePasswordFormSubmitted = false;
  infoFormSubmitted = false;
  alertVisible = true;

  countries = [
      { value: "USA", name: 'USA' },
      { value: "UK", name: 'UK'},
      { value: "Canada", name: 'Canada' },
  ];

  selectedLanguages = ["English", "Spanish"];
  languages = [
      { value: "English", name: 'English' },
      { value: "Spanish", name: 'Spanish'},
      { value: "French", name: 'French' },
      { value: "Russian", name: 'Russian' },
      { value: "German", name: 'German'},
      { value: "Hindi", name: 'Hindi' },
      { value: "Arabic", name: 'Arabic' },
      { value: "Sanskrit", name: 'Sanskrit'},
  ];

  selectedMusic = ["Jazz", "Hip Hop"];
  music = [
      { value: "Rock", name: 'Rock' },
      { value: "Jazz", name: 'Jazz'},
      { value: "Disco", name: 'Disco' },
      { value: "Pop", name: 'Pop' },
      { value: "Techno", name: 'Techno'},
      { value: "Folk", name: 'Folk' },
      { value: "Hip Hop", name: 'Hip Hop' },
  ];

  selectedMovies = ["The Dark Knight", "Perl Harbour"];
  movies = [
      { value: "Avatar", name: 'Avatar' },
      { value: "The Dark Knight", name: 'The Dark Knight'},
      { value: "Harry Potter", name: 'Harry Potter' },
      { value: "Iron Man", name: 'Iron Man' },
      { value: "Spider Man", name: 'Spider Man'},
      { value: "Perl Harbour", name: 'Perl Harbour' },
      { value: "Airplane!", name: 'Airplane!' },
  ];

  generalForm = new FormGroup({
    username: new FormControl('hermione007', [Validators.required]),
    name: new FormControl('Hermione Granger', [Validators.required]),
    email: new FormControl('granger007@hogward.com', [Validators.required]),
    company: new FormControl('', [Validators.required])
  });

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    retypeNewPassword: new FormControl('', [Validators.required])
  });

  infoForm = new FormGroup({
    bdate: new FormControl('', [Validators.required]),
    bio: new FormControl(''),
    phone: new FormControl('', [Validators.required]),
    website: new FormControl('')
  });

  socialForm = new FormGroup({
    twitter: new FormControl(''),
    facebook: new FormControl(''),
    googlePlus: new FormControl(''),
    linkedin: new FormControl(''),
    instagram: new FormControl(''),
    quora: new FormControl('')
  });

  public config: any = {};
  layoutSub: Subscription;
  isOpen = false;
  params: any = {}
  setParams = false;
  activeTabUrl : any
  referEarnimg : any
  settingList : any = []
  formLevelList : any = []
  private scrollContainer: any;
  @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
  // @ViewChild('settings', {static: false}) settings: ElementRef;
  
  constructor(private configService: ConfigService, private appService: AppService, private alertService: AlertService, private spinner: NgxSpinnerService, private router: Router,
    private layoutService: LayoutService, private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private cdr: ChangeDetectorRef) { 
      this.config = this.configService.templateConf;
      this.layoutSub = layoutService.toggleSettings$.subscribe(
        open => {
          // this.isOpen = open;
          this.isOpen = open
          
          let conf = this.config;
          // if(open){
          //   conf.layout.sidebar.collapsed = true;
          // }else{
          //   conf.layout.sidebar.collapsed = false;
          // }          
          this.configService.applyTemplateConfigChange({ layout: conf.layout });
          this.scrollContainer = this.scrollFrame.nativeElement;
          this.scrollToBottom()
        });
    }
  
    onClose() {
      this.layoutService.settSidebar = false
      this.layoutService.toggleSettSidebar(this.layoutService.settSidebar);
    }
    private scrollToBottom(): void {
      this.scrollContainer.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }

  ngOnInit() {
    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.cdr.markForCheck();

    })
    
    this.settingList = JSON.parse(localStorage.getItem("verticleMenu")).filter(x=>x.moduleType=='Settings')
    // console.log(this.settingList)
    this.getCustomFields(this.settingList);
  }

  getCustomFields(list){
    list.forEach(s => {
      if(s.className == 'has-sub'){
        this.getCustomFields(s.submenu)
      }else{
                 
        // console.log(s);
        this.formLevelList.push(s)
      }
    });
    // console.log(this.formLevelList)
  }

  ngAfterViewInit() {
    
  }

  ngOnDestroy() {
    let conf = this.config;
    conf.layout.sidebar.collapsed = false;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  goto(tab) {
    // console.log(tab)
    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      this.appService.getCutomFields(tab.id).subscribe(data=>{            
         console.log(data)
        
        // console.log(this.headerObject)
        this.spinner.hide();
        // console.log(this.route.parent)
        // action: event.action, moduleId: 112, fields: event.fields, moduleName: this.params.title,headerObject: this.params.headerObject,apiPath: this.params.apiPath
        // if(this.layoutService.settSidebar){
        this.layoutService.settSidebar = false
        // }
        this.layoutService.toggleSettSidebar(this.layoutService.settSidebar);
        this.router.navigate([tab.path, {moduleUrl: tab.path, moduleId: tab.id, apiPath: tab.apiPath, headerObject: JSON.stringify(data["data"]), title: tab.title, buttons: JSON.stringify(data["buttons"])}], {  relativeTo: this.route.parent, skipLocationChange: true } );
          // console.log(this.fieldList)
      },error=>{
          console.log(error)
          // this.alertService.typeError(error.error["message"], error.error["status"]+"-"+error.error["error"])
      })
    // console.log(tab)
    // this.activeTab = tab.id;
    // this.appService.getCutomFields(tab.id).subscribe(fields=>{
    //   this.params["moduleId"] = tab.id
    //   this.params["action"] = 'settings'
    //   this.params["apiPath"] = tab.apiPath
    //   this.params["headerObject"] = ""
    //   this.params["fields"] = JSON.stringify(fields)
    //   this.params["moduleName"] = tab.title
    //   this.setParams = true
    // })
  }

  get gf() {
    return this.generalForm.controls;
  }

  get cpf() {
    return this.changePasswordForm.controls;
  }

  get inf() {
    return this.infoForm.controls;
  }

  onGeneralFormSubmit() {
    this.generalFormSubmitted = true;
    if (this.generalForm.invalid) {
      return;
    }
  }

  onChangePasswordFormSubmit() {
    this.changePasswordFormSubmitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
  }

  onInfoFormSubmit() {
    this.infoFormSubmitted = true;
    if (this.infoForm.invalid) {
      return;
    }
  }

  onSocialFormSubmit() {
    if (this.socialForm.invalid) {
      return;
    }
  }

}
