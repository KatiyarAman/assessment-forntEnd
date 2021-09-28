import { Component, ViewEncapsulation, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { NgbTooltip, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Http, Headers, RequestOptions, XHRBackend, BrowserXhr, ResponseOptions, CookieXSRFStrategy  } from '@angular/http';
import { CommonService } from 'app/shared/data/common.data';
import { NgSelectModule, NgOption} from '@ng-select/ng-select';
import { id } from '@swimlane/ngx-charts';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'app/shared/services/alerts.service';
import { AppService } from 'app/shared/services/app.service';
import { page, dataTableObject } from 'app/shared/data/data.object';


@Component({
    selector: 'index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class IndexComponent implements OnInit {
    id: number
    trialPeriod: number
    params : any
    pager : page;
    clientSetting: dataTableObject
    tabParams: any= []
    headerObject: any ;
    buttons: any

    constructor(private router: Router,private route: ActivatedRoute, private modalService: NgbModal, private appService: AppService) {
    }

    
    actions = []
    

    
    
    ngOnInit() {
        // console.log(this.appService.menuId)
        this.route.params.subscribe(params => {
            // this.onCustomAction(params);
            // this.params = params;
            console.log(params)
            this.params = params
            // this.appService
        });
        this.headerObject = JSON.parse(this.params.headerObject)
        this.tabParams["stdTable"] = {}
        this.tabParams["udfTable"] = {}
        this.buttons = JSON.parse(this.params.buttons);
        this.buttons.list.buttonList.forEach(btn => {
            console.log(btn)
            if(btn["button"]["purpose"] == 'list'  && this.buttons[btn["button"]["action"]["actions"]]){
                let act = {}
                act["name"] = btn["button"]["action"]["actions"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                this.actions.push(act)
            }
        });
        this.pager = {
            perPage: environment.pageLimit,
            tableClass:  "table table-responsive",
            pageSort: "id",
            entryType: "STD"
        }
        this.tabParams["stdTable"]["clientSetting"] = {
            pager: this.pager,
            actions: this.actions,
            listObject: JSON.parse(this.params.headerObject).filter(x=>x.fieldName == 'stdTable')[0]['childCustomFields']
        }
        this.pager = {
            perPage: environment.pageLimit,
            tableClass:  "table table-responsive",
            pageSort: "id",
            entryType: "UDF"
        }
        this.tabParams["udfTable"]["clientSetting"] = {
            pager: this.pager,
            actions: this.actions,
            listObject: JSON.parse(this.params.headerObject).filter(x=>x.fieldName == 'udfTable')[0]['childCustomFields']
        }
        console.log(this.tabParams)
         
        this.clientSetting = {
            pager: this.pager,
            actions: this.actions,
            listObject: JSON.parse(this.params.headerObject)
        }
    } 

    OnClickAdd(event) {
        this.router.navigate(['form', {action: event}], {  relativeTo: this.route.parent, skipLocationChange: true });
    }

    

    
    
    onCustomAction(event) {
        // console.log(event)
        switch ( event.action) {
        case 'add':
            this.router.navigate(['form',{buttons: this.params.buttons,moduleUrl: this.params.moduleUrl,action: event.action, moduleId: this.params.moduleId, fields: event.fields, title: this.params.title,headerObject: this.params.headerObject,apiPath: this.params.apiPath, entryType: event.entryType }] , {  relativeTo: this.route.parent, skipLocationChange: true });
            break;
        case 'edit':
            this.router.navigate(['form',{buttons: this.params.buttons,moduleUrl: this.params.moduleUrl,action: event.action, moduleId: this.params.moduleId, fields: event.fields, data: event.id, title: this.params.title,headerObject: this.params.headerObject,apiPath: this.params.apiPath, entryType: event.entryType}] , {  relativeTo: this.route.parent, skipLocationChange: true });
            break;
        case 'verify':
            if(event.status == "Submitted"){
                this.router.navigate(['form',{buttons: this.params.buttons,moduleUrl: this.params.moduleUrl,action: event.action, fields: event.fields, data: event.id, title: this.params.title,headerObject: this.params.headerObject,apiPath: this.params.apiPath, entryType: event.entryType}] , {  relativeTo: this.route.parent, skipLocationChange: true });
            }else{
                alert("The Client has already verified");
            }
           break;
        case 'view':
            this.router.navigate(['form',{buttons: this.params.buttons,moduleUrl: this.params.moduleUrl,action: event.action, moduleId: this.params.moduleId, fields: event.fields, data: event.id, title: this.params.title,headerObject: this.params.headerObject,apiPath: this.params.apiPath, entryType: event.entryType}] , {  relativeTo: this.route.parent, skipLocationChange: true });
           break;
        case 'cancel':
            // this.router.navigate(['/master',{message: "The Subscription for the Client No. "+event.data.clientCode+" has been canceled"}] , {  relativeTo: this.route.parent, skipLocationChange: true });
           break;
            
            
        }
      }

    toggleStatus(status, id) {
        console.log(status+"----"+id);
    }


}