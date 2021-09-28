import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'app/shared/services/app.service';

@Component({
  selector: 'app-hiring-round',
  templateUrl: './hiring-round.component.html',
  styleUrls: ['./hiring-round.component.scss']
})
export class HiringRoundComponent implements OnInit {
  @Input() docRefId:number;
  @Input() moduleId:number;
  @Input() params:any;
  @Input() moduleAction:any;
  hiringRounds: any[];
  reminderForm: FormGroup;
  
    
  constructor(public modalService:NgbActiveModal,private appService:AppService,private route: ActivatedRoute) { }
  
    ngOnInit(): void {
  
      this.reminderForm = new FormGroup({
        id: new FormControl('', Validators.required),
        jobProfileId: new FormControl('', Validators.required),
        mode: new FormControl('', Validators.required),
        order: new FormControl('', Validators.required),
        employeeId: new FormControl('', Validators.required),
        hiringTypeId: new FormControl('', Validators.required),
        roundName: new FormControl('', Validators.required),
        question: new FormControl('', Validators.required),
        docRefId: new FormControl(this.docRefId, Validators.required)
    });
    console.log(this.params)
    
      console.log(this.docRefId,this.moduleId);
      this.getHirigRounds()
    }
  
    get remarks() {
      return this.reminderForm.get('remarks');
  }
  
  get reminderTimestamp() {
      return this.reminderForm.get('reminderTimestamp');
  }
    currentDate() {
      return new Date();
  }
  
  getDate(value) {
      return new Date(value);
  }
  getHirigRounds(){
    this.appService.getHiringRounds(this.moduleId,this.docRefId).subscribe((res:any)=>{
      console.log(res.data);
       this.hiringRounds=res.data;
    });
  }

}
