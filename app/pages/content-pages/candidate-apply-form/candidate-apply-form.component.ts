import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'app/shared/services/app.service';
import { AssessmentToolService } from 'app/shared/services/assessment-tool.service';
import jwt_decode from 'jwt-decode';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { Subscription } from 'rxjs';
import { FormBuilder } from '@angular/forms'

interface ApplyMandatorySkill {
  id: number;
  skill: {
    skill: string
  };
  mandatory: boolean
}

@Component({
  selector: 'app-candidate-apply-form',
  templateUrl: './candidate-apply-form.component.html',
  styleUrls: ['./candidate-apply-form.component.scss']
})
export class CandidateApplyFormComponent implements OnInit {
  applyMandatorySkills: any[];
  registrationForm: FormGroup;

  showData: boolean = false;
  resumeDoc: File;
  accessToken: string;
  jobDescriptionData: any;
  config: any = {};
  layoutSub: Subscription;
  showLoading: boolean = false;
  alertMessage: string;
  submitted = false

  constructor(private assessmentToolService: AssessmentToolService, private appService: AppService, private route: ActivatedRoute, private router: Router, private configService: ConfigService, private layoutService: LayoutService, private cdr: ChangeDetectorRef, private formBuilder: FormBuilder) {
    this.config = this.configService.templateConf;
    this.layoutSub = layoutService.toggleCandidateApplyForm$.subscribe(open => {
      this.showData = open;
      console.log(this.showData);
      let conf = this.config;
      this.configService.applyTemplateConfigChange({ layout: conf.layout });
    }
    );

    // Initialize the Registration Form
    
  }

  get f() {return this.registrationForm.controls }
  get ft() { return this.f.skillExperience as FormArray}

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
      this.registrationForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        contactNo: ['', Validators.required],
        jobPostingId: ['', Validators.required],
        resume: [''],
        applySource: [''],
        skillExperience: new FormArray([]),
        message: ['']
      });
      console.log(this.registrationForm);
      this.accessToken = params.token;
      let decoded_token = jwt_decode(params.token);
      console.log(decoded_token);
      this.registrationForm.get('jobPostingId').setValue(decoded_token.jobPostingId);
      this.assessmentToolService.getJDInformation(this.accessToken, decoded_token.jobPostingId).subscribe((data: any) => {
        this.showLoading = false;
        this.layoutService.toggleCandidateApplyScreen(!this.showLoading);

        this.jobDescriptionData = data.jobDescription;
        console.log(this.jobDescriptionData);

        /**
         * Dyanmically Add form controls for skills 
         * 
        */
        this.applyMandatorySkills = this.jobDescriptionData.applyMandatorySkills || [];
        console.log(this.applyMandatorySkills)
        this.applyMandatorySkills.forEach(skill => {
          this.ft.push(this.formBuilder.group({
            mandatorySkillId: [skill.id],
            haveSkill: [false],
            experience: [''],
            experienceUnit: ['MONTH'],
            comment: ['']
          }));
        });
        for(let i=0; i<this.ft.length;i++){
          this.ft.controls[i].get('experience').disable({onlySelf: true})
          this.ft.controls[i].get('experienceUnit').disable({onlySelf: true})
        }
        console.log(this.ft)
      });
    });
  }
  uploadFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.resumeDoc = event.target.files[0];
    }
  }
  
  skillInputChange(event, index, rowLabel) {
    if (event.target.checked) {
      rowLabel.textContent = "Yes";
      this.ft.controls[index].get('experience').setValidators([Validators.required])
      this.ft.controls[index].get('experienceUnit').setValidators([Validators.required])
      this.ft.controls[index].get('experience').enable()
      this.ft.controls[index].get('experienceUnit').enable()
    }
    else {
      rowLabel.textContent = "No";
      this.ft.controls[index].get('experience').reset()
      this.ft.controls[index].get('experienceUnit').setValue('MONTH')
      this.ft.controls[index].get('experience').disable({onlySelf: true})
      this.ft.controls[index].get('experienceUnit').disable({onlySelf: true})
    }
      
  }
  onSubmit() {
    this.submitted = true
    if(this.registrationForm.invalid){
      return
    }
    console.log(this.registrationForm.value);
    let payload = this.appService.getNewObject(this.registrationForm.value);
    console.log(payload);
    const uploadData = new FormData();
    uploadData.append('object', new Blob([JSON.stringify(payload)], { type: 'application/json' }));
    uploadData.append('resumeDoc', this.resumeDoc);
    console.log(uploadData);
    this.assessmentToolService.registerCandidate(uploadData, this.accessToken).subscribe((data: any) => {
      console.log(data);
      this.alertMessage = data.message;
      console.log(this.alertMessage);
    });
  }

  goToJobDescription() {
    this.router.navigate(['/pages/job-description'], { queryParams: { token: this.accessToken } });
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

  registerCandidate() {
    console.log(this.registrationForm.value);
  }
}
