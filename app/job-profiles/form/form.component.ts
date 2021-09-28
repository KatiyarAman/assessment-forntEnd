import { Component, ViewChild, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ReactiveFormsModule, NG_VALIDATORS, FormsModule, FormControl, FormGroup, Validators, NgForm, ValidatorFn, Validator, FormBuilder} from '@angular/forms';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import { CommonService } from 'app/shared/data/common.data';
import { environment } from 'environments/environment';
import { AppService } from 'app/shared/services/app.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
    // @ViewChild('depttForm') floatingLabelForm: NgForm;
    params: any
    // moduleUrl = "/master"
    constructor(private router: Router, private formbuilder: FormBuilder,  private route: ActivatedRoute, private commonData: CommonService, private appService: AppService) {
        // create the source
    }
    
    ngOnInit() {
        
        // environment.api_url = environment.base_url +"/client"
        this.route.params.subscribe(params => {
           
            this.params = params;
            console.log("Forms Data : ", this.params);

        });
    }

    

    // OnCancel(){
    //     this.router.navigate(['/master'], {  relativeTo: this.route.parent, skipLocationChange: true });
    // }
    
    

}
