import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../../../shared/services/app.service";
import jwt_decode from 'jwt-decode';
import { AssessmentToolService } from "../../../shared/services/assessment-tool.service";
import { ConfigService } from "../../../shared/services/config.service";
import { LayoutService } from "../../../shared/services/layout.service";
import { Subscription } from "rxjs";
import { environment } from "../../../../environments/environment"
declare let oauthToken: string
@Component({
    selector: 'app-candidate-registration',
    templateUrl: 'candidate-registration.component.html',
    styleUrls: ['candidate-registration.component.scss']
})
export class CandidateRegistrationComponent implements OnInit {
    @Input() name: string;
    @Input() token: string;
    @Input() source: string;
    @Output() success: EventEmitter<any> = new EventEmitter()
    showData: boolean;
    jobDescriptionData: string;
    accessToken: string;
    config: any = {};
    layoutSub: Subscription;
    showLoading: boolean = false;
    moduleId: number;
    formParams: any;
    actions = [];
    action: string;
    applySource: string;
    constructor(private appService: AppService, private route: ActivatedRoute, private assessmentToolService: AssessmentToolService, private configService: ConfigService, private layoutService: LayoutService, private cdr: ChangeDetectorRef) {
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
        this.layoutService.toggleCandidateApplyScreen(false);
        this.showLoading = true;
        this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.cdr.markForCheck();
        });
        this.route.queryParams.subscribe(params => {
            this.accessToken = this.token;
            if (params.source) {
                this.applySource = this.source;
            } else {
                this.applySource = "Unknown";
            }
            console.log(this.applySource);
            oauthToken = this.token
            localStorage.setItem(environment.oauth_token,this.token)
            let decodedToken = jwt_decode(this.token);
            console.log(decodedToken);
            this.assessmentToolService.getJDInformation(this.accessToken,decodedToken.jobPostingId).subscribe((data: any) => {
                this.jobDescriptionData = data.jobDescription;
            });
            this.assessmentToolService.getCustomFields(decodedToken.registerPageModuleId, this.accessToken).subscribe((res: any) => {
                // set the job posting id and apply source
                res.data.filter(x=>x.fieldName == 'jobPostingId')[0]["dataSource"] = decodedToken.jobPostingId                
                res.data.filter(x=>x.fieldName == 'applySource')[0]["dataSource"] = this.applySource;                
                console.log(res);
                this.assessmentToolService.getModuleById(204, this.accessToken).subscribe((moduleData: any) => {
                    console.log(moduleData);
                    this.formParams = {
                        buttons: JSON.stringify(res.buttons),
                        fields: JSON.stringify(res.data),
                        action: 'add',
                        apiPath: moduleData.apiPath,
                        title: moduleData.title,
                        headerObject: JSON.stringify(res.data),
                        moduleId: decodedToken.registerPageModuleId,
                        moduleUrl: "/portal/job-description"
                    };
                    if(res.buttons.list !=null){
                        res.buttons.list.buttonList.forEach(btn => {
                            console.log(btn);
                            if (btn["button"]["purpose"] == 'list' && res.buttons[btn["button"]["action"]["actions"]]) {
                                let act = {}
                                act["name"] = btn["button"]["action"]["actions"]
                                act["title"] = btn["button"]["buttonName"]
                                act["icon"] = btn["button"]["icon"]
                                act["actionClass"] = btn["button"]["buttonClass"]
                                act["type"] = btn["button"]["type"]
                                this.actions.push(act);
                            }
                        });
                    }
                    this.action = 'add';
                    this.showLoading = false;
                    this.layoutService.toggleCandidateApplyScreen(!this.showLoading);
                });
            });
        });
    }

    getAction(event){
        this.success.emit(event)
    }
}