import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';
import { interval, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AssessmentToolService } from '../../../shared/services/assessment-tool.service';
import { ConfigService } from '../../../shared/services/config.service';
import { LayoutService } from '../../../shared/services/layout.service';
import { CandidateRegistrationComponent } from '../candidate-registration-form/candidate-registration.component';
import { AppService } from 'app/shared/services/app.service';
import { environment } from 'environments/environment';

declare var gapi: any

// https://api.whatsapp.com/send?text=[title]&url=[share-url]
const WHATSAPP_SHARE_URL = "https://api.whatsapp.com/send";
// https://www.facebook.com/sharer.php?u=[url]
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer.php"
// https://www.twitter.com/Share?url=[]
const TWITTER_SHARE_URL = "https://www.twitter.com/Share"

const LINKEDIN_SHARE_URL = "http://www.linkedin.com/shareArticle";

// declare let gapi: any;

@Component({
  selector: 'app-job-profile-view',
  templateUrl: './job-profile-view.component.html',
  styleUrls: ['./job-profile-view.component.scss']
})
export class JobProfileViewComponent implements OnInit, AfterViewInit, OnDestroy {
  jobDescription: any;
  googleLoginButtonId = "google-login-button";
  public config: any = {};
  expired: boolean = false;
  showLoading: boolean = false;
  accessToken: string;
  layoutSub: Subscription;
  subscription: Subscription;
  showData: false;
  applySource: string;
  shareURL: string;
  show: boolean
  Name: any
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;
  
  // auth2: any
  // social share
  facebookShare: string;
  whatsappShare: string;
  twitterShare: string;
  linkedInShare: string;

  authInstance: any
  user: any
  gapiSetup: any
  params: any;
  
  constructor(private route: ActivatedRoute,private appService: AppService, private configService: ConfigService, private assessmentToolSerive: AssessmentToolService, private router: Router, private layoutService: LayoutService, private cdr: ChangeDetectorRef, private modalService: NgbModal, private metaService: Meta,private titleService: Title,private metaTagService: Meta) {

    this.config = this.configService.templateConf;
    this.layoutSub = layoutService.toggleJDProfile$.subscribe(
      open => {
        // this.isOpen = open;
        this.showData = open

        let conf = this.config;
        // if(open){
        //   conf.layout.sidebar.collapsed = true;
        // }else{
        //   conf.layout.sidebar.collapsed = false;
        // }          
        this.configService.applyTemplateConfigChange({ layout: conf.layout });
        // this.scrollContainer = this.scrollFrame.nativeElement;
        // this.scrollToBottom()
      });

  }
  ngAfterViewInit(): void {
  
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
  async ngOninit() {
    if (await this.checkIfUserAuthenticated()) {
      this.user = this.authInstance.currentUser.get();
      console.log("test")
      console.log(this.user)
    }
  }
  ngOnInit(): void {
    // this.titleService.setTitle("Shivit Technologies Pvt. Ltd. - Careers - http://shivit.com");
  
    // this.metaTagService.addTags([
    //   { name: 'keywords', content: 'Shivit Technologies Pvt. Ltd. - Careers - http://shivit.com' },
    //   { name: 'robots', content: 'index, follow' },
    //   { name: 'author', content: 'Shivit Technologies Pvt. Ltd.' },
    //   { charset: 'UTF-8' },
    //   { property: 'og:title', content: 'Hiring for Shivit Technologies ' },
    //   { property:"og:url", content:"http://shivit.com"},
    //   { property:"og:type", content:"website"},
    //   { property:"og:description", content:"Lets Join Us for your future"},
    //   { property:"og:image", content:"http://www.shivit.com/img/logo.png"}
    // ]);
    // this.metaService.addTags([
    //   {name: 'google-signin-client_id', content: '202084921083-70aijiaidlhu0s6ghqmcevosbh9ioiv9.apps.googleusercontent.com'},
    // ]);
    this.layoutService.toggleJDProfileScreen(false)
    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.cdr.markForCheck();

    });
    console.log("on init");
    this.showLoading = true;
    // get Token from URL param
    this.route.queryParams.subscribe(params => {
      this.params = params;
      if (params.source) {
        this.applySource = params.source;
      }
      this.accessToken = params.token;
      let decoded_token = jwt_decode(params.token);
      console.log(decoded_token);
      // fetch JD Information using this token.

      this.assessmentToolSerive.getJDInformation(params.token, decoded_token.jobPostingId).subscribe((res: any) => {
        this.jobDescription = res.jobDescription;
        this.showLoading = false;
        console.log(this.jobDescription);
        this.layoutService.toggleJDProfileScreen(!this.showLoading)
        this.titleService.setTitle(this.jobDescription.jobTitle+" - "+this.jobDescription.jobType);
        let skillSet = "";
        this.jobDescription.jobRole.skillSet.forEach(element => {
            if(skillSet == ""){
              skillSet = element.skill
            }else{
              skillSet += ","+element.skill
            }
        });
        this.metaTagService.addTags([
          { name: 'keywords', content: this.jobDescription.jobTitle,skillSet },
          { name: 'author', content: 'Shivit Technologies Pvt. Ltd.' },
          { charset: 'UTF-8' },
          { property:"og:title", content: 'Hiring for Shivit Technologies ' },
          { property:"og:url", content:"http://shivit.com"},
          { property:"og:type", content:"website"},
          { property:"og:description", content:"Lets Join Us for your future"},
          { property:"og:image", content:"http://www.shivit.com/img/logo.png"}
        ]);
        this.metaService.addTags([
          {name: 'google-signin-client_id', content: '202084921083-70aijiaidlhu0s6ghqmcevosbh9ioiv9.apps.googleusercontent.com'},
        ]);
        // this.renderButton()
        // this.googleInitialize();
        // this.googleSDK()
        // setTimeout(() =>{
        //   this.layoutService.toggleJDProfileScreen(false) 
        // }, 3000);
      }, err => {
        const error = this.handleError(err)
        error.subscribe(data=>{
          console.log(data)
          this.expired = data.expired
          this.showLoading = false;
          this.layoutService.toggleJDProfileScreen(!this.showLoading)
        })
      });
    });

    this.shareURL = encodeURIComponent(`https://hiringtech.shivit.net.in/portal/job-description?token=${this.accessToken}`);
    this.facebookShare = `${FACEBOOK_SHARE_URL}?u=${this.shareURL}&social=facebook`;
    this.whatsappShare = `${WHATSAPP_SHARE_URL}?text=${this.shareURL}&social=whatsapp`;
    this.twitterShare = `${TWITTER_SHARE_URL}?url=${this.shareURL}&social=twitter`;
    this.linkedInShare = `${LINKEDIN_SHARE_URL}?url=${this.shareURL}&social=linkedin`
  }

  handleError(err) {
    console.log(err);
    return of({ expired: true });
  }

  handleResponse(res: any) {

  }
  openContent() {
    const modalRef = this.modalService.open(CandidateRegistrationComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'Canidate Registration';
    // console.log(this.id+'--'+this.trialPeriod)
    modalRef.componentInstance.token = this.accessToken
    modalRef.componentInstance.source = this.applySource
    modalRef.componentInstance.success.subscribe((result) => {
      console.log(result)
      this.modalService.dismissAll(CandidateRegistrationComponent)
      // this.getSourceData()
    })


  }

  apply() {
    console.log(this.accessToken);
    // this.router.navigate(['/portal/candidate-registration'], { queryParams: { token: this.accessToken, source: this.applySource } });
    this.openContent();
  }

  async initGoogleAuth(): Promise<void> {
    //  Create a new Promise where the resolve 
    // function is the callback passed to gapi.load
    const pload = new Promise((resolve) => {
      console.log(resolve)
      gapi.load('auth2', resolve);
    });

    // When the first promise resolves, it means we have gapi
    // loaded and that we can call gapi.init
    return pload.then(async () => {
      await gapi.auth2
        .init({ client_id: '189397318044-j2a9ud9760ti45aujo9p2ffnmvdp6i33.apps.googleusercontent.com' })
        .then(auth => {
          this.gapiSetup = true;
          console.log(auth)
          this.authInstance = auth;
        });
    });
  }

  async authenticate(): Promise<gapi.auth2.GoogleUser> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    console.log(this.authInstance)
    // Resolve or reject signin Promise
    return new Promise(async () => {
      await this.authInstance.signIn().then(
        user => {
          console.log(user)
          this.user = user
          this.authInstance.disconnect();
          let authenticatedUser = this.user.getBasicProfile();
          let decoded_token = jwt_decode(this.params.token);
          let payload = {
            name: authenticatedUser.getName(),
            email: authenticatedUser.getEmail(),
            throughSocialLogin: true,
            jobPostingId: decoded_token.jobPostingId
          };
          
          environment.api_url = `${environment.login_url}/candidates`;
          this.appService.addData(payload, decoded_token.registerPageModuleId).subscribe((res: any) => {
            console.log(res);
            if (res.throughSocialLogin) {
              console.log(window.location.host)
              let url = environment.httpPath+document.location.host+"/portal/candidate-profile-complete-form?token="+this.accessToken+"&throughSocial=true&verificationToken="+res.emailVerificationToken
              window.location.href = url
            }
          });
          console.log()
          console.log('Token || ' + this.user.getAuthResponse().id_token);
          console.log('ID: ' + this.user.getBasicProfile().getId());
          console.log('Name: ' + this.user.getBasicProfile().getName());
          console.log('Image URL: ' + this.user.getBasicProfile().getImageUrl());
          console.log('Email: ' + this.user.getBasicProfile().getEmail());
        },
        error => console.log(error));
    });
  }

  async checkIfUserAuthenticated(): Promise<boolean> {
    // Initialize gapi if not done yet
    if (!this.gapiSetup) {
      await this.initGoogleAuth();
    }
    return this.authInstance.isSignedIn.get();
  }
  getShareURL() {
    console.log(document.URL);
    return document.URL;
  }

  getShareTitle() {
    return this.jobDescription.jobTitle;
  }


  
}
