import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, NG_VALIDATORS, FormsModule, FormControl, FormGroup, Validators, NgForm, ValidatorFn, Validator, FormBuilder, FormArray } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'app/shared/services/app.service';
import { environment } from 'environments/environment';
import { SkillCardModel } from '../skillCardComponent/skill-card.component';
// import * as wNumb from 'wnumb';
@Component({
    selector: 'app-questionnaire-auto-pick-modal',
    templateUrl: './questionnaire-auto-pick-modal.component.html',
    styleUrls: ['./questionnaire-auto-pick-modal.component.scss']
})
export class QuestionnaireAutoPickModal implements OnInit {
    @Input() skill: SkillCardModel;
    @Input()
    assessmentFormQuestionIds: Set<number>
    selectedQuestionIds: Set<number> = new Set();
    questionnaires: any;
    form: FormGroup;
    currentSelectedQuantity: number = 0;
    public selectedQuestionsEmitter: EventEmitter<number[]> = new EventEmitter();

    questionQuantityDifficultyWise = {
        beginner: 0,
        intermediate: 0,
        expert: 0
    };
    
    constructor(public activeModal: NgbActiveModal, public appService: AppService, private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.appService.getQuestionnairesBySkillId(this.skill.id).subscribe((res: any) => {
            if (res && res.data)
                this.questionnaires = res.data;
            console.log(this.questionnaires);
            this.questionnaires.forEach(q => {
                switch(q.difficultyLevel) {
                    case 'Beginner':
                        this.questionQuantityDifficultyWise.beginner++;
                        break;
                    case 'Intermediate':
                        this.questionQuantityDifficultyWise.intermediate++;
                        break;
                    case 'Expert':
                        this.questionQuantityDifficultyWise.expert++;
                        break;
                }
            });
            console.log(this.questionQuantityDifficultyWise);
        });
        this.form = new FormGroup({
            beginner: new FormControl(0, [Validators.max(this.questionQuantityDifficultyWise.beginner), Validators.min(0)]),
            intermediate: new FormControl(0, [Validators.max(this.questionQuantityDifficultyWise.intermediate), Validators.min(0)]),
            expert: new FormControl(0, [Validators.max(this.questionQuantityDifficultyWise.expert), Validators.min(0)])
        });
    }

    onSubmit() {
        console.log(this.form.value);
        this.questionQuantityDifficultyWise=this.form.value;
        let beginner=this.questionQuantityDifficultyWise.beginner;
        let intermediate=this.questionQuantityDifficultyWise.intermediate;
        let expert=this.questionQuantityDifficultyWise.expert;
        console.log(beginner+""+intermediate+""+expert);
        environment.api_url = environment.login_url+"/assessment-questionnaires";
        this.appService.generateQuestions(beginner,intermediate,expert)
        .subscribe((res:any)=>{
            console.log(res.data)
            this.questionnaires=res.data;
            
            res.data.forEach(q => {
                    this.selectedQuestionIds.add(q.id);       
            });

            this.selectedQuestionsEmitter.next(Array.from(this.selectedQuestionIds));

            // close popup
            this.activeModal.close('submit');
        })
        
         // emit these changes to main assessment form.
         
    }
}