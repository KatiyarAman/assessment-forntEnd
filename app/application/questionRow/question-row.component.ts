import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-question-row',
    templateUrl: './question-row.component.html',
    styleUrls: ['./question-row.component.scss']
})
export class QuestionRowComponent implements OnInit { 
    public detailsHide = true;
    @Input() question: any;
    @Input() parentForm: FormGroup;

    ngOnInit() {
        console.log(this.question);
    }

    getDifficultyLevelClass(difficulty) {
        switch(difficulty) {
            case 'Expert':
                return 'bg-danger';
            case 'Intermediate':
                return 'bg-warning';
            case 'Beginner':
                return 'bg-success';
        }
    }
}