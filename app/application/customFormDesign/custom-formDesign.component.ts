import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { iif, interval, Subscription } from 'rxjs';
import { customFieldData, customFields } from 'app/shared/data/data.object';
import { environment } from 'environments/environment';
import { ReactiveFormsModule, NG_VALIDATORS, FormsModule, FormControl, FormGroup, Validators, NgForm, ValidatorFn, Validator, FormBuilder, FormArray} from '@angular/forms';
import { AppService } from 'app/shared/services/app.service';
import { AlertService } from 'app/shared/services/alerts.service';
import { dateValidation, passwordMatchValidator } from 'app/shared/services/customValidator.services';
// import * as fileSaver from 'file-saver';
import { id } from '@swimlane/ngx-charts';
import { SkillCardModel } from "../skillCardComponent/skill-card.component";
import { threadId } from "worker_threads";
import { analytics } from "firebase";
import { title } from "process";


@Component({
    providers: [AlertService],
    selector: 'app-customForm',
    templateUrl: 'custom-formDesign.component.html',
    styleUrls: ['custom-formDesign.component.scss']
})

export class CustomFormDesign implements OnInit, AfterViewInit{
    dataForm: FormGroup
    params: any = {}
    fieldList: customFields[] = [];
    formType ="verticle"
    formColumn = 3
    formObject : any
    rowCount: number
    colCount: number = 0
    submitted = false
    @ViewChild('fileUploader') fileUploader:ElementRef;
    action = ""
    formData: any = {}
    fieldDisplay = false
    childTableForms: any = {}
    childObject: any = {}
    childObjectData: any = {}
    childFieldData: any = {}
    actionList = []
    buttons = []
    icons = []
    lineIcons = []
    subscription : Subscription
    documents: any[] = []
    skills: SkillCardModel;
    applyMandatorySkills: any = [];
    formArray = false;
    showVideoCam = false;
    link = ""
    showData: boolean;
    config: any = {};
    fileName = ""
    layoutSub: Subscription;
    videoTimer = 60
    mainFiles: any[] = []
    showLoading: boolean = false;
    excelData: any
    constructor(private appService: AppService, private formBuilder : FormBuilder, private router: Router, private route: ActivatedRoute, private alertService: AlertService, private translae: TranslateService){
        
    }
    ngOnInit(){
        this.route.params.subscribe(params => {
            console.log(params)
            this.params = JSON.parse(params.params)
            this.params.action = params.action
            this.params.data = params.data
            console.log(this.params)
            this.actionList = JSON.parse(this.params.buttons)
            console.log(this.actionList)
            this.actionList[this.params.action].buttonList.forEach(btn => {
                console.log(btn)
                if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "btn"){
                    this.buttons.push(btn.button)
                }
                if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "icon"){
                    this.icons.push(btn.button)
                }            
                if(btn["button"]["purpose"] == 'lineItems' && btn["button"]["type"] == "icon"){
                    this.lineIcons.push(btn.button)
                }
            });
            console.log(this.buttons)
            this.fieldList = []
            this.fieldList = JSON.parse(this.params.headerObject)
            this.getFormFields()
        })
        const source = interval(20000);
        const text = 'Your Text Here';
        //this.subscription = source.subscribe(val => this.OnSave('serialize'));
        // console.log(this.params.fields)
        // this.title = this.params.moduleName
        
        
    }
    

    getCustomFields(){
        this.getFormFields()
    }

    get f() { return this.dataForm.controls }
    options: any = []
    hide: any = []
    getFormFields(){
        let group = {}
        let displayFields = 0
        console.log(this.fieldList)
        this.fieldList.forEach(field=>{
            // this.hide[field.fieldName] = true
            if(field.fieldType != 'section'  && field.fieldType != 'wizardStep' && field.fieldType != 'table' && field.fieldType != 'object' && field.fieldType != 'file'){
                let value: any;
                value = field.dataSource
                if(field.fieldType == 'select' || field.fieldType == 'autoCompleter' ||  field.fieldType == 'multiSelect' || field.fieldType == 'radio'){
                    if(field.srcModule!= null){
                        field.fieldType == 'autoCompleter' ? value = null : value = ''
                        let object = {}
                        switch(field.fieldName){
                            case 'employeeId':
                                object['isERPUser'] = true
                                break;
                        }
                        
                        if(field.onChange == null){
                           // console.log(field.fieldName)
                            this.getOptions(field,value, object,0,0)
                        }
                    }else{
                        if(field.options.filter(x=>x.defaultValue == true).length > 0)
                        value = field.options.filter(x=>x.defaultValue == true)[0]['value']
                        else
                        field.fieldType == 'autoCompleter' ? value = null : value = ''
                    }
                    
                }
                
                
                if(this.params.entryType && field.fieldName == 'entryType'){
                    // console.log(value)
                }
                group[field.fieldName]=new FormControl(value);
                field.childCustomFields.forEach(child => {
                    value = child.dataSource
                    let object = {}
                    //console.log(this.action)
                    if(child.fieldType == 'select' ||  child.fieldType == 'multiSelect' || child.fieldType == 'autoCompleter' || child.fieldType == 'radio'){
                        if(child.srcModule!= null){
                            child.fieldType == 'autoCompleter' ? value = null : value = ""
                            if(field.onChange == null){
                               // console.log(field.onChange)
                                this.getOptions(child,value, object,field.id,0)
                            }
                        }else{
                            if(child.options.filter(x=>x.defaultValue == true).length > 0)
                            value = child.options.filter(x=>x.defaultValue == true)[0]['value']
                            else
                            child.fieldType == 'autoCompleter' ? value = null : value = ''
                        }
                    }

                    let Validations = []
                    // Validations = this.getValidation(child)
                    group[child.fieldName]=new FormControl(value,Validations);
                    if(field.defaultShow){
                        displayFields += 1
                    }
                })
            }
            // console.log(field)
            if(field.fieldType == 'table'){
                if(field.srcModule != null) {
                    group[field.fieldName] = new FormArray([]);
                    // this.appService.getById(this.formData.jobPostingId, field.srcModule).subscribe((res: any) => {
                    //     console.log(res);
                    // });
                    if (field.childCustomFields.length > 0) {
                        let child = {}
                        let tableWidth = 0
                        console.log(field.childCustomFields)
                        this.childFieldData[field.fieldName] = []
                        field.childCustomFields.forEach(ch => {
                            let value: any
                            value = ch.dataSource
                            // console.log(ch.fieldName)
                            if (ch.fieldIndexing != null && ch.defaultShow) {
                                tableWidth += ch.fieldIndexing["fieldWidth"]
                            }
                        })
                        this.childTableForms[field.fieldName + "width"] = tableWidth
                    }
                }else{
                    if(field.childCustomFields.length > 0){
                        let child = {}
                        let tableWidth = 0
                        //console.log(field.childCustomFields)
                        this.childFieldData[field.fieldName] = []
                        field.childCustomFields.forEach(ch=>{
                            let value: any
                            value = ch.dataSource
                            // console.log(ch.fieldName)
                            if(ch.fieldIndexing != null && ch.defaultShow){
                                tableWidth += ch.fieldIndexing["fieldWidth"]
                            }
                            
                            if(ch.fieldType == 'select' || ch.fieldType == 'autoCompleter' ||  ch.fieldType == 'multiSelect' || ch.fieldType == 'radio'){
                                if(ch.srcModule!= null){
                                    // value = ""
                                    let object = {}
                                    ch.fieldType == 'autoCompleter' ? value = null : value = ""
                                    if(ch.onChange == null){
                                        this.getOptions(ch,value, object,field.id,1)
                                    }
                                }else{
                                    if(ch.options.filter(x=>x.defaultValue == true).length > 0)
                                    value = ch.options.filter(x=>x.defaultValue == true)[0]['value']
                                    else
                                    ch.fieldType == 'autoCompleter' ? value = null : value = ''
                                    // console.log(ch.options)
                                }
                                
                            }
                            if(ch.fieldType != 'spanText' && ch.fieldType != 'multipleCheck' && ch.fieldType != 'file'){
                                child[ch.fieldName]=new FormControl(value);
                            }
    
                            if(ch.fieldType == 'multipleCheck'){
                                console.log(ch.fieldName)
                                child[ch.fieldName]=new FormArray([]);
                                
                                switch(ch.fieldName){
                                    case 'permission':
                                        if(this.params.action != "edit"){
                                            environment.api_url = environment.login_url+"/module";
                                            this.appService.getModuleActions(ch.srcModule).subscribe(data=>{
                                                console.log(data);
                                                let moduleActions = data['data']
                                                moduleActions.forEach(module => {
                                                    let permission = []
                                                    module.mappingResponseDTOs.forEach(actions => {
                                                        let amp = {}
                                                        amp["id"] = ""
                                                        amp["moduleActionId"] = actions.id
                                                        amp["permission"] = false
                                                        amp["action"] = actions.actionName
                                                        amp["roleId"] = ""
                                                        permission.push(amp)
                                                    });
    
                                                    this.childFieldData[field.fieldName].push({id:"",modulNametitle:module.title , permissiontitle: permission})
                                                });
                                                console.log(this.childFieldData[field.fieldName])
                                                
                                            })
                                        }
                                        break;
                                }
                            }
                                                   
                            ch.childCustomFields.forEach(chx => {
                                value = chx.dataSource
                                console.log(this.action)
                                if(chx.fieldType == 'select' ||  chx.fieldType == 'multiSelect' || chx.fieldType == 'autoCompleter'|| chx.fieldType == 'radio'){
                                    if(chx.srcModule!= null){
                                        let object = {}
                                        // value = ""
                                        chx.fieldType == 'autoCompleter' ? value = null : value = ""
                                        if(chx.onChange == null){
                                            this.getOptions(ch,value, object,field.id,1)
                                        }
                                    }else{
                                        if(chx.options.filter(x=>x.defaultValue == true).length > 0)
                                        value = chx.options.filter(x=>x.defaultValue == true)[0]['value']
                                        else
                                        chx.fieldType == 'autoCompleter' ? value = null : value = ''
                                    }
                                }
                                // let Validations = []
                                // Validations = this.getValidation(chx)
                                child[chx.fieldName]=new FormControl(value);
    
                            })
                            
                        })
                        this.childTableForms[field.fieldName+"width"] = tableWidth
                        this.childTableForms[field.fieldName] = new FormGroup(child)
                        this.childTableForms[field.fieldName+"submitted"] = false
                        this.childTableForms[field.fieldName+"edit"] = false
                        this.childTableForms[field.fieldName+"editIndex"] = null
                        
                    }
                } 
            }
            if(field.fieldType == 'object'){
                if(field.childCustomFields.length > 0){
                    let child = {}
                    let tableWidth = 0
                    field.childCustomFields.forEach(ch=>{
                        let value: any
                        value = ch.dataSource
                        // console.log(ch.fieldName)
                        
                        if(ch.fieldType == 'select' || ch.fieldType == 'autoCompleter'){
                            if(ch.srcModule!= null){
                                let object = {}
                                value = ""
                                ch.fieldType == 'autoCompleter' ? value = null : value = ""
                                if(field.onChange == null){
                                    this.getOptions(child,value, object,field.id,0)
                                }
                            }else{
                                if(ch.options.filter(x=>x.defaultValue == true).length > 0)
                                value = ch.options.filter(x=>x.defaultValue == true)[0]['value']
                                else
                                ch.fieldType == 'autoCompleter' ? value = null : value = ''
                                // console.log(ch.options)
                            }
                            
                        }
                        child[ch.fieldName]=new FormControl(value);
                    })
                    this.childObject[field.fieldName] = new FormGroup(child)
                }
                console.log(this.hide)
            }
            
        })


        this.dataForm = this.formBuilder.group(group)
        //console.log(this.dataForm)
        this.getValidation(this.fieldList);
        // this.dataForm.setValue(this.appService.getNewObject(this.dataForm.value))
        if(this.dataForm.get("msmeReg")){
            this.getEvent(this.dataForm.get("msmeReg").value,"msmeReg",this.fieldList.filter(x=>x.fieldName=='msmeReg')[0]["fieldType"],'',this.fieldList.filter(x=>x.fieldName=='msmeReg')[0]["id"])
        }

        if(this.dataForm.get("isMandatory")){
            this.getEvent(this.dataForm.get("isMandatory").value,"isMandatory",this.fieldList.filter(x=>x.fieldName=='isMandatory')[0]["fieldType"],'',this.fieldList.filter(x=>x.fieldName=='isMandatory')[0]["id"])
        }

        if(this.dataForm.get("fieldType")){
            this.getEvent(this.dataForm.get("fieldType").value,"fieldType",this.fieldList.filter(x=>x.fieldName=='fieldType')[0]["fieldType"],'',this.fieldList.filter(x=>x.fieldName=='fieldType')[0]["id"])
        }
        
        if(this.params.action == "edit" || this.params.action == "view" ){
            this.getData()
        }
            
    }

    fileChangeEvent(doc) {
        if(doc.target.files && doc.target.files.length>0) {
            this.documents = []
            for(const file of doc.target.files) {
                this.documents.push(file)
            }
            console.log(this.documents)
        }
    }

    fileChangeEventMain(doc,field) {
        console.log(field)
        if (doc.target.files && doc.target.files.length > 0) {
            this.mainFiles = [];
            for (const file of doc.target.files) {
                this.mainFiles.push(file)
            }
            console.log(this.mainFiles)
            if(field.fieldName == 'uploadTemplate'){
                console.log(this.params)
                this.showOnChangeField(field.id,false)
                environment.api_url = environment.login_url+"/"+this.params.apiPath;
                this.appService.processFiles(this.mainFiles,this.params.moduleId).subscribe(x=>{
                    console.log(x)
                    this.excelData = x
                    let options = []
                    this.excelData.forEach(src => {
                        options.push({value: src.sheetName, title:src.sheetName, default: 0})
                    // console.log(options)
                    });
                    this.fieldList.filter(x=>x.onChange == field.id && x.fieldName == "sheetName")[0]["options"] = options
                    this.showOnChangeField(field.id,true)
                },error=>{
                    console.log(error)
                    this.showOnChangeField(field.id,false)
                })
            }
        }
        
    }

    download(url,name){
        //console.logog(url)
        // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob))
        //fileSaver.saveAs(url, name)
    }

    getOptions(fields,value, object, parentFieldId,level){
         //console.log(fields +" value: "+value +" object: "+object+" parentFieldId: "+parentFieldId +" level:  "+level)
         environment.api_url = environment.login_url+"/module";
        this.appService.getById(fields.srcModule,120,2).subscribe(module=>{
            // console.log(module)
            environment.api_url = environment.login_url+"/"+module["apiPath"];
            this.appService.getAllActive(this.params.moduleId, object).subscribe(data=>{
                // console.log(data)
                let source = data["data"]
                let options = []
                source.forEach(src => {
                    options.push({value: src["id"], title:src["name"], default: value == src["id"] ? 1 : 0})
                   // console.log(options)
                });
               //console.log(options)
                if(level == 0){
                    this.fieldList.filter(x=>x.id == fields.id)[0]["options"] = options
                }else if(level == 1){
                    //console.log(parentFieldId )
                    this.fieldList.filter(x=>x.id == parentFieldId)[0]["childCustomFields"].filter(y=>y.id == fields.id)[0]["options"] = options
                }else{
                    this.fieldList.filter(x=>x.id == parentFieldId)[0]["childCustomFields"].filter(y=>y.id == fields.id)[0]["childCustomFields"].filter(z=>z.id == fields.id)[0]["options"] = options
                }
                
            },error=>{
                console.log(error)
            })
        })
        
    }

    getData(){
        environment.api_url = environment.login_url+"/"+this.params.apiPath;
        this.appService.getById(this.params.data,this.params.moduleId,3).subscribe(data=>{
           // console.log(data)
            this.formData = data
            console.log(this.formData)
            this.setDataValues();
        })
    }

    setDataValues(){
        this.fieldList.forEach(fields=>{
            
            if(fields.fieldType != 'table' && fields.fieldType != 'object' && fields.fieldType != 'Section' && fields.fieldType != 'multipleCheck' && fields.entryType != 'UDF'){
              //console.log(fields.fieldName+" = "+this.formData[fields.fieldName])
                if(fields.fieldName == 'cityId'){
                    environment.api_url = environment.login_url+"/city";
                    this.appService.getById(this.formData[fields.fieldName],fields.srcModule,1).subscribe(data=>{
                        console.log(data);
                        this.dataForm.get("countryId").setValue(data["state"]["country"]["id"])
                        this.dataForm.get("stateId").setValue(data["state"]["id"])
                        this.dataForm.get("cityId").setValue(this.formData[fields.fieldName])
                    })
                }else{
                    if(this.formData[fields.fieldName] !=null){
                        this.dataForm.get(fields.fieldName).setValue(this.formData[fields.fieldName])
                    }
                   
                }
                if(fields.fieldName == "confimPassword"){
                    console.log(fields.fieldName)
                    this.dataForm.get(fields.fieldName).setValue(this.formData["password"])
                }

                if(fields.fieldType == "password" || this.params.action == 'view'){
                    this.dataForm.controls[fields.fieldName].disable({onlySelf: true});
                }
            }
            if(fields.fieldType == 'table'){
                //console.log(this.formData)
                if (fields.srcModule != null ) {
                    console.log(this.formData)
                    this.childTableForms[fields.fieldName] = this.f[fields.fieldName] as FormArray
                    if(this.formData.jobPostingId){
                        environment.api_url = environment.login_url+"/jobPosting"
                        this.appService.getById(this.formData.jobPostingId,fields.srcModule,4).subscribe(posting=>{
                            this.videoTimer = posting["introVideoDuration"];
                            this.fileName = this.formData["id"]+" - " + this.formData["name"] +new Date().toDateString()
                            //console.log(posting)
                            this.applyMandatorySkills = posting['applyMandatorySkills']
                            this.applyMandatorySkills.forEach(skills => {
                                this.childTableForms[fields.fieldName].push(this.formBuilder.group({
                                    id: [],
                                    mandatorySkillId: [skills.id],
                                    haveSkill: [false],
                                    experience: [''],
                                    experienceUnit: ['MONTH'],
                                    comment: ['']
                                  }))
                            });
                            this.formArray = true
                            console.log(this.childTableForms[fields.fieldName])
                            console.log("layout service")
                            
                        });
                    }
                }
                else {
                    let child = {}
                    switch(fields.fieldName){
                        case 'permissions':
                            fields.childCustomFields.forEach(ch => {
                                if(ch.fieldType == 'multipleCheck'){
                                    console.log(ch.fieldName)
                                    child[ch.fieldName]=new FormArray([]);
                                    
                                    switch(ch.fieldName){
                                        case 'permission':
                                            if(this.params.action == "edit"){
                                                environment.api_url = environment.login_url+"/module";
                                                this.appService.getModuleActions(ch.srcModule).subscribe(data=>{
                                                    console.log(data);
                                                    let moduleActions = data['data']
                                                    moduleActions.forEach(module => {
                                                        let permission = []
                                                        // console.log(module.title);
                                                        module.mappingResponseDTOs.forEach(actions => {
                                                             
                                                            // console.log(this.formData[fields.fieldName].filter(x=>x.moduleActionId == actions.id)); 
                                                            let amp = {}
                                                            if(this.formData[fields.fieldName].filter(x=>x.moduleActionId == actions.id).length > 0){
                                                                // console.log(this.formData[fields.fieldName].filter(x=>x.moduleActionId == actions.id));
                                                                amp["id"] = this.formData[fields.fieldName].filter(x=>x.moduleActionId == actions.id)[0]["id"]
                                                                amp["moduleActionId"] = actions.id
                                                                amp["permission"] = this.formData[fields.fieldName].filter(x=>x.moduleActionId == actions.id)[0]["permission"]
                                                                amp["action"] = actions.actionName
                                                                amp["roleId"] = this.formData[fields.fieldName].filter(x=>x.moduleActionId == actions.id)[0]["roleId"]
                                                            }else{
                                                                amp["id"] = ""
                                                                amp["moduleActionId"] = actions.id
                                                                amp["permission"] = false
                                                                amp["action"] = actions.actionName
                                                                amp["roleId"] = ""
                                                            }
                                                            
                                                            permission.push(amp)
                                                        });
        
                                                        this.childFieldData[fields.fieldName].push({id:"",modulNametitle:module.title , permissiontitle: permission})
                                                    });
        
                                                    
                                                })
                                            }
                                            break;
                                    }
                                }
                            });
                            break;
                        default:
                            if(fields.fieldName){                                
                               // console.log(fields.fieldName + " "+ fields.module + " "+fields.childCustomFields)
                                if(fields.fieldName =='question'){
                                    console.log(fields.fieldName);
                                    fields.childCustomFields.forEach(ch=>{
                                       if(ch.fieldType == 'autoCompleter' || ch.fieldType == 'text'){
                                           console.log(ch.id)
                                           environment.api_url =environment.login_url+"/assessment-tests";
                                           this.appService.getQuestionnaireDetailsById(this.params.data).subscribe(response=>{
                                               console.log(response)
                                               response["mapping"].forEach(que => {
                                                let childObject = {}
                                                childObject["assessmentTestId"] = que.assessmentTestId
                                                childObject["questionId"] = que.assessmentQuestionnaire.questionnaireId
                                                childObject["questionIdtitle"] = que.assessmentQuestionnaire.question
                                                
                                                this.childFieldData["question"].push(childObject)
                                            });
                                           })
                                       }
                                    })
                                }
                                if(this.formData[fields.fieldName] != null){
                                this.formData[fields.fieldName].forEach(childData => {
                                    // console.log(childData["id"])
                                    fields.childCustomFields.forEach(ch => {
                                        if(ch.fieldType == 'select' || ch.fieldType == 'autoCompleter' || ch.fieldType == 'multiSelect'){
                                            switch(ch.fieldName){
                                                case 'cityId':
                                                    environment.api_url = environment.login_url+"/city";
                                                    this.appService.getById(childData[ch.fieldName],ch.srcModule,5).subscribe(data=>{
                                                        let city = data
                                                        console.log(city)
                                                        childData[ch.fieldName+'title'] = city["cityName"]
                                                        childData["countryId"] = city["state"]["country"]["id"]
                                                        childData["countryIdtitle"] = city["state"]["country"]["countryName"]
                                                        childData["stateId"] = city["state"]["id"]
                                                        childData["stateIdtitle"] = city["state"]["stateName"]
                                                    })
                                                    break;
                                                default:
                                                  // console.log(ch.fieldName +" "+ch.fieldType)
                                                    //console.log(ch.options);
                                                   // console.log(childData[ch.fieldName]);
                                                   // console.log(ch.options.filter(x=>x.value==(childData[ch.fieldName]+"")));
                                                    if(ch.options.length > 0){
                                                        if(ch.fieldType == 'multiSelect') {
                                                            console.log(childData[ch.fieldName])
                                                            childData[ch.fieldName+'title'] = ""
                                                            childData[ch.fieldName].forEach(id => {
                                                                if(childData[ch.fieldName+'title'] == ""){
                                                                    childData[ch.fieldName+'title'] = ch.options.filter(x=>x.value==(id+""))[0]['title']
                                                                }else{
                                                                    childData[ch.fieldName+'title'] = childData[ch.fieldName+'title'] +", "+ ch.options.filter(x=>x.value==(id+""))[0]['title']
                                                                }
                                                            });
                                                        }else{
                                                            // console.log(ch.fieldType)
                                                            if(childData[ch.fieldName] !=null){
                                                            childData[ch.fieldName+'title'] = ch.options.filter(x=>x.value==(childData[ch.fieldName]+""))[0]['title']
                                                        }}
                                                        
                                                    }else{
                                                        //console.log(ch)
                                                        childData[ch.fieldName+'title'] = this.getDataValue(childData,ch["fieldIndexing"]["dataFieldName"])
                                                    }
                                                    
                                            }
                
                                        }else {
                                           // console.log(ch.fieldName +"=="+childData[ch.fieldName])
                                            childData[ch.fieldName+'title'] = childData[ch.fieldName]
                                        }
                                    });
                                    console.log(childData)
                                    this.childFieldData[fields.fieldName].push(childData)
                                });
                            }}
                            break;
                    }
                }
                
            }
            if(fields.fieldType == 'object'){
                if(this.formData[fields.fieldName] != null){
                    fields.childCustomFields.forEach(ch=>{
                        this.childObject[fields.fieldName].get(ch.fieldName).setValue(this.formData[fields.fieldName][ch.fieldName])
                    })
                }
            }
            if(fields.entryType == 'UDF'){
                //console.log(this.formData.customFieldDatas.filter(x=>x.customFieldId == fields.id)[0])
                let value = ''
                if(this.formData[fields.fieldName] !=null){
                value = this.formData.customFieldDatas.filter(x=>x.customFieldId == fields.id)[0]["fieldData"]
                }
                console.log(this.dataForm)
                console.log(fields.fieldName)
                this.dataForm.get(fields.fieldName).setValue(value)
                if(this.params.action == 'view'){
                    this.dataForm.controls[fields.fieldName].disable({onlySelf: true});
                }
            }
        })
    }

    counter(i: number) {
        const array : any[] = []
        var x: number = 0
        for(x = 0; x < i; x++){
            array.push(x);
        }
        console.log(array)
        return array;
    }

    getValidation(fieldList){
        fieldList.forEach(field => {
            this.setValidation(field)
        });
    }
    setValidation(field){
        
        if(field.fieldType != 'section' && field.fieldType != 'table' && field.fieldType != 'wizardStep' && field.fieldType != 'object' && field.fieldType != 'file'){
            let validations = []
            if(field.fieldValidations.length>0){
                //console.log(field.fieldValidations)
                
                field.fieldValidations.forEach(valid=>{
                    switch(valid.validationName){
                        case 'maxlength':
                            console.log("maxlength :"+valid.validationName)
                            validations.push(Validators.maxLength(parseInt(valid.matchCase)))
                            break;
                        case 'minlength':
                            console.log("minlength :"+valid.validationName)
                            validations.push(Validators.minLength(parseInt(valid.matchCase)))
                            break;
                        case 'pattern':
                            console.log("pattern :"+valid.validationName)
                            validations.push(Validators.pattern(valid.matchCase))
                            break;
                        case 'passwordMatchValidator':
                            validations.push(passwordMatchValidator(this.appService.getNewObject(this.dataForm.value)["password"]))
                            break;
                        case 'datevalidation':
                            console.log(this.dataForm.get(this.fieldList.filter(x=>x.id == valid.refCustomFieldId)[0]["fieldName"]).value)
                            let value = this.dataForm.get(this.fieldList.filter(x=>x.id == valid.refCustomFieldId)[0]["fieldName"]).value
                            console.log(value)
                            if(value!= null){
                                let type = {
                                    value: value,
                                    case: valid.matchCase
                                }
                                validations.push(dateValidation(type))
                            }else{
                                this.dataForm.get(this.fieldList.filter(x=>x.id == valid.refCustomFieldId)[0]["fieldName"]).valueChanges.subscribe(set=>{
                                    console.log(set)
                                    this.setValidation(field)
                                })
                            }
                    }
                })
            }
            if(field.isMandatory == 'required'){
                validations.push(Validators.required)
            }
            //console.log("validation Field == "+field.fieldName)
            this.dataForm.get(field.fieldName).setValidators(validations)                
            this.getValidation(field.childCustomFields)
        }
        if(field.fieldType == 'table'){
            if(field.srcModule != null){

            }else{
                field.childCustomFields.forEach(ch => {
                    let validations = []
                    if(ch.fieldValidations.length>0){
                        // console.log(field.fieldValidations)
                        
                        ch.fieldValidations.forEach(valid=>{
                            switch(valid.validationName){
                                case 'maxlength':
                                    validations.push(Validators.maxLength(parseInt(valid.matchCase)))
                                    break;
                                case 'minlength':
                                    validations.push(Validators.minLength(parseInt(valid.matchCase)))
                                    break;
                                case 'pattern':
                                    validations.push(Validators.pattern(valid.matchCase))
                                    break;
                                case 'passwordMatchValidator':
                                    validations.push(passwordMatchValidator(this.childTableForms[field.fieldName].get("password").value))
                                    break;
                                case 'datevalidation':
                                    console.log(this.childTableForms[field.fieldName].get(field.childCustomFields.filter(x=>x.id == valid.refCustomFieldId)[0]["fieldName"]).value)
                                    let value = this.childTableForms[field.fieldName].get(field.childCustomFields.filter(x=>x.id == valid.refCustomFieldId)[0]["fieldName"]).value
                                    console.log(value)
                                    if(value!= null){
                                        let type = {
                                            value: value,
                                            case: valid.matchCase
                                        }
                                        validations.push(dateValidation(type))
                                    }else{
                                        this.childTableForms[field.fieldName].get(field.childCustomFields.filter(x=>x.id == valid.refCustomFieldId)[0]["fieldName"]).valueChanges.subscribe(set=>{
                                            console.log(set)
                                            this.setValidation(field)
                                        })
                                    }
                            }
                        })                        
                    }                    
                    if(ch.isMandatory == 'required'){
                        validations.push(Validators.required)
                    }
                    // console.log(ch.fieldName)
                    if(ch.fieldType != 'multipleCheck' && ch.fieldType != 'spanText' && ch.fieldType != 'file'){
                        this.childTableForms[field.fieldName].get(ch.fieldName).setValidators(validations)
                        ch.childCustomFields.forEach(chx => {
                            if(chx.fieldType != 'section' && chx.fieldType != 'table' && chx.fieldType != 'object'){
                                validations = []
                                if(chx.fieldValidations.length>0){
                                    chx.fieldValidations.forEach(valid=>{
                                        switch(valid.validationName){
                                            case 'maxlength':
                                                validations.push(Validators.maxLength(parseInt(valid.matchCase)))
                                                break;
                                            case 'minlength':
                                                validations.push(Validators.minLength(parseInt(valid.matchCase)))
                                                break;
                                            case 'pattern':
                                                validations.push(Validators.pattern(valid.matchCase))
                                                break;
                                            case 'passwordMatchValidator':
                                                validations.push(passwordMatchValidator(this.childTableForms[field.fieldName].get("password").value()))
                                        }
                                    })                        
                                }
                                if(chx.isMandatory == 'required'){
                                    validations.push(Validators.required)
                                }
                                this.childTableForms[field.fieldName].get(chx.fieldName).setValidators(validations)
                            }
                        });
                    }
                });
            }
            
        }
       // console.log(this.childTableForms);
        if(field.fieldType == 'object'){
            field.childCustomFields.forEach(ch=>{
                let validations = []
                if(ch.fieldValidations.length>0){
                    // console.log(field.fieldValidations)
                    
                    ch.fieldValidations.forEach(valid=>{
                        switch(valid.validationName){
                            case 'maxlength':
                                validations.push(Validators.maxLength(parseInt(valid.matchCase)))
                                break;
                            case 'minlength':
                                validations.push(Validators.minLength(parseInt(valid.matchCase)))
                                break;
                            case 'pattern':
                                validations.push(Validators.pattern(valid.matchCase))
                                break;
                            case 'passwordMatchValidator':
                                validations.push(passwordMatchValidator(this.childObject[field.fieldName].get("password").value()))
                        }
                    })
                }
                if(ch.isMandatory == 'required'){
                    validations.push(Validators.required)
                }
                this.childObject[field.fieldName].get(ch.fieldName).setValidators(validations)
            })
        }
    }
    getEvent(event,fieldName,fieldType,parentField,fieldId){
        let fields: any;
        let value = ""
        let object = {}
        let level = 0
        console.log(fieldName ,fieldType)
        //console.log(event, fieldName, fieldType, parentField, fieldId);
        if(parentField == "" ){
            //console.log("ParentField is Null event"+parentField)
            fields = this.fieldList.filter(x=>x.onChange == fieldId)[0]
            if(fields){
                this.dataForm.get(fields["fieldName"]).setValue(null)
                fields["options"] = []
            }
        }else{
            fields = this.fieldList.filter(x=>x.fieldName == parentField)[0]["childCustomFields"].filter(y=>y.onChange == fieldId)[0]
            if(fields){
                console.log(fields)
                this.childTableForms[parentField].get(fields["fieldName"]).setValue(null)
                fields["options"] = []
            }
            
        }
        if(event != null){
            console.log(fields)
            switch(fieldName){
                case "module":
                    console.log("event with"+fieldName)
                    let fieldTypeIds = []
                    object["moduleId"] = event
                     console.log(object)
                    if(fields && fields.fieldName == "parentFieldId"){
                        
                        object["fieldTypeIds"] = [15,25,26]
                        this.getOptions(fields,value, object, fields["parentFieldId"],level)
                    }else if(fields && fields.fieldName == "showOn"){
                        object["fieldTypeIds"] = []
                        this.getOptions(fields,value, object, fields["parentFieldId"],level)
                    }
                    break;
                case "msmeReg":
                    if(event == "No"){                    
                        this.dataForm.get("msmeRegNo").setValue("");
                        this.dataForm.controls["msmeRegNo"].disable({onlySelf: true});
                        this.dataForm.controls["msmeRegNo"].clearValidators();
                        this.fieldList.filter(x=>x.fieldName=='msmeRegNo')[0]['isMandatory'] = ''
                    }else{
                        this.dataForm.controls["msmeRegNo"].enable()
                        this.dataForm.controls["msmeRegNo"].setValidators(Validators.required);
                        this.fieldList.filter(x=>x.fieldName=='msmeRegNo')[0]['isMandatory'] = 'required'
                        this.fieldList.filter(x=>x.fieldName=='msmeRegNo')[0]['errorMessage'] = 'Please Enter MSME Registraion Number'
                    }
                    break;
                case "isMandatory":
                    console.log("event--"+event);
                    if(event == "Not Required"){                    
                        this.dataForm.get("errorMessage").setValue("");
                        this.dataForm.controls["errorMessage"].disable({onlySelf: true});
                        this.dataForm.controls["errorMessage"].clearValidators();
                        this.fieldList.filter(x=>x.fieldName=='errorMessage')[0]['isMandatory'] = ''
                    }else{
                        this.dataForm.controls["errorMessage"].enable()
                        this.dataForm.controls["errorMessage"].setValidators(Validators.required);
                        this.fieldList.filter(x=>x.fieldName=='errorMessage')[0]['isMandatory'] = 'required'
                        this.fieldList.filter(x=>x.fieldName=='errorMessage')[0]['errorMessage'] = 'Please Enter Error Message'
                    }
                    break;
                case "fieldType":
                    console.log(event)
                    if(event == 3 || event == 4 || event == 16 || event == 21){
                        this.showOnChangeField(fieldId,true)
                    }else{
                        this.showOnChangeField(fieldId,false)
                    }
                    break;
                case "enableWebCam":
                    console.log(event)
                    // if(event){
                        this.showOnChangeField(fieldId,event)
                    // }
                    break;
                case "jobProfileId":
                    this.showSkills(event);
                    break;
                case "createQuestionSet":
                    this.showOnChangeField(fieldId, event);
                    break;
                case "importFromQuestionSet": 
                    this.showOnChangeField(fieldId, event);
                    break;
                case "takeIntroductionVideo": 
                    this.showOnChangeField(fieldId, event);
                    break;
                case 'enableTwoWayAuth':
                    let v = this.dataForm.get('enableTwoWayAuth').value;
                    this.showOnChangeField(fieldId, v);
                    break;
                case 'applicableOn':
                    if (event == 'basicPlusTax' || event == 'taxOnly')
                        this.showOnChangeField(fieldId, true);
                    else
                        this.showOnChangeField(fieldId, false);
                    break;
                case "applyType": 
                   // console.log("changed apply type");
                    if (event == 'walkin')
                        this.showOnChangeField(fieldId, true);
                    else
                        this.showOnChangeField(fieldId, false);
                    break;
                case "password":
                    let validations = []
                    fields = this.fieldList.filter(x=>x.fieldName == 'confimPassword')[0]
                   // console.log(fields)
                    if(fields.fieldValidations.length > 0){
                        fields.fieldValidations.forEach(valid=>{
                            switch(valid.validationName){
                                case 'maxlength':
                                    validations.push(Validators.maxLength(parseInt(valid.matchCase)))
                                    break;
                                case 'minlength':
                                    validations.push(Validators.minLength(parseInt(valid.matchCase)))
                                    break;
                                case 'pattern':
                                    validations.push(Validators.pattern(valid.matchCase))
                                    break;
                                case 'passwordMatchValidator':
                                    validations.push(passwordMatchValidator(event))
                            }
                        })
                    }
                    if(fields.isMandatory == 'required'){
                        validations.push(Validators.required)
                    }
                    this.dataForm.get(fields.fieldName).reset()
                    this.dataForm.get(fields.fieldName).clearValidators()
                    this.dataForm.get(fields.fieldName).setValidators(validations)
                    break;
                case "indexing":
                    console.log(event+" -- indexing")
                    if(event == 'true'){
                        console.log(event)
                        this.showOnChangeField(fieldId,true)
                    }else{
                        this.showOnChangeField(fieldId,false)
                    }
                    break;
                case "isSameTOPermanent":
                    this.showOnChangeField(fieldId, !event);
                    break;
                case "jobPostingId":
                    console.log(event +" ---jobpostingId" + "modeuleId")
                    let moduleId = this.fieldList.filter(x=>x.fieldName == fieldName)[0].srcModule
                    let tableField = this.fieldList.filter(x=>x.srcModule == moduleId && x.fieldType == 'table')[0]
                    console.log(tableField)
                    console.log(moduleId)
                    console.log(this.f)
                    
                    if(event != "" ){
                        this.childTableForms[tableField.fieldName] = this.f[tableField.fieldName] as FormArray
                        console.log(this.childTableForms)
                        this.childTableForms[tableField.fieldName].reset();
                        environment.api_url = environment.login_url+"/jobPosting";
                        this.appService.getById(event,moduleId,2).subscribe(posting=>{
                        console.log(posting)
                            this.applyMandatorySkills = posting['applyMandatorySkills']
                            this.applyMandatorySkills.forEach(skills => {
                                this.childTableForms[tableField.fieldName].push(this.formBuilder.group({
                                    id: [],
                                    mandatorySkillId: [skills.skillId],
                                    haveSkill: [false],
                                    experience: [''],
                                    experienceUnit: ['MONTH'],
                                    comment: ['']
                                    }))
                            });
                            this.childTableForms[tableField.fieldName].controls.forEach(ft => {
                                ft.controls['experience'].disable()
                                ft.controls['experienceUnit'].disable()
                            });
                            this.formArray = true
                            console.log(this.childTableForms[tableField.fieldName])
                            console.log("layout service")
                            
                        });
                    }else {
                        console.log("Without jobPosting")
                        this.childTableForms[tableField.fieldName].reset()
                        //this.childTableForms[tableField.fieldName] = this.f[tableField.fieldName] as FormArray
                    }  
                        
                    break;
                case "questionSetId":
                       console.log(fields)
                       this.childFieldData["questions"]=[]
                        environment.api_url = environment.login_url+"/module";
                        this.appService.getById(fields.srcModule,120,2).subscribe(module=>{
                            environment.api_url = environment.login_url+"/"+module["apiPath"];
                            this.appService.getById(event,fields.srcModule,2).subscribe(res=>{
                                console.log(res)
                                console.log(this.appService.getNewObject(this.childTableForms["questions"].value))
                                res["setQuestions"].forEach(que => {
                                    let childObject = {}
                                    childObject["questionId"] = que.questionId
                                    childObject["thinkTime"] = que.thinkTime
                                    childObject["questionIdtitle"] = que.question.question
                                    childObject["thinkTimetitle"] = que.thinkTime
                                    childObject["timeout"] = que.timeout
                                    childObject["timeouttitle"] = que.timeout
                                    childObject["attemptstitle"] = que.attempts
                                    childObject["attempts"] = que.attempts
                                    this.childFieldData["questions"].push(childObject)
                                });
                            })
                        })
                    
                        break;
                case "mode":
                    console.log(fields);
                    let list = JSON.parse(this.params.headerObject)
                    if(event == "offline"){
                        fields["options"] = list.filter(x=>x.fieldName == parentField)[0]["childCustomFields"].filter(x=>x.id == fields.id)[0]["options"].filter(y=>y.id == 244 || y.id == 245)
                    }else if(event == "online"){
                        fields["options"] = list.filter(x=>x.fieldName == parentField)[0]["childCustomFields"].filter(x=>x.id == fields.id)[0]["options"].filter(y=>y.id == 243 || y.id == 242)
                    }
                    break;
                case "sheetName":
                    console.log(event)
                    console.log(this.excelData)
                    let option: any[] =[]
                    let i =0;
                    this.excelData.filter(x=>x.sheetName == event)[0]["data"][0]["DATA"].forEach(e => {
                        option.push({value: i+"_"+e, title: e,default: 0})
                        i++;
                    });
                    
                    this.fieldList.filter(x=>x.fieldName == 'excelTemplateLines')[0]["childCustomFields"].filter(x=>x.fieldName=="columnNumber")[0]["options"]= option
                    
                    break;
                default:
                    if(fieldType == "table") {
                        level = 1
                    }
                    // object[fieldName] = 
                    console.log(fields)
                    if(fieldName == "moduleId" && event != "" && fields != undefined){
                        fields["srcModule"] = event
                    }
                    if(fieldName == "moduleId" && event != ""){
                        this.showOnChangeField(fieldId,true)
                        let exceltemplate = this.fieldList.filter(x=>x.fieldName == 'excelTemplateLines')
                        if(exceltemplate.length > 0){
                            let obj = {}
                            obj["moduleId"] = event
                            let cField = exceltemplate[0]["childCustomFields"].filter(x=>x.fieldName=="customFieldId")[0]
                            this.getOptions(cField,value,obj,cField["parentFieldId"],1)
                        }
                    }
                    if((event == "198" || event == "189") && fieldName == "hiringTypeId"){
                        fields["srcModule"] = event
                    }else if(fieldName == "hiringTypeId"){
                        fields["srcModule"] = null
                    }
                     console.log(object)
                    if(fields && fields["srcModule"] != null){
                        this.getOptions(fields,value, object, fields["parentFieldId"],level)
                    }
                    break;
            }
        }
        
    }
    
   
    getEvents(event, fieldName,index, fieldType, parentField, fieldId){
        console.log(parentField)
        let fields: any;
        let value = ""
        let object = {}
        let level = 1
        if(event != null){
            switch (fieldName){
                case "haveSkill":
                    console.log("haveskill")
                    if (event) {
                        
                        this.childTableForms[parentField].controls.forEach((ft,key) => {
                            console.log(key+"--"+index+"--"+event)
                            if(key == index){
                                ft.controls['experience'].enable();
                                ft.controls['experience'].setValidators([Validators.required]);
                                ft.controls['experienceUnit'].enable();
                                ft.controls['experienceUnit'].setValidators([Validators.required]);
                            }
                        });
                    } else {
                        this.childTableForms[parentField].controls.forEach((ft,key) => {                            
                            console.log(key+"--"+index+"--"+event)
                            if(key == index){                                
                                ft.controls['experience'].disable();
                                ft.controls['experience'].clearValidators();
                                ft.controls['experienceUnit'].disable();
                                ft.controls['experienceUnit'].clearValidators();
                            }
                        });
                    }
                    break;
            }
        }
    }
    showSkills(event: any) {
         environment.api_url = environment.login_url+"/"+this.params.apiPath;
        this.appService.getSkillsDetails(event).subscribe((res: any) => {
            this.skills = res.data;
        });
    }
    
    showOnChangeField(event,value: boolean){
        console.log(this.hide)
        this.fieldList.filter(x=>x.showOn == event).forEach(field=>{
            console.log("Type Selected ="+ event+"=="+value)
            field.defaultShow = value
        })
        console.log(this.fieldList)
    }
    

    onCustomAction(event){
        console.log(event)
        if(event != ""){
            switch(event.buttonName){
                case 'Back':
                    this.OnCancel();
                    break;
                default:
                    this.OnSave(event);
                    break;
            }
        }
    }

    OnCancel(){
        // console.log(this.params.moduleUrl+"=="+ this.moduleId)
        this.submitted = false
        this.router.navigate([this.params.moduleUrl,this.params], {  relativeTo: this.route.parent, skipLocationChange: true });
    }
    OnSave(event){

        this.submitted = true
        if(this.dataForm.invalid && event != 'serialize'){
            return
        }
        console.log(this.dataForm.value)
        const formData = this.appService.getNewObject(this.dataForm.value)
        console.log(formData)
        environment.api_url = environment.login_url+"/"+this.params.apiPath;
        //formData.status = event.statusDetailsId
        // let customData = []
        let customDatas = []
        if(this.formData['customFieldDatas']){
            customDatas = this.formData['customFieldDatas']
        }
        
        this.fieldList.filter(x=>x.entryType== 'UDF').forEach(field=>{
            if(customDatas.filter(x=>x.customFieldId == field.id).length > 0){
                customDatas.filter(x=>x.customFieldId == field.id)[0]["fieldData"] = formData[field.fieldName]
            }else{
                if(formData[field.fieldName] != ""){
                    let custom = {};
                    custom["id"] = null
                    custom["fieldData"] = formData[field.fieldName]
                    custom["customFieldId"] = field.id
                    customDatas.push(custom)
                }
            }
        })
        formData["customFieldDatas"] = customDatas;
        this.fieldList.filter(x=>x.fieldType== 'table' && x.srcModule == null).forEach(field=>{
            if(field.fieldName != 'permissions' && field.srcModule == null){
                formData[field.fieldName] = this.childFieldData[field.fieldName]
            }else{
                formData[field.fieldName] = []
                console.log(this.childFieldData[field.fieldName])
                this.childFieldData[field.fieldName].forEach(module => {
                    module.permissiontitle.forEach(permit => {
                        formData[field.fieldName].push(permit);
                    });
                });
            }
            
        })
        this.fieldList.filter(x=>x.fieldType== 'object').forEach(field=>{
            let childData : any
            let fieldCount : number = 0
            childData = this.appService.getNewObject(this.childObject[field.fieldName].value)
            console.log(childData)
            field.childCustomFields.forEach(object=>{
                if(childData[object.fieldName] == "" || childData[object.fieldName] == null){
                    fieldCount++;
                }
            })
            console.log(fieldCount);
            if(fieldCount != field.childCustomFields.length){
                formData[field.fieldName] = childData
            }            
        })
        console.log(formData)
        if(this.mainFiles.length > 0){
            this.formData["mainFiles"] = this.mainFiles
        }
        if(this.link != ""){
            //formData["introVideoFilename"] = this.link
            this.dataForm.get('introVideoFilename').setValue(this.link);
        }
        if(event == 'serialize'){
            this.appService.serilaizeData(formData,this.params.moduleId).subscribe(data=>{
                console.log(data)
                // console.log(this.params.moduleUrl, this.moduleId)
                // this.params.moduleUrl += '/'
                // this.router.navigate([this.params.moduleUrl+"/",this.params], {  relativeTo: this.route.parent, skipLocationChange: true });
            },error=>{
                this.alertService.typeError(error["message"], error["status"]+"- "+error["error"])
            })
        }else{
            this.appService.addData(formData,this.params.moduleId).subscribe(data=>{
                console.log(data)
                // console.log(this.params.moduleUrl, this.moduleId)
                // this.params.moduleUrl += '/'
                this.alertService.typeSuccess(data["message"],"Registration Successfull")
                this.router.navigate([this.params.moduleUrl,this.params], {  relativeTo: this.route.parent, skipLocationChange: true });
            },error=>{
                this.alertService.typeError(error["message"], error["status"]+"- "+error["error"])
            })
        }
    }

    childCancel(fieldName){
        this.childTableForms[fieldName+"edit"] = false;
        this.childTableForms[fieldName+"editIndex"] = null;
        this.childTableForms[fieldName+"submitted"] = false
        this.fieldList.forEach(field=>{
            if(field.fieldName == fieldName){
                field.childCustomFields.forEach(child=>{
                    this.childTableForms[fieldName].get(child.fieldName).reset()
                    switch(child.fieldName){
                        case 'countryId':
                            this.childTableForms[fieldName].get(child.fieldName).setValue(null)
                        break;
                        case 'stateId':
                            child.options = []
                            this.childTableForms[fieldName].get(child.fieldName).setValue(null)
                        break;
                        case 'cityId':
                            child.options = []
                            this.childTableForms[fieldName].get(child.fieldName).setValue(null)
                        break;
                        default:
                            this.childTableForms[fieldName].get(child.fieldName).setValue("")
                    }
                })
            }
        })
    }

    childSave(fieldName){
        this.childTableForms[fieldName+"submitted"] = true;
        if(this.childTableForms[fieldName].invalid){
            return false
        }
        let fields = this.fieldList.filter(x=>x.fieldName == fieldName)[0]
        let childObject = {}
        childObject = this.appService.getNewObject(this.childTableForms[fieldName].value)
        console.log(this.childObject)
        fields.childCustomFields.forEach(ch=>{
            console.log(ch)
            switch(ch.fieldType){
                case 'select':
                    childObject[ch.fieldName+'title'] = ch.options.filter(x=>x.value == childObject[ch.fieldName])[0]['title']
                    break;
                case 'autoCompleter':
                    childObject[ch.fieldName+'title'] = ch.options.filter(x=>x.value == childObject[ch.fieldName])[0]['title']
                    break;
                default:
                    childObject[ch.fieldName+'title'] = childObject[ch.fieldName]
                    break;
                
            }
        })
        if(this.documents.length > 0){
            childObject['files'] = this.documents;
            this.documents = []
            this.resetFileUploader();
        }
        //console.log(this.childFieldData[fieldName][this.childTableForms[fieldName+"editIndex"]])
        console.log(childObject)
        if(this.childTableForms[fieldName+"edit"]){
            this.fieldList.forEach(field => {
                if(field.fieldName == fieldName){
                    field.childCustomFields.forEach(ch => {
                        // console.log(childObject)
                        if(ch.fieldType != 'spanText'){
                            this.childFieldData[fieldName][this.childTableForms[fieldName+"editIndex"]][ch.fieldName] = childObject[ch.fieldName]
                            this.childFieldData[fieldName][this.childTableForms[fieldName+"editIndex"]][ch.fieldName+'title'] = childObject[ch.fieldName+'title']
                        }
                    });
                }
            });
            console.log(this.childFieldData[fieldName][this.childTableForms[fieldName+"editIndex"]])
           //this.childFieldData[fieldName][this.childTableForms[fieldName+"editIndex"]] = childObject
            this.childTableForms[fieldName+"edit"] = false
            this.childTableForms[fieldName+"editIndex"] = null
        }else{
            this.childFieldData[fieldName].push(childObject)
        }
        
        this.childTableForms[fieldName].reset()
        this.childTableForms[fieldName+"submitted"] = false;
        console.log(this.childFieldData)
        this.fieldList.forEach(field=>{
            if(field.fieldName == fieldName){                
                let ch = {}
                field.childCustomFields.forEach(child=>{
                    if(child.fieldType != 'multipleCheck' && child.fieldType != 'spanText' && child.fieldType != 'file'){
                        this.childTableForms[fieldName].get(child.fieldName).reset()
                        switch(child.fieldName){
                            case 'countryId':
                                this.childTableForms[fieldName].get(child.fieldName).setValue(null)
                                break;
                            case 'stateId':
                                child.options = []
                                this.childTableForms[fieldName].get(child.fieldName).setValue(null)
                                break;
                            case 'cityId':
                                child.options = []
                                this.childTableForms[fieldName].get(child.fieldName).setValue(null)
                                break;
                            default:
                                this.childTableForms[fieldName].get(child.fieldName).setValue("")
                        }
                    } else if(fieldName == 'permissions' && child.fieldType == 'multipleCheck'){
                        ch[child.fieldName] = new FormArray([])
                    } 
                })
                if(fieldName == "permissions"){
                    ch["id"] = new FormControl("")
                    this.childTableForms[fieldName] = new FormGroup(ch);
                }
                
                console.log(this.childTableForms[fieldName])
            }
        })
    }

    resetFileUploader() { 
        this.fileUploader.nativeElement.value = null;
    }

    ngAfterViewInit(){
        
    }

    childDelete(fieldName,index){
       // console.log(fieldName+"--"+index)
       //console.log(fieldName+"--"+index+"--delete")
        if(this.childFieldData[fieldName][index]["id"] == null || this.childFieldData[fieldName][index]["id"] == 0 ){
            this.childFieldData[fieldName].splice(index,1);
        }else{
            this.childFieldData[fieldName][index]["status"] = '14';
            
        }
    }

    childEdit(fieldName,index){
        console.log(this.childTableForms[fieldName])
        this.fieldList.forEach(field => {
            if(field.fieldName == fieldName){
                field.childCustomFields.forEach(ch => {
                    if(ch.fieldType != 'multipleCheck' && ch.fieldType != 'spanText'){
                        //console.log(this.childFieldData[fieldName][index][ch.fieldName])
                        this.childTableForms[fieldName].get(ch.fieldName).setValue(this.childFieldData[fieldName][index][ch.fieldName])
                    }else{
                        console.log(ch.fieldName)
                        switch(ch.fieldName){
                            case 'permission':
                                let permissions = this.childFieldData[fieldName][index];
                                console.log(permissions)
                                
                                permissions[ch.fieldName+'title'].forEach(actions => {
                                    this.childTableForms[fieldName].get(ch.fieldName).push(
                                        this.formBuilder.group({
                                            id: [actions.id],
                                            action: [actions.action],
                                            moduleActionId: [actions.moduleActionId],
                                            permission: [actions.permission],
                                            roleId: [actions.roleId]
                                        })
                                    )    
                                });
                                console.log(this.childTableForms[field.fieldName].get(ch.fieldName));
                                break;
                        }
                        
                    }
                    
                });
            }
        });
        
        this.childTableForms[fieldName+"edit"] = true
        this.childTableForms[fieldName+"editIndex"] = index
        // this.childTableForms[fieldName].setValue(this.childFieldData[fieldName][index]);
        //console.log(fieldName+"--"+index+"--edit")
    }
    setLink(event){
        //console.log(event)
        this.link = event
    }

    getDataValue(data,fieldname){
       // console.log(data + ""+fieldname)
        if(data && fieldname){
            let fields = fieldname.split(".")
            let value =data
            fields.forEach(f => {
                value = value[f]
                console.log(value)
            });
            // console.log(fields)
            return value
        }
        
    }
   
}