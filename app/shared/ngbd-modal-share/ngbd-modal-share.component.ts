import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { AlertService } from '../services/alerts.service';
import { environment } from 'environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'ngbd-modal-share',
  providers: [AlertService],
  templateUrl: './ngbd-modal-share.component.html',
  styleUrls: ['./ngbd-modal-share.component.scss']
})

export class NgbdModalShare implements OnInit {
  @Input() token: String;
  generateLink  : FormGroup
  submitted = false
  generatedLink = ""
  defaultUrl = ""
  copyHeader: string = "Click to copy";
  @ViewChild("urlinput") urlInput: ElementRef;
  @ViewChild("genlinkinput") genlinkinput: ElementRef;
  constructor(public activeModal: NgbActiveModal, private formBuilder: FormBuilder, private alertService: AlertService) { 
  
  }

  ngOnInit(){
      // console.log("test" + this.appService.menuId)
      this.defaultUrl = `${document.location.host}/portal/job-description?token=${this.token}`;
      this.generateLink = this.formBuilder.group({
          socialProfile: ["",Validators.required]
      });
      // console.log(this.trialPeriod+"=="+this.id)
      
      // this.trialPeriodForm.setValue({id: this.id, trialPeriod: this.trialPeriod})
  }

  get f() { return this.generateLink.controls }

  generateSocialLink(){
      this.submitted = true
      if(this.generateLink.invalid){
          return
      }
      const source = this.generateLink.get("socialProfile").value;
      this.generatedLink = `${document.location.host}/portal/job-description?token=${this.token}&source=${source}`
  }

  copyToClipboard() {
    this.urlInput.nativeElement.select();
    document.execCommand("copy", true);
    this.copyHeader = "Copied";
  }

  copyToClipboardGenLink() {
    this.genlinkinput.nativeElement.select();
    document.execCommand("copy");
  }
}
