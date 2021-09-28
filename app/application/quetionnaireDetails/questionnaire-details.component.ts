import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'app/shared/services/app.service';

@Component({
    selector: 'app-questionnaire-details',
    templateUrl: './questionnaire-details.component.html',
    styleUrls: ['./questionnaire-details.component.scss']
})
export class QuestionnaireDetailsComponent implements OnInit {
    @Input()
    questionId: number;
    questionDetails: any;
    error: boolean;
    constructor(private appService: AppService) {

    }

    ngOnInit() {
        this.appService.getQuestionnaireDetails(this.questionId).subscribe((res: any) => {
            console.log(res);
            if (res && res.data) {
                this.questionDetails = res.data;
            } else {
                this.error = true;
            }
           
        });
    }
}