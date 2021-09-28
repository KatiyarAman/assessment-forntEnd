import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwt_decode from 'jwt-decode';
import { interval, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AssessmentToolService } from '../../../shared/services/assessment-tool.service';
import { ConfigService } from '../../../shared/services/config.service';
import { LayoutService } from '../../../shared/services/layout.service';



// https://api.whatsapp.com/send?text=[title]&url=[share-url]
const WHATSAPP_SHARE_URL = "https://api.whatsapp.com/send";
// https://www.facebook.com/sharer.php?u=[url]
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer.php"
// https://www.twitter.com/Share?url=[]
const TWITTER_SHARE_URL = "https://www.twitter.com/Share"

const LINKEDIN_SHARE_URL = "http://www.linkedin.com/shareArticle";

@Component({
  selector: 'app-job-profile-popup',
  templateUrl: './job-profile-popup.component.html',
  styleUrls: ['./job-profile-popup.component.scss']
})
export class JobProfilePopupComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() token : string
  @Input() name : string
  @Output() success: EventEmitter<any> = new EventEmitter()
  jobDescription: any;
  public config: any = {};
  expired: boolean;
  showLoading: boolean = false;
  accessToken: string;
  layoutSub: Subscription;
  subscription: Subscription;
  showData: false;
  applySource: string;
  shareURL: string;
  // social share
  facebookShare: string;
  whatsappShare: string;
  twitterShare: string;
  linkedInShare: string;

  constructor(private route: ActivatedRoute, private configService: ConfigService, private assessmentToolSerive: AssessmentToolService, private router: Router, private layoutService: LayoutService, private cdr: ChangeDetectorRef, private modalService: NgbModal) {

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

  ngOnInit(): void {
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
    
    this.accessToken = this.token;
    let decoded_token = jwt_decode(this.token);
      console.log(decoded_token);
      // fetch JD Information using this token.
      
    this.assessmentToolSerive.getJDInformation(this.token, decoded_token.jobPostingId).subscribe((res: any) => {
      this.jobDescription = res.jobDescription;
      this.showLoading = false;
      console.log(this.jobDescription);
      this.layoutService.toggleJDProfileScreen(!this.showLoading)
      // setTimeout(() =>{
      //   this.layoutService.toggleJDProfileScreen(false) 
      // }, 3000);
    }, err => {

    });
    

    this.shareURL = encodeURIComponent(`${document.location.host}/portal/job-description?token=${this.token}`);
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

  getShareURL() {
    console.log(document.URL);
    return document.URL;
  }

  getShareTitle() {
    return this.jobDescription.jobTitle;
  }

  getAction(event){
    this.success.emit(event)
  }
}
