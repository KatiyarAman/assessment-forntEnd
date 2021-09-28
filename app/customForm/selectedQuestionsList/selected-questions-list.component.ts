import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from 'app/shared/services/app.service';

@Component({
    selector: 'app-selected-questions-list',
    templateUrl: './selected-questions-list.component.html',
    styleUrls: ['./selected-questions-list.component.scss']    
})
export class SelectedQuestionsListComponent implements OnInit {
    @Input() assessmentTestForm: FormGroup;
    
    constructor(private appService: AppService) {

    }

    ngOnInit() {
        let ids: number[] = this.assessmentTestForm.get('questionnaireIds').value;
        this.assessmentTestForm.get('questionnaireIds').valueChanges.subscribe(res => {
            console.log(res);
            this.appService.getQuestinnaireListByIds(res).subscribe(data => {
                console.log(data);
            });
        });
    }

}