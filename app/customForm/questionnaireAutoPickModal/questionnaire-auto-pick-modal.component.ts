import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'app/shared/services/app.service';
import { SkillCardModel } from '../skillCardComponent/skill-card.component';
// import * as wNumb from 'wnumb';
@Component({
    selector: 'app-questionnaire-auto-pick-modal',
    templateUrl: './questionnaire-auto-pick-modal.component.html',
    styleUrls: ['./questionnaire-auto-pick-modal.component.scss']
})
export class QuestionnaireAutoPickModal implements OnInit {
    @Input() skill: SkillCardModel;
    questionnaires: any;
    form: FormGroup;
    
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
        console.log(this.form);
    }
}