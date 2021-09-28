import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, FormArrayName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'app/shared/services/app.service';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { environment } from 'environments/environment';
import { Subscription, interval } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AssessmentToolService } from 'app/shared/services/assessment-tool.service';
import { modules } from 'app/shared/model/module';

@Component({
  selector: 'app-assessment-test',
  templateUrl: './assessment-test.component.html',
  styleUrls: ['./assessment-test.component.scss']
})
export class AssessmentTestComponent implements OnInit {

  dataForm : FormGroup
   showData: boolean=false;
  config: any = {};
   layoutSub: Subscription;
accessToken: string;
hiringRound: any[] = []
questionsMapping:any=[];
questions: any=[];
question: any;
currentQuestion: number = 0;
formData : any
timer: boolean = true;
showLoading: boolean = false;
i: number = 0;
questionAnwers:any=[];
prev = true
next = false
  constructor(private assessmentToolService: AssessmentToolService,private appService: AppService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute,  private translae: TranslateService,private configService: ConfigService, private layoutService: LayoutService, private cdr: ChangeDetectorRef) {
    this.config = this.configService.templateConf;
    this.layoutSub = layoutService.toggleAssessmentTestForm$.subscribe(open => {
      this.showData = open;
      console.log(this.showData);
      let conf = this.config;
      this.configService.applyTemplateConfigChange({ layout: conf.layout });
    }
    );

  }
  ngOnInit() {
    this.layoutService.toggleAssessmentApplyScreen(false);
    this.showLoading = true;
    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
          this.config = templateConf;
      }
      this.cdr.markForCheck();
  })
    this.route.params.subscribe(param=>{
      // console.log(param);
       this.accessToken=param.params;
       let decoded_token=jwt_decode(param.params);
       console.log(decoded_token)
       this.dataForm=this.formBuilder.group({
        status: [],
        questionId:[],
        questionAnswer:[],
        questionAnswers:new FormArray([])
      })
      
      this.assessmentToolService.getJDInformation(this.accessToken,decoded_token.jobPostingId).subscribe((res:any)=>{
        this.showLoading = false;
        this.layoutService.toggleAssessmentApplyScreen(!this.showLoading);
        this.hiringRound=res.jobDescription.hiringRounds;
        // console.log(this.hiringRound);
        let answers = []
         this.hiringRound.forEach(round=>{
          if(round.hiringTypeId =="198"){
            console.log("assessment")
            environment.api_url = environment.login_url + "/assessment-tests";
            this.appService.getQuestionnaireDetailsById(round.question).subscribe((assessment:any) => {
            this.questionsMapping=assessment.mapping;
            this.questionsMapping.forEach(ques=>{
              
             this.questions.push(ques.assessmentQuestionnaire);
             
             answers.push({status: 28,questionId: ques.assessmentQuestionnaire.id, value: '', question:ques.assessmentQuestionnaire.question })
            })
            this.formData = {
              candidateApplicationId:  decoded_token.candidateApplicationId,
              candidateId: decoded_token.candidateId,
              answers: answers
            }
            console.log(this.questions)
            this.question = this.questions[this.i];
            console.log(this.question)
            this.dataForm.get("questionId").setValue(this.question.id);
            this.layoutService.toggleAssessmentApplyScreen(true);
          })
          }
          if(round.hiringTypeId =="189"){
            console.log("interview")
            environment.api_url = environment.login_url + "/interview";
            this.appService.getById(round.question,round.hiringTypeId,30).subscribe(interview => {
            console.log(interview)
            })
          }
        });
        // this.renderData()
        });
    });
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
  
  
  get f() { return this.dataForm.controls }
  get ft() { return this.f.questionAnswers as FormArray }
  checkValue(id){
    console.log(this.dataForm.value)
    
    if(this.dataForm.get("questionAnswers").value.indexOf(id+"")!=-1){
      console.log(this.dataForm.get("questionAnswers").value.indexOf(id+""))
      return true
    }
    return false;
  }
  onCheckChange(event) {
    const formArray: FormArray = this.dataForm.get('questionAnswers') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
      const values = formArray.value
      console.log(values);
      formArray.clear();
      values.forEach(a => {
        if(a == event.target.value) {
          // Remove the unselected element from the arrayForm
          values .splice(i)
          return;
        }
  
        i++;
      });
      values.forEach(v => {
        formArray.push(new FormControl(v));
        
      });
    }
    console.log(this.dataForm.value)
  }


  nextQuestion() {
    this.layoutService.toggleAssessmentApplyScreen(false);
    const anwersData = this.appService.getNewObject(this.dataForm.value)
    console.log(this.i)
    if(this.i<this.questions.length){
      this.i++;
      
      this.question= this.questions[this.i];
      this.dataForm.reset()
      this.dataForm.updateValueAndValidity()
      this.dataForm.get("questionId").setValue(this.question.id);
      console.log(this.formData)
      this.formData.answers.forEach(a => {
        if(a.questionId == anwersData.questionId && (a.value == "" || a.value == null || (a.value.lenght == 0 && this.questions.filter(x=>x.id == a.questionId)[0]["field"]["type"] == 'multiselect'))){
          a.status = 18
        }
      });
      this.formData.answers.forEach(a => {
        if(a.questionId == this.question.id){      
          if(this.question.field.type == 'multiSelect'){
            // console.log(a)
            if(a.value.length!= null && a.value.length > 0 && a.value.length != "")
            this.dataForm.get("questionAnswers").setValue(a.value.split(","))
          } else{
            this.dataForm.get("questionAnswer").setValue(a.value)
          }
        }
      });
    }
    this.checkSeq()
    this.layoutService.toggleAssessmentApplyScreen(true);
  }

  checkSeq(){    
    if(this.i+1 == this.questions.length){
      this.next = true
    }else{
      this.next = false
    }
    if(this.i == 0){
      this.prev = true
    }else{
      this.prev = false
    }
  }

  previousQuestion() {
    this.layoutService.toggleAssessmentApplyScreen(true);
    console.log(this.i)
    if(this.i>0){
      this.i--;
      this.question= this.questions[this.i];
    
      this.dataForm.reset()
      this.dataForm.updateValueAndValidity()
      this.dataForm.get("questionId").setValue(this.question.id);
      // console.log(this.formData)
      this.formData.answers.forEach(a => {
        if(a.questionId == this.question.id){      
          if(this.question.field.type == 'multiSelect'){
            // console.log(a)
            if(a.value.length!= null && a.value.length > 0)
            this.dataForm.get("questionAnswers").setValue(a.value.split(","))
          } else{
            this.dataForm.get("questionAnswer").setValue(a.value)
          }
        }
      });
    }
    this.checkSeq()
    this.layoutService.toggleAssessmentApplyScreen(true);
  }

  showStatus(status) {
    console.log(status);
  }
    saveNextQuestion() {
    this.layoutService.toggleAssessmentApplyScreen(false);
    const anwersData = this.appService.getNewObject(this.dataForm.value)
    console.log(this.i)
    if(this.i<this.questions.length){
      this.i++;
      this.question= this.questions[this.i];
    
      this.dataForm.reset()
      this.dataForm.updateValueAndValidity()
      this.dataForm.get("questionId").setValue(this.question.id);
      // console.log(anwersData)
      this.formData.answers.forEach(a => {
        if(a.questionId == anwersData.questionId){
          a.value = ''
          if(anwersData.questionAnswers.length >0){
            anwersData.questionAnswers.forEach(b => {
              console.log(b)
              if(a.value!=""){
                a.value+=","
              }
              a.value+=b
            });
          }
          if(anwersData.questionAnswer != "" && anwersData.questionAnswer != null){
            a.value=anwersData.questionAnswer;
          }
          a.status = 4
        }
      });
    }
    this.checkSeq()
    // console.log(this.formData)
    this.layoutService.toggleAssessmentApplyScreen(true);
  }

  log() {
    console.log('completed')
    this.nextQuestion();
  }

}
