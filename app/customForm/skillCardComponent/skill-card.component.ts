import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'app/shared/services/app.service';
import { environment } from 'environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { QuestionnaireListModalComponent } from '../questionnaireListModal/questionnaire-list-modal.component';
import { QuestionnaireAutoPickModal } from '../questionnaireAutoPickModal/questionnaire-auto-pick-modal.component';
// import { QuestionnaireAutoPickModal } from '../questionnaireAutoPickModal/questionnaire-auto-pick-modal.component';
// import { QuestionnaireListModalComponent } from '../questionnaireListModal/questionnaire-list-modal.component';
export interface SkillCardModel {
    id: number;
    skill: string;
    description: string;
    totalQuestions: number;
}

@Component({
    selector: 'app-skill-card',
    templateUrl: './skill-card.component.html',
    styleUrls: ['./skill-card.component.scss']
})
export class SkillCardComponent implements OnInit {

    constructor(private modalService: NgbModal) {

    }

    @Input() skills: SkillCardModel[];
    @Input() params: any;
    @Input() assessmentTestForm: FormGroup;
    
    ngOnInit() {
        console.log("in skills component ", this.skills);
        console.log(this.assessmentTestForm);
        // if user not selected any questions then set empty array.
        if (this.assessmentTestForm.get("questionnaireIds").value == "") {
            this.assessmentTestForm.get("questionnaireIds").setValue([]);
        }
    }

    viewList(skill: SkillCardModel) {
        environment.api_url = environment.login_url+"/"+this.params.apiPath;
        const modalRef = this.modalService.open(QuestionnaireListModalComponent, {backdrop: "static",centered: true,size: 'xl'});
        modalRef.componentInstance.skill = skill;
        modalRef.componentInstance.assessmentFormQuestionIds = new Set(this.assessmentTestForm.get('questionnaireIds').value);
        //modalRef.componentInstance.selectedQuestionsEmitter.subscribe(ids => this.assessmentTestForm.get('questionnaireIds').setValue(ids));
        modalRef.componentInstance.selectedQuestionsEmitter.subscribe(ids => {
            console.log(ids);
            this.assessmentTestForm.get('questionnaireIds').setValue(ids);
        });
    
    }

    viewQuestionnaireAutoPickup(skill: SkillCardModel) {
        environment.api_url = environment.login_url+"/"+this.params.apiPath;
        const modalRef = this.modalService.open(QuestionnaireAutoPickModal, {centered: true,size: 'md'});
        modalRef.componentInstance.skill = skill;
    }

}