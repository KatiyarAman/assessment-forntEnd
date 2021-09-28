import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentToolService } from 'app/shared/services/assessment-tool.service';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';
import jwt_decode from 'jwt-decode';
import { interval, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-job-profile-view',
  templateUrl: './job-profile-view.component.html',
  styleUrls: ['./job-profile-view.component.scss']
})
export class JobProfileViewComponent implements OnInit, AfterViewInit, OnDestroy {
  jobDescription: any;
  public config: any = {};
  expired: boolean;
  showLoading: boolean = false;
  accessToken: string;
  layoutSub: Subscription;
  subscription: Subscription;
  showData: false;

  constructor(private route: ActivatedRoute, private configService: ConfigService, private assessmentToolSerive: AssessmentToolService, private router: Router, private layoutService: LayoutService, private cdr: ChangeDetectorRef) {

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
    this.route.queryParams.subscribe(params => {
      this.accessToken = params.token;
      let decoded_token = jwt_decode(params.token);
      console.log(decoded_token);
      // fetch JD Information using this token.

      this.assessmentToolSerive.getJDInformation(params.token, decoded_token.jobPostingId).subscribe((res: any) => {
        this.jobDescription = res.jobDescription;
        this.showLoading = false;
        console.log(this.jobDescription);
        this.layoutService.toggleJDProfileScreen(!this.showLoading)
        // setTimeout(() =>{
        //   this.layoutService.toggleJDProfileScreen(false) 
        // }, 3000);
      }, err => {

      });
    });
  }

  handleError(err) {
    console.log(err);
    return of({ expired: true });
  }

  handleResponse(res: any) {


  }

  apply() {
    console.log(this.accessToken);
    this.router.navigate(['/pages/candidate-apply'], { queryParams: { token: this.accessToken } });
  }

  getShareURL() {
    console.log(document.URL);
    return document.URL;
  }

  getShareTitle() {
    return this.jobDescription.jobTitle;
  }
}
