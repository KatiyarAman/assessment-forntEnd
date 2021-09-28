import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs';
import { AppService } from '../../../shared/services/app.service';
import { AssessmentToolService } from '../../../shared/services/assessment-tool.service';
import { ConfigService } from '../../../shared/services/config.service';
import { LayoutService } from '../../../shared/services/layout.service';
import jwt_decode from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobProfilePopupComponent } from '../job-profile-popup/job-profile-popup.component';

@Component({
    selector: 'app-candidate-profile-complete-form',
    templateUrl: './candidate-profile-complete-form.component.html',
    styleUrls: ['./candidate-profile-complete-form.component.scss']
})
export class CandidateProfileCompleteForm implements OnInit {

    showData: boolean;
    jobDescriptionData: any;
    accessToken: string;
    config: any = {};
    layoutSub: Subscription;
    showLoading: boolean = false;
    moduleId: number;
    formParams: any;
    actions = [];
    action: string;
    applySource: string;

    constructor(private appService: AppService, private route: ActivatedRoute, private assessmentToolService: AssessmentToolService, private configService: ConfigService, private layoutService: LayoutService, private cdr: ChangeDetectorRef,  private modalService: NgbModal) {
        this.config = this.configService.templateConf;
        this.layoutService.toggleCandidateApplyScreen(false);
        this.layoutSub = layoutService.toggleCandidateApplyForm$.subscribe(open => {
            this.showData = open;
            console.log(this.showData);
            let conf = this.config;
            this.configService.applyTemplateConfigChange({ layout: conf.layout });
        }
        );
    }

    ngOnInit(): void {
        console.log("add")
        this.layoutService.toggleCandidateApplyScreen(false);
        this.showLoading = true;
        this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.cdr.markForCheck();
        });
        this.route.queryParams.subscribe(params => {
            this.accessToken = params.token;
            let decodedToken = jwt_decode(params.token);
            this.moduleId = decodedToken.profileCompleteModuleId;
            this.assessmentToolService
                .verifyCandidateEmail(params.verificationToken, params.token)
                // if candiate is verified
                .subscribe((response: any) => {
                    console.log(response);
                    this.assessmentToolService.getJDInformation(this.accessToken, response.jobPosting.id).subscribe((jd: any) => {
                        this.jobDescriptionData = jd.jobDescription;
                        console.log(jd);
                    });
                    this.assessmentToolService.getCustomFields(this.moduleId, this.accessToken).subscribe((fieldData: any) => {
                        this.assessmentToolService.getModuleById(this.moduleId, this.accessToken).subscribe((moduleData: any) => {
                            console.log(moduleData);
                            console.log(fieldData);
                            this.formParams = {
                                buttons: JSON.stringify(fieldData.buttons),
                                fields: JSON.stringify(fieldData.data),
                                action: 'edit',
                                data: response.candidate.id,
                                apiPath: moduleData.apiPath,
                                title: moduleData.title,
                                headerObject: JSON.stringify(fieldData.data),
                                moduleId: this.moduleId,
                                moduleUrl: "/portal/job-description",
                                takeIntroductionVideo: response.jobPosting.takeIntroductionVideo
                            };
                    fieldData.buttons.list.buttonList.forEach(btn => {
                        console.log(btn);
                        if (btn["button"]["purpose"] == 'list' && fieldData.buttons[btn["button"]["action"]["actions"]]) {
                            let act = {}
                            act["name"] = btn["button"]["action"]["actions"]
                            act["title"] = btn["button"]["buttonName"]
                            act["icon"] = btn["button"]["icon"]
                            act["actionClass"] = btn["button"]["buttonClass"]
                            act["type"] = btn["button"]["type"]
                            this.actions.push(act);
                        }
                    });
                    this.action = 'edit';
                    this.showLoading = false;
                    this.layoutService.toggleCandidateApplyScreen(!this.showLoading);
                        });
                    });
                    // if email is not verified
                }, error => {

                });

        });
    }

    getProfile(){
        const modalRef = this.modalService.open(JobProfilePopupComponent, {size: 'xl'});
        modalRef.componentInstance.name = 'Job Description';
        // console.log(this.id+'--'+this.trialPeriod)
        modalRef.componentInstance.token = this.accessToken
        modalRef.componentInstance.success.subscribe((result)=>{
            console.log(result)
            this.modalService.dismissAll(JobProfilePopupComponent)
            // this.getSourceData()
        })
    }

}