import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ViewEncapsulation, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { dataTableObject, dataTableUrlEncode, colObject, customFields, page, pagehistory } from 'app/shared/data/data.object';
import { environment } from 'environments/environment';
import { FormGroup, Validators,FormBuilder} from '@angular/forms';
import { NgbTooltip, NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'app/shared/services/alerts.service';
import { AppService } from 'app/shared/services/app.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ConfigService } from "app/shared/services/config.service";
import { LayoutService } from "app/shared/services/layout.service";
import { Subscription } from "rxjs";
import * as swalFunctions from '../../shared/data/sweet-alerts';
import { NgbdModalShare } from "app/shared/ngbd-modal-share/ngbd-modal-share.component";
import { CandidateCommentPopup } from "app/shared/candidate-comment-popup/candidate-comment-popup.component";
import { ModalVideoPlayerComponent } from "app/shared/modal-video-player/modal-video-player.component";
import { HiringRoundComponent } from "../hiring-round/hiring-round.component";

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

export class CustomDataTable implements OnInit, AfterViewInit, OnDestroy{
    moduleData: any
    actions: any = []
    swal = swalFunctions;
    // pageHistory: pagehistory = this.appService.pageHistory
    // @Input() setting: dataTableObject
    // @Input() title: String
    // @Input('[defaultSort]') defaultSort: String
    // @Output() getAction = new EventEmitter()
    searchOpenClass = false
    @ViewChild('search') searchElement: ElementRef;
    @Output() seachTextEmpty = new EventEmitter<boolean>();
    dropdownList = [];
    advanceFilters : any = {}
    screenFilters : any = {}
    paginator: dataTableUrlEncode
    headerObject : colObject[] = []
    dataList : any[] = []
    searchForm : FormGroup
    tableWidth : number = 100;
    startLimit: number = 1
    endLimit: number
    totalElements : number
    totalPages: number
    fieldList: any
    trialPeriod: number
    id: number
    params : any
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
    buttons: any = []
    icons = []
    buttonList: any = []
    filterList: any[] = []
    filterParams: any
    screenFilterParams : any
    screenFilter = false
    config: any = {};
    layoutSub: Subscription;
    showData: boolean =  false
    showLoading: boolean = false;
    colSpan: number = 2

    constructor(private appService: AppService, private formBuilder : FormBuilder, private router: Router, private route: ActivatedRoute, private modalService: NgbModal, private alertService: AlertService, private spinner: NgxSpinnerService, public translate: TranslateService, private configService: ConfigService,private layoutService: LayoutService, private cdr: ChangeDetectorRef){
        this.config = this.configService.templateConf;
        this.layoutSub = this.layoutService.toggleTemplate$.subscribe(open => {
            this.dataList = []
            // this.isOpen = open;
            console.log(open)
            this.showData = open
            
            let conf = this.config;
            this.configService.applyTemplateConfigChange({ layout: conf.layout });
        });
        
    }

    ngOnInit(){
        
        this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
            if (templateConf) {
                this.config = templateConf;
            }
            this.cdr.markForCheck();

        })
        this.route.params.subscribe(params => {
            console.log(params)
            this.params = params
            console.log(this.params)
            console.log("on init");
            this.spinner.show(undefined,
            {
                type: 'ball-triangle-path',
                size: 'medium',
                bdColor: 'rgba(0, 0, 0, 0.8)',
                color: '#fff',
                fullScreen: true
            });
            console.log("test");
            this.appService.getCutomFields(this.params.moduleId).subscribe(data=>{
                console.log(data);
                
                this.tableWidth = 100
                this.actions = []
                this.buttons = []
                this.icons = []
                this.moduleData = data
                this.renderData()
            },error=>{
                console.log(error)
            })
        });
        
    }

    ngOnDestroy() {
        let conf = this.config;
        this.configService.applyTemplateConfigChange({ layout: conf.layout });
        if (this.layoutSub) {
          this.layoutSub.unsubscribe();
        }
    }

    renderData(){
        this.layoutService.toggleTemplateScreen(false)
        if(this.params.moduleId != this.appService.pageHistory.moduleId){
            this.appService.pageHistory = {
                startPage: environment.startPage,
                endPage: environment.endPage,
                currentPage: environment.page,
                tableClass: "table",
                moduleId: this.params.moduleId
            }
        }
        environment.api_url=environment.login_url+"/"+this.params.apiPath;
        this.paginator = {
            page_limit : environment.pageLimit,
            page_order : environment.order,
            page_page : environment.page,
            page_search : "",
            page_sort : "id",
            page_entryType: ""
        }
        
        // console.log("Call Form")
        this.searchForm = this.formBuilder.group({
            pageLimit: [this.paginator.page_limit],
            search: [''],
            multiSelect: [null]
        })
        
        // console.log(this.setting)
        let index = 0
        // console.log(this.setting.listObject)
        let headers: colObject[] = []
        this.headerObject = this.getHeaderField(this.moduleData.data,headers)
        console.log(this.headerObject)
        this.buttonList = this.moduleData.buttons
        console.log(this.buttonList)
        this.buttonList.list.buttonList.forEach(btn => {
            console.log(btn)
            if(btn["button"]["purpose"] == 'list'  && this.buttonList[btn["button"]["action"]["actions"]]){
                let act = {}
                act["name"] = btn["button"]["action"]["actions"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                this.actions.push(act)
            }
        });
        this.buttonList.list.buttonList.forEach(btn => {
            console.log(btn)
            if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "btn" && this.buttonList[btn["button"]["action"]["actions"]]){
                let act = {}
                act["name"] = btn["button"]["action"]["actions"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                //console.log(this.actionList.filter(x=>x.moduleId == this.params.moduleId))
                this.buttons.push(act)
            }
            if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "icon" && this.buttonList[btn["button"]["action"]["actions"]]){
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
        this.fieldList = JSON.stringify(this.moduleData.data)
        this.headerObject.forEach(x => {
            if(x.display){
                this.tableWidth = +this.tableWidth + +x.fieldWidth
                this.colSpan++
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
        this.filterParams["headerObject"] = this.moduleData.data
        this.filterParams["apiPath"] = this.params.apiPath

        this.screenFilterParams = {}
        this.screenFilterParams["buttons"] = this.params.buttons
        this.screenFilterParams["moduleUrl"] = this.params.moduleUrl
        this.screenFilterParams["action"] = "preferences"
        this.screenFilterParams["moduleId"] = this.params.moduleId
        this.screenFilterParams["fields"] = this.filterList
        this.screenFilterParams["moduleName"] = ''
        this.screenFilterParams["headerObject"] = this.moduleData.data
        this.screenFilterParams["apiPath"] = this.params.apiPath
        
        this.spinner.hide();
        this.layoutService.toggleTemplateScreen(true)
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
        this.appService.pageHistory.startPage = environment.startPage
        // this.endPage = environment.endPage
        this.appService.pageHistory.currentPage = 1
        this.toggleAdvanceSearchOpenClass()
        console.log(this.paginator.advanceSearchAnd)
        this.getSourceData()        
    }

    onScreenSearch(event){
        console.log(event)
        this.screenFilters = event.formData
        let advanceSearchAnd: any = {}
        let advanceSort: any = {}  
        this.paginator.filter_remove = false
        this.paginator.advanceSearchAnd = {}
        this.paginator.advanceSort = {}
        this.paginator.screen_filter = []
        this.paginator.page_search = ""
        switch(event.action){
            case 'Remove Filters':
                this.paginator.filter_remove = true
                break;
            case 'Apply':
                this.filterList.forEach(fields=>{
                    if(fields.display){
                        this.screenFilters.forEach(filter=>{
                            if(filter.fieldIndexingId == fields.id && filter.filterValue !="" ){
                                advanceSearchAnd[fields.fieldName] = filter.filterValue
                            }
                            fields.display = !filter.hidden
                            if(filter.sortFlag){
                                advanceSort[fields.fieldname] = filter.sortOrder
                            }
                        })
                    }
                })
                this.paginator.advanceSearchAnd = JSON.stringify(advanceSearchAnd)
                this.paginator.advanceSort = JSON.stringify(advanceSort)
                break;
            case 'Save and Apply':
                this.paginator.screen_filter = this.screenFilters
                break;
        }

        
        this.paginator.page_page = 1
        this.startLimit = 1
        this.appService.pageHistory.startPage = environment.startPage
        // this.endPage = environment.endPage
        this.appService.pageHistory.currentPage = 1
        this.toggleScreenFilterOpenClass()
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
                this.toggleScreenFilterOpenClass()
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
    getHeaderField(list,headers){
        let index = 0
        
        // let object = list
        list.forEach(head => {
            console.log(head)
            if(head["fieldType"] == 'object'){
                headers = this.getHeaderField(head.childCustomFields,headers);
            }
            if(head["indexing"]){
                console.log(headers)
                let col: colObject
                head["fieldIndexing"]["tableObject"] = []
                col = head["fieldIndexing"]
                col.sortIcon = "ft-arrow-down"
                col.hideCol = "Hide Column"
                col.hideColText = "Click to Hide Column"
                // if(col.display){
                headers.push(col)
                this.dropdownList.push({value: col.dataFieldName, label: head["fieldHeader"]})
                index++
                // }
            }

        });
        console.log(headers)
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
            this.dataList.forEach(list=>{
                if(list.pendingApproversDetails == null){
                    list.pendingApproversDetails = []
                }
            })
            console.log(this.dataList)
            this.totalPages = data["data"]["totalPages"]
            this.totalElements = data["data"]["totalElements"]
            if(this.paginator.page_limit < this.totalElements){
                this.endLimit = this.startLimit+ this.paginator.page_limit -1
            }else{
                this.endLimit = this.totalElements
            }
            if(this.totalPages < this.appService.pageHistory.currentPage){
                this.appService.pageHistory.currentPage = this.totalPages
                this.appService.pageHistory.endPage = this.totalPages
                if(this.appService.pageHistory.endPage <= environment.endPage){
                    this.appService.pageHistory.startPage = environment.startPage
                }else{
                    this.appService.pageHistory.startPage = this.appService.pageHistory.endPage - environment.endPage + 1
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
            if(page > this.appService.pageHistory.currentPage){
                this.startLimit = (this.paginator.page_limit * page)-this.paginator.page_limit +1
                if(this.appService.pageHistory.endPage < this.totalPages){
                    this.appService.pageHistory.startPage = this.appService.pageHistory.startPage + 1
                    this.appService.pageHistory.endPage = this.appService.pageHistory.endPage + 1	
                }
            }
            if(page < this.appService.pageHistory.currentPage){
                this.startLimit = (this.paginator.page_limit * page)-this.paginator.page_limit +1
                if(this.appService.pageHistory.startPage > 1){
                    this.appService.pageHistory.startPage = this.appService.pageHistory.startPage - 1
                    this.appService.pageHistory.endPage = this.appService.pageHistory.endPage - 1
                }
            }
            if(page == this.totalPages){
                this.startLimit = (this.paginator.page_limit * this.totalPages)-this.paginator.page_limit +1
                this.appService.pageHistory.endPage = this.totalPages
                if(this.appService.pageHistory.endPage > environment.endPage){
                    this.appService.pageHistory.startPage = this.appService.pageHistory.endPage - environment.endPage + 1
                }
            }

            if(page == 1){
                this.startLimit = 1
                this.appService.pageHistory.startPage = environment.startPage
            }
            this.appService.pageHistory.currentPage = page;
            this.paginator.page_page = page
            this.getSourceData();
        }
         
    }

    changeLimit(val){
        console.log("Call Third")
        if(val == "All"){
            console.log(this.totalElements)
            this.paginator.page_limit = this.totalElements
            this.paginator.page_page = 1
        }else{
            if(val >= this.totalElements){
                this.paginator.page_page = 1
            }
            this.paginator.page_limit = val
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
        this.appService.pageHistory.startPage = environment.startPage
        // this.endPage = environment.endPage
        this.appService.pageHistory.currentPage = 1
        console.log(this.paginator)
        this.getSourceData()
    }

    renderPaging() {
        // console.log(this.totalPages)
        if(this.totalPages < environment.endPage){
            this.appService.pageHistory.endPage = this.totalPages
        }else{
            this.appService.pageHistory.endPage = environment.endPage
        }
    }

    counter(i: number) {
        const array : any[] = []
        var x: number = this.appService.pageHistory.startPage
        for(x = this.appService.pageHistory.startPage; x <=i;x++){
            array.push(x);
        }
        return array;
    }
    openShare(token) {
        const modalRef = this.modalService.open(NgbdModalShare);
        modalRef.componentInstance.token = token;
        
    }
    openCandidateComment(id) {
        const modelRef = this.modalService.open(CandidateCommentPopup, {size: 'lg', backdrop: 'static', centered: true});
        modelRef.componentInstance.docRefId = id;
        modelRef.componentInstance.moduleId = this.params.moduleId;
    }

    openVideoPlayer(introVideo) {
        console.log(introVideo);
        const modalRef = this.modalService.open(ModalVideoPlayerComponent, {size: 'lg', backdrop: 'static', centered: true});
        modalRef.componentInstance.introVideo = introVideo;
    }
    openCandidateRoud(id){
        const modelRef=this.modalService.open(HiringRoundComponent,{size: 'lg', backdrop: 'static', centered: true})
        modelRef.componentInstance.docRefId=id;
        modelRef.componentInstance.params=this.params;
        modelRef.componentInstance.moduleAction=this.params.action
        modelRef.componentInstance.moduleId=this.params.moduleId;
    }
    onCustomAction(event) {
        console.log(event)
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
        else if(event.action == "round"){
            const candidateApplicationId=this.dataList.filter(x=>x.id == event.id)[0]["id"];
            console.log(candidateApplicationId);
            this.openCandidateRoud(candidateApplicationId);
        }
        else if(event.action !="grace"){
            this.router.navigate(['customForm',{params: JSON.stringify(this.params),action:event.action, data: event.id}] , {  relativeTo: this.route.parent, skipLocationChange: true });
            // event.entryType = this.setting.pager.entryType
            
            // this.getAction.emit(event)
        }
        else{
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

    toggleScreenFilterOpenClass(){
        if(this.screenFilter){
            this.screenFilter = false
        }else{
            this.screenFilter = true
        }
        console.log("ScreenFilter")
    }
    ngAfterViewInit(){
        let conf = this.config;
        this.configService.applyTemplateConfigChange({ layout: conf.layout });
        if (this.layoutSub) {
          this.layoutSub.unsubscribe();
        }
    }

    getData(data,fieldname){
        //console.log(data +" "+fieldname)
        if(data){
            let fields = fieldname.split(".")
            let value =data
            fields.forEach(f => {
                value = value[f]
                // console.log(value)
            });
            // console.log(fields)
            return value
        }
        
    }
}