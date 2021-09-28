import { OnInit, Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../services/app.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';


const futureDateValidator: ValidatorFn = (control) => {
    let formDate = new Date(control.value);
    let now = new Date();
    if (formDate.getTime() <= now.getTime()) {
        return {futureDateError: true}
    }
    return null;
}

@Component({
    selector: 'app-candidate-comment-popup',
    styleUrls: ['./candidate-comment-popup.component.scss'],
    templateUrl: './candidate-comment-popup.component.html'
})
export class CandidateCommentPopup implements OnInit {
    
    @Input()
    docRefId: number;
    
    @Input()
    moduleId: number;
    reminderForm: FormGroup;
    reminderHistory: any[];

    constructor(public modalService: NgbActiveModal, private appService: AppService) {
        
    }

    ngOnInit() {
        this.reminderForm = new FormGroup({
            remarks: new FormControl('', Validators.required),
            reminderTimestamp: new FormControl('', [Validators.required, futureDateValidator]),
            docRefId: new FormControl(this.docRefId, Validators.required)
        });
        console.log(this.docRefId, this.moduleId);
        this.fetchReminders();
       
    }
    get remarks() {
        return this.reminderForm.get('remarks');
    }

    get reminderTimestamp() {
        return this.reminderForm.get('reminderTimestamp');
    }
    addReminder() {
        console.log(this.reminderForm.value);
        console.log(this.remarks);
        console.log(this.reminderTimestamp);
        if (this.reminderForm.valid) {
            this.appService.addReminder(this.moduleId, this.reminderForm.value).subscribe(res => {
                console.log(res);
                this.reminderForm.reset();
                this.reminderForm.patchValue({
                    docRefId: this.docRefId
                });
                this.fetchReminders();
            });
        }
    }

    currentDate() {
        return new Date();
    }

    getDate(value) {
        return new Date(value);
    }

    fetchReminders() {
        this.appService.getReminderList(this.moduleId, this.docRefId).subscribe((res: any) => {
            this.reminderHistory = res.data;
            console.log(this.reminderHistory);
        });
    }

}