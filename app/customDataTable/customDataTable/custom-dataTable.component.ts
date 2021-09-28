import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
// import { TranslateService } from '@ngx-translate/core';
// import { Subscription } from 'rxjs';
import { dataTableObject, dataTableUrlEncode, colObject, customFields } from 'app/shared/data/data.object';
import { environment } from 'environments/environment';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { NgbTooltip, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'app/shared/services/alerts.service';
import { AppService } from 'app/shared/services/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { NgbdModalShare } from 'app/shared/ngbd-modal-share/ngbd-modal-share.component';
import { ModalVideoPlayerComponent } from "app/shared/modal-video-player/modal-video-player.component";
import { CandidateCommentPopup } from 'app/shared/candidate-comment-popup/candidate-comment-popup.component';

@Component({
    selector: 'ngbd-modal-contents',
    providers: [AlertService],
    template: `
    <div class="modal-header">
      <h4 class="modal-title">Hi there!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
        <p>{{name}}</p>
        <form [formGroup]="trialPeriodForm" noValidate>
            <input type="hidden" name="id" id="id" formControlName="id"/>
            <input class="form-control" type="number" name="trialPeriod" id="trialPeriod" formControlName="trialPeriod" [ngClass]="{'is-invalid': submitted && f.trialPeriod.errors}" required />
            <small class="form-text text-muted danger" *ngIf="submitted && f.trialPeriod.errors && f.trialPeriod.errors.required">Please Enter trial Period</small>
        </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary btn-raised btn-info" (click)="save()">Save</button>
      <button type="button" class="btn btn-secondary btn-raised btn-danger" (click)="activeModal.dismiss('Close click')">Close</button>
    </div>
  `
})

export class NgbdModalContents implements OnInit {
    @Input() name: String;
    @Input() id: number;
    @Input() trialPeriod: number;
    @Input() moduleId: number
    @Output() success: EventEmitter<any> = new EventEmitter()
    submitted = false
    trialPeriodForm  : FormGroup
    
    constructor(public activeModal: NgbActiveModal, private appService: AppService, private router: Router,private route: ActivatedRoute, private formBuilder: FormBuilder, private alertService: AlertService) { 
        
        
    }

    ngOnInit(){
        // console.log("test" + this.appService.menuId)
        
        this.trialPeriodForm = this.formBuilder.group({
            id: [this.id],
            trialPeriod: [this.trialPeriod,Validators.required]
        })
        console.log(this.trialPeriod+"=="+this.id)
        
        // this.trialPeriodForm.setValue({id: this.id, trialPeriod: this.trialPeriod})
    }

    get f() { return this.trialPeriodForm.controls }
    save(){
        this.submitted = true
        if(this.trialPeriodForm.invalid){
            return
        }
        const formObject = this.appService.getNewObject(this.trialPeriodForm.value)
        console.log(formObject)
    }
    redirect(){
        this.router.navigate(['/adminpanel/clientMaster'],{  relativeTo: this.route.parent, skipLocationChange: true })
    }
}


@Component({
    selector: 'app-dataTable',
    providers: [AlertService],
    templateUrl: 'custom-dataTable.component.html',
    styleUrls: ['custom-dataTable.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CustomDataTable implements OnInit, AfterViewInit{
    @Input() setting: dataTableObject
    @Input() title: String
    @Input('[defaultSort]') defaultSort: String
    @Output() getAction = new EventEmitter()
    searchOpenClass = false
    @ViewChild('search') searchElement: ElementRef;
    @Output()
    seachTextEmpty = new EventEmitter<boolean>();
    dropdownList = [];
    advanceFilters : any = {}
    screenFilters : any = {}
    paginator: dataTableUrlEncode
    headerObject : colObject[] = []
    dataList : any[]
    searchForm : FormGroup
    tableClass: any
    currentPage: number;
    tableWidth : number = 100;
    startLimit: number = 1
    endLimit: number 
    pageLimit : number
    totalElements : number
    totalPages: number
    startPage: number
    endPage: number
    actions : any[] = []
    fieldList: any
    trialPeriod: number
    id: number
    params : any
    moduleActions: any[] = []
    advanceFilter = false
    filterTypes = [
        {key: 1, type: "text"},
        {key: 2, type: "number"},
        {key: 3, type: "select"},
        {key: 4, type: "autoCompleter"},
        {key: 5, type: "date"},
        {key: 6, type: "dateRange"},
        {key: 7, type: "time"},
        {key: 8, type: "timeRange"},
        {key: 9, type: "dateTime"},
        {key: 10, type: "dateTimeRange"},
        {key: 11, type: "textarea"},
        {key: 12, type: "spanText"},
        {key: 13, type: "textEditor"},
        {key: 14, type: "Section"},
        {key: 15, type: "table"},
        {key: 16, type: "radio"},
        {key: 17, type: "file"},
        {key: 18, type: "hidden"},
        {key: 19, type: "email"},
        {key: 20, type: "multiSelect"},
        {key: 21, type: "autoCompleterMultiSelect"},
        {key: 23, type: "multiFile"},
        {key: 24, type: "checkbox"},
        {key: 25, type: "tabs"},
        {key: 26, type: "object"},
        {key: 27, type: "multipleCheck"},
        {key: 28, type: "password"}
    ]
    buttons = []
    icons = []
    actionList = []
    filterList: any[] = []
    filterParams: any
    screenFilterParams : any
    screenFilter = false


    constructor(private appService: AppService, private formBuilder : FormBuilder, private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private alertService: AlertService, private spinner: NgxSpinnerService, public translate: TranslateService){
        console.log("hello");
        console.log("againt");
    }

    ngOnInit(){
        this.route.params.subscribe(params => {
            // this.onCustomAction(params);
            // this.params = params;
            console.log(params)
            this.params = params
            // this.appService
        });
        
        //this.moduleActions = JSON.parse(localStorage.get("actions"))['data']
        this.pageLimit = environment.pageLimit
        this.startPage = environment.startPage
        this.endPage = environment.endPage
        this.currentPage = environment.page
        // console.log("Call Form")
        this.searchForm = this.formBuilder.group({
            pageLimit: [this.pageLimit],
            search: [''],
            multiSelect: [null]
        })
        this.tableClass = this.setting.pager.tableClass
        this.actions = this.setting.actions
        environment.api_url=environment.login_url+"/"+this.params.apiPath;
        this.paginator = {
            page_limit : this.pageLimit,
            page_order : environment.order,
            page_page : environment.page,
            page_search : "",
            page_sort : this.setting.pager.pageSort,
            page_entryType: this.setting.pager.entryType
        }
        // console.log(this.setting)
        let index = 0
        console.log(this.setting.listObject)
        this.headerObject = this.getHeaderField(this.setting.listObject)
        this.actionList = JSON.parse(this.params.buttons)
        console.log(this.actionList)
        this.actionList["list"].buttonList.forEach(btn => {
            console.log(btn)
            if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "btn" && this.actionList[btn["button"]["action"]["actions"]]){
                let act = {}
                act["name"] = btn["button"]["action"]["actions"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                //console.log(this.actionList.filter(x=>x.moduleId == this.params.moduleId))
                this.buttons.push(act)
            }
            if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "icon" && this.actionList[btn["button"]["action"]["actions"]]){
                let act = {}
                act["name"] = btn["button"]["action"]["actions"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                this.icons.push(act)
            }
        });
        console.log(this.buttons)
        // this.headerObject = this.setting.listObject
        this.fieldList = JSON.stringify(this.setting.listObject)
        this.headerObject.forEach(x => {
            if(x.display){
                this.tableWidth = +this.tableWidth + +x.fieldWidth
            }
        });
        this.filterList = this.getFilters()
        this.filterParams = {}
        this.filterParams["buttons"] = this.params.buttons
        this.filterParams["moduleUrl"] = this.params.moduleUrl
        this.filterParams["action"] = "search"
        this.filterParams["moduleId"] = this.params.moduleId
        this.filterParams["fields"] = this.filterList
        this.filterParams["moduleName"] = ''
        this.filterParams["headerObject"] = this.setting.listObject
        this.filterParams["apiPath"] = this.params.apiPath

        this.screenFilterParams = {}
        this.screenFilterParams["buttons"] = this.params.buttons
        this.screenFilterParams["moduleUrl"] = this.params.moduleUrl
        this.screenFilterParams["action"] = "preferences"
        this.screenFilterParams["moduleId"] = this.params.moduleId
        this.screenFilterParams["fields"] = this.filterList
        this.screenFilterParams["moduleName"] = ''
        this.screenFilterParams["headerObject"] = this.setting.listObject
        this.screenFilterParams["apiPath"] = this.params.apiPath

        // this.router.navigate(['form',{buttons: this.params.buttons,moduleUrl: this.params.moduleUrl,action: event.action, moduleId: this.params.moduleId, fields: event.fields, moduleName: this.params.title,headerObject: this.params.headerObject,apiPath: this.params.apiPath}] , {  relativeTo: this.route.parent, skipLocationChange: true });
        // console.log("Call First")
        this.getSourceData()
        
    }
    
    onSearch(event){
        console.log(event)
        this.advanceFilters = event.formData
        let advanceSearchAnd: any = {}
        this.filterList.forEach(fields=>{
            if(fields.display){
                if(this.advanceFilters[fields.fieldName] != null){
                    advanceSearchAnd[fields.fieldName] = this.advanceFilters[fields.fieldName]
                }
            }
        })
        console.log(advanceSearchAnd)
        if(advanceSearchAnd){
            this.paginator.advanceSearchAnd = JSON.stringify(advanceSearchAnd)
            this.paginator.page_search = ""
        }else{
            this.paginator.advanceSearchAnd = ""
        }
        this.paginator.page_page = 1
        this.startLimit = 1
        this.startPage = environment.startPage
        // this.endPage = environment.endPage
        this.currentPage = 1
        this.toggleAdvanceSearchOpenClass()
        console.log(this.paginator.advanceSearchAnd)
        this.getSourceData()        
    }

    getFilters(){
        let filterList = []
        filterList = JSON.parse(this.fieldList)
        let newList = []
        filterList.forEach(head => {
            console.log(head)
            if(head["indexing"]){
                console.log(head["fieldIndexing"])
                let col: colObject
                // head["fieldIndexing"]["tableObject"] = []
                col = head["fieldIndexing"]
                if(head["fieldType"] != 'hidden' && col.display){
                    if(col.filter){
                        head["fieldName"] = col.dataFieldName
                        head["fieldHeader"] = col.indexFieldHeader
                        head["display"] = col.display
                        head["fieldType"] = this.filterTypes.filter(x=>x.key == col.filterType)[0]["type"]
                        head["isMandatory"] = ""
                        newList.push(head)
                    }
                }
            }
        });
        return newList
    }

    getName(val){
        console.log(val)
        switch(val){
            case 'Search': 
                this.toggleSearchOpenClass(true)
                break;
            case 'Prefference':
                this.toggleAdvanceSearchOpenClass()
                break;
        }
    }
    get f() { return this.searchForm.controls }
    onItemSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    getHeaderField(list){
        let index = 0
        let headers: colObject[] = []
        // let object = list
        list.forEach(head => {
            if(head["indexing"] && head["fieldType"] != "wizardStep"){
                console.log(head["fieldIndexing"])
                let col: colObject
                head["fieldIndexing"]["tableObject"] = []
                col = head["fieldIndexing"]
                col.sortIcon = "ft-arrow-down"
                col.hideCol = "Hide Column"
                col.hideColText = "Click to Hide Column"
                if(col.display){
                    headers[index] = col
                    this.dropdownList.push({value: col.dataFieldName, label: head["fieldHeader"]})
                    index++
                }
            }
            if(head["fieldType"] == "wizardStep"){
                const headerList = this.getHeaderField(head["childCustomFields"])
                headerList.forEach(fields=>{
                    headers[index] = fields
                    index++
                })
            }
            
        });
        console.log(this.dropdownList)
        return headers
    }

    showHide(id: number){
        let display : boolean
        display  = this.headerObject.filter(x=>x.id == id)[0].display
        if(display){
            this.headerObject.filter(x=>x.id == id)[0].display = false
        }else{
            this.headerObject.filter(x=>x.id == id)[0].display = true
        }
    }

    getSourceData(){
        this.spinner.show(undefined,
        {
            type: 'ball-triangle-path',
            size: 'medium',
            bdColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fullScreen: true
        });
        this.appService.getAll(this.paginator,this.params.moduleId).subscribe(data=>{
            console.log(data)
            // console.log(data);
            this.dataList = data["data"]["content"]
            // console.log(this.dataList)
            this.totalPages = data["data"]["totalPages"]
            this.totalElements = data["data"]["totalElements"]
            if(this.pageLimit < this.totalElements){
                this.endLimit = this.startLimit+ this.pageLimit -1
            }else{
                this.endLimit = this.totalElements
            }
            if(this.totalPages < this.currentPage){
                this.currentPage = this.totalPages
                this.endPage = this.totalPages
                if(this.endPage <= environment.endPage){
                    this.startPage = environment.startPage
                } else { 
                    this.startPage = this.endPage - environment.endPage + 1
                }
            }
            this.renderPaging()
            
            this.spinner.hide();
        },error=>{
            console.log(error)
            this.spinner.hide();
            this.alertService.typeError(error.message,error.status+" - "+error.error)
        })
    }

    getPage(page : number){
        console.log("Call Second")
        console.log("Clicked Page -- "+page)
        if(page >= 1 && page <= this.totalPages ){
            if(page > this.currentPage){
                this.startLimit = (this.pageLimit * page)-this.pageLimit +1
                if(this.endPage < this.totalPages){
                    this.startPage = this.startPage + 1
                    this.endPage = this.endPage + 1	
                }
            }
            if(page < this.currentPage){
                this.startLimit = (this.pageLimit * page)-this.pageLimit +1
                if(this.startPage > 1){
                    this.startPage = this.startPage - 1
                    this.endPage = this.endPage - 1
                }
            }
            if(page == this.totalPages){
                this.startLimit = (this.pageLimit * this.totalPages)-this.pageLimit +1
                this.endPage = this.totalPages
                if(this.endPage > environment.endPage){
                    this.startPage = this.endPage - environment.endPage + 1
                }
            }

            if(page == 1){
                this.startLimit = 1
                this.startPage = environment.startPage
            }
            this.currentPage = page;
            this.paginator.page_page = page
            this.getSourceData();
        }
         
    }

    changeLimit(val){
        console.log("Call Third")
        if(val == "All"){
            console.log(this.totalElements);
            this.pageLimit = this.totalElements;
            this.paginator.page_limit = this.totalElements;
            this.paginator.page_page = 1;
        } else {
            if(val >= this.totalElements) {
                this.paginator.page_page = 1;
            }
            // this.endPage = environment.endPage
            this.pageLimit = val;
            this.paginator.page_limit = val;
        }        
        this.getSourceData()
    }

    getSearchData(){
        console.log("Call Fourth")
        let val = this.searchForm.get("search").value
        let multiselect = this.searchForm.get("multiSelect").value
        let advanceSearch: any = {}
        if(val != ""){
            // let advanceSearch = {}
            if(multiselect != "" && multiselect != null){
                multiselect.forEach(element => {
                    // let x = {}
                    advanceSearch[element] = val
                });
                
                console.log(advanceSearch)
                this.paginator.advanceSearch = JSON.stringify(advanceSearch)
                this.paginator.page_search = ""
            }else{
                this.paginator.page_search = val
                this.paginator.advanceSearch = JSON.stringify(advanceSearch)
            }
        }else{
            this.paginator.page_search = ""
            this.paginator.advanceSearch = JSON.stringify(advanceSearch)
        }
        this.paginator.page_page = 1
        this.startLimit = 1
        this.startPage = environment.startPage
        // this.endPage = environment.endPage
        this.currentPage = 1
        console.log(this.paginator)
        this.getSourceData()
    }

    renderPaging(){
        // console.log(this.totalPages)
        if(this.totalPages < environment.endPage){
            this.endPage = this.totalPages
        }else{
            this.endPage = environment.endPage
        }
    }

    counter(i: number) {
        const array : any[] = []
        var x: number = this.startPage
        for(x = this.startPage; x <=i;x++){
            array.push(x);
        }
        return array;
    }

    onCustomAction(event, data) {
        if(event.action == "share"){
            console.log(event)
            console.log(this.dataList.filter(x=>x.id == event.id))
            const token = this.dataList.filter(x=>x.id == event.id)[0]["shareableToken"]
            this.openShare(token);
        }
        else if (event.action == "download") {
            console.log(event);
            console.log(this.dataList.filter(x => x.id == event.id));
            const resume = this.dataList.filter(x=>x.id == event.id)[0]["resume"]
            if (resume)
                this.appService.downloadResume(resume);
            else
                window.alert("No Resume Uploaded by Candidate");
        }
        else if (event.action == "comment") {
            const candidateId = this.dataList.filter(x=>x.id == event.id)[0]["id"]
            console.log(candidateId);
            this.openCandidateComment(candidateId);
        }
        else if (event.action == "playVideo") {
            console.log(event);
            console.log(this.dataList.filter(x => x.id == event.id));
            const introVideo = this.dataList.filter(x=>x.id == event.id)[0]["introVideo"]
            if (introVideo)
                this.openVideoPlayer(introVideo);
            else
                window.alert("Introduction Video Not Available For This Candidate");
        }

        else if(event.action !="grace") {
            event.fields = data
            event.entryType = this.setting.pager.entryType
            
            this.getAction.emit(event)
        }else{
            console.log("test")
            if((event.status == "Verified" || event.status == "Submitted") && event.subscriptionType == "Trial"){
                this.id = event.id
                this.trialPeriod = event.trialPeriod
                this.openContent()
            }else if(event.status == 2){
                alert("The Client should be verified");
            } else if(event.subscriptionType == "P" && event.status == 5){
                alert("The Client already subscribed for the package")
            }
        }
    }
    openContent() {
        const modalRef = this.modalService.open(NgbdModalContents);
        modalRef.componentInstance.name = 'Enter Trial Period in Days!';
        console.log(this.id+'--'+this.trialPeriod)
        modalRef.componentInstance.id = this.id
        modalRef.componentInstance.trialPeriod = this.trialPeriod
        modalRef.componentInstance.success.subscribe((result)=>{
            console.log(result)
            this.getSourceData()
        })
        
    }

    openShare(token) {
        const modalRef = this.modalService.open(NgbdModalShare);
        modalRef.componentInstance.token = token;
        
    }
    
    openVideoPlayer(introVideo) {
        console.log(introVideo);
        const modalRef = this.modalService.open(ModalVideoPlayerComponent, {size: 'lg', backdrop: 'static', centered: true});
        modalRef.componentInstance.introVideo = introVideo;
    }

    openCandidateComment(id) {
        const modelRef = this.modalService.open(CandidateCommentPopup, {size: 'lg', backdrop: 'static', centered: true});
        modelRef.componentInstance.docRefId = id;
        modelRef.componentInstance.moduleId = this.params.moduleId;
    }

    sort(sortable: boolean,dataFieldName: string, id:number){
        console.log("Call Fifth")
        console.log(sortable+"=="+dataFieldName)
        // console.log(sort)
        if(this.paginator.page_sort != dataFieldName){
            this.paginator.page_order ="desc"
            this.headerObject.filter(x=>x.dataFieldName == this.paginator.page_sort)[0].sortIcon = "ft-arrow-down"
            this.paginator.page_sort = dataFieldName;
        }
        if(this.paginator.page_order == "desc"){
            this.paginator.page_order = "asc"
            this.headerObject.filter(x=>x.id == id)[0].sortIcon = "ft-arrow-up"
        }else{
            this.paginator.page_order = "desc"
            this.headerObject.filter(x=>x.id == id)[0].sortIcon = "ft-arrow-down"
        }
        this.getSourceData()
    }
    
    hideCol(id: number){
        this.headerObject.filter(x=>x.id == id)[0].display = false
    }
    
    toggleSearchOpenClass(display) {
        // this.searchForm.get("search").setValue("");

        if (display) {
          this.searchOpenClass = true;
          setTimeout(() => {
            this.searchElement.nativeElement.focus();
          }, 0);
        }
        else {
          this.searchOpenClass = false;
        //   this.searchForm.reset();
          this.searchForm.get("search").setValue('')
          this.searchForm.get("multiSelect").setValue(null)
          this.getSearchData();
        }
        this.seachTextEmpty.emit(true);
    }
    toggleAdvanceSearchOpenClass(){
        if(this.advanceFilter){
            this.advanceFilter = false
        }else{
            this.advanceFilter = true
        }
    }
    ngAfterViewInit(){
    }
}