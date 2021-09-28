import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Inject, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Subscription, Observable, timer } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { DOCUMENT } from '@angular/common';
import { CustomizerService } from '../services/customizer.service';
import { FormControl } from '@angular/forms';
import { LISTITEMS } from '../data/template-search';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { map, shareReplay } from 'rxjs/operators';
import { AppService } from '../services/app.service';
import { GoogleObj, GoogleService } from '../services/google.service';
import { RouterService } from '../services/router.service';
import { DataService } from '../services/data.service';
import * as dataService from '../services/data.service';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "en";
  selectedLanguageText = "English";
  selectedLanguageFlag = "./assets/img/flags/us.png";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  logoUrl = 'assets/img/logo.png';
  menuPosition = 'Side';
  isSmallScreen = false;
  dashgfkjg : any
  protected innerWidth: any;
  searchOpenClass = "";
  transparentBGClass = "";
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;
  branch = "Shivit"
  branchLogo = "assets/img/logos.png"
  @ViewChild('search') searchElement: ElementRef;
  @ViewChildren('searchResults') searchResults: QueryList<any>;
  // time = new Date()
  dateNow : Date = new Date();
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  seachTextEmpty = new EventEmitter<boolean>();

  listItems = [];
  control = new FormControl();

  public config: any = {};

  constructor(public translate: TranslateService,
    private layoutService: LayoutService, private authService: AuthService,
    private router: Router,private route: ActivatedRoute,
    private appService: AppService,private _google: GoogleService,
    private configService: ConfigService, private cdr: ChangeDetectorRef,
    private routerService: RouterService, private dataService: DataService) {

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;
    
    this.layoutSub = layoutService.toggleSidebar$.subscribe(
      isShow => {
        this.hideSidebar = !isShow;
      });

  }

  private _time$: Observable<Date> = timer(0, 1000).pipe(
    map(tick => new Date()),
    shareReplay(1)
  );
  
  get time() {
    return this._time$;
  }
  params: any
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.params = params
    });
    // console.log(dataService.decodedToken)

    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }

  ngAfterViewInit() {

    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }

  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === "Light") {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }

    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }

  onSearchKey(event: any) {
    console.log(this.control.value)
    this.appService.getSearchModule(this.control.value).subscribe(list=>{
      this.listItems = list['data']
      console.log(this.listItems)
      if (this.searchResults && this.searchResults.length > 0) {
        this.searchResults.first.host.nativeElement.classList.add('first-active-item');
      }
    })
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.add('first-active-item');
    }

    if (event.target.value === "") {
      this.seachTextEmpty.emit(true);
    }
    else {
      this.seachTextEmpty.emit(false);
    }
  }

  removeActiveClass() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.remove('first-active-item');
    }
  }

  onEscEvent() {
    this.control.setValue("");
    this.searchOpenClass = '';
    this.seachTextEmpty.emit(true);
  }

  onEnter() {
    console.log(this.searchResults)
    if (this.searchResults && this.searchResults.length > 0) {
      console.log(this.searchResults.first.url)
      let url = this.searchResults.first.url;
      let id = this.searchResults.first.moduleId;
      let apiPath = this.searchResults.first.apiPath;
      let title = this.searchResults.first.value;
      let listType = this.searchResults.first.listType;
      let formType = this.searchResults.first.formType;

      if (url && url != '') {
        this.control.setValue("");
        this.searchOpenClass = '';
        // this.router.navigate([url]);
        this.routerService.goto(url, id, apiPath, title, listType, formType);
        this.seachTextEmpty.emit(true);
      }
    }
  }
  
  redirectTo(value, id, apiPath, title, listType, formType) {
    this.routerService.goto(value, id, apiPath, title, listType, formType);
    //this.router.navigate([value]);
    this.seachTextEmpty.emit(true);
  }

  public googleObj: GoogleObj = new GoogleObj();

  ChangeLanguage(language: string) {
    let languages = ""
    console.log("test")
    this.googleObj.q = "test"
    this.googleObj.source = "en"
    this.googleObj.target = language
    //this.send()
    //const translate = require("google-translate-api")
    //translate("test",{to: language}).then(res=>{
    //  console.log(res)
    //}).catch(err=>{
    //  console.log(err)
    //})
    this.translate.use(language);

    if (language === 'en') {
      this.selectedLanguageText = "English";
      this.selectedLanguageFlag = "./assets/img/flags/us.png";
    }
    else if (language === 'es') {
      this.selectedLanguageText = "Spanish";
      this.selectedLanguageFlag = "./assets/img/flags/es.png";
    }
    else if (language === 'pt') {
      this.selectedLanguageText = "Portuguese";
      this.selectedLanguageFlag = "./assets/img/flags/pt.png";
    }
    else if (language === 'de') {
      this.selectedLanguageText = "German";
      this.selectedLanguageFlag = "./assets/img/flags/de.png";
    }
    else if (language === 'hi') {
      this.selectedLanguageText = "Hindi";
      this.selectedLanguageFlag = "./assets/img/flags/hi.png";
    }
  }

  send() {
    // this.btnSubmit.disabled = true;
    let key = "AIzaSyBG9MiPh7-7W8LhBgFdPaq1peio6Mosh8s";
    this._google.translate(this.googleObj, key).subscribe(
      (res: any) => {
        // this.btnSubmit.disabled = false;
        console.log(res)
        let result = res.data.translations[0].translatedText;

      },
      err => {
        console.log(err);
      }
    );
  }

  ChangeBranch(branch){
    this.branch = branch
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleSearchOpenClass(display) {
    this.control.setValue("");
    if (display) {
      this.searchOpenClass = 'open';
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
    }
    else {
      this.searchOpenClass = '';
    }
    this.seachTextEmpty.emit(true);



  }

  logout() {
    this.authService.logout();
  }


  toggleNotificationSidebar(event) {
    this.layoutService.toggleNotificationSidebar(true,event);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }
  
  gotoSettings(){
    if(!this.layoutService.settSidebar){
      this.layoutService.settSidebar = true
    }else{
      this.layoutService.settSidebar = false
    }
    this.layoutService.toggleSettSidebar(this.layoutService.settSidebar);
  }
}
