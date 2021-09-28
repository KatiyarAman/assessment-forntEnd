import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'app/shared/services/app.service';
import { SkillCardModel } from '../skillCardComponent/skill-card.component';

@Component({
    selector: 'app-questionnaire-list',
    templateUrl: './questionnaire-list-modal.component.html',
    styleUrls: ['./questionnaire-list-modal.component.scss'] 
})
export class QuestionnaireListModalComponent implements  OnInit {
    
    @Input() 
    skill: SkillCardModel;
    
    @Input()
    assessmentFormQuestionIds: Set<number>
    
    matchedQuestionIds: Set<number> = new Set();

    form: FormGroup;
    visible: boolean = true; 
    currentSelectedQuantity: number = 0;
    questionnaires: any;
    selectedQuestionIds: Set<number> = new Set();

    public selectedQuestionsEmitter: EventEmitter<number[]> = new EventEmitter();
    
    constructor(public activeModal: NgbActiveModal, public appService: AppService, private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.appService.getQuestionnairesBySkillId(this.skill.id).subscribe((res: any) => {
            console.log("questionnaire data : ", res);
            this.questionnaires = res.data;
            let group = {};
            res.data.forEach(d => {
                const questionId = parseInt(d.id);
                if (this.assessmentFormQuestionIds.has(questionId)) {
                    this.matchedQuestionIds.add(questionId);
                    this.currentSelectedQuantity++;
                    group[d.id] = [true];
                } else {
                    group[d.id] = [false];
                }
            });
            this.form = this.formBuilder.group(group);
            console.log(this.form);

            this.form.valueChanges.subscribe((changes: any) => {
                this.currentSelectedQuantity = 0;
                console.log(changes);
                for (const questionIdStr in changes) {
                    let id = parseInt(questionIdStr);
                    if (changes[questionIdStr]) {
                        this.currentSelectedQuantity++;
                        this.selectedQuestionIds.add(id);
                    } else {
                        this.selectedQuestionIds.delete(id);
                    }
                }
            });
        });
    }

    
    onSubmit() {
        /*
            if de-selected any question which was initially selected then remove it from the main form.
         */
        this.matchedQuestionIds.forEach( initiallySelectedId => {
            if (!this.selectedQuestionIds.has(initiallySelectedId)) {
                this.assessmentFormQuestionIds.delete(initiallySelectedId);
            }
        });

        /*
          select all ids which was initially selected or selected in this pop up. Set will take care of uniqueness of ids.
        */
        this.selectedQuestionIds.forEach(selectedId => {
            this.assessmentFormQuestionIds.add(selectedId);
        });

        // emit these changes to main assessment form.
        this.selectedQuestionsEmitter.next(Array.from(this.selectedQuestionIds));

        // close popup
        this.activeModal.close('submit');
        
    }
}