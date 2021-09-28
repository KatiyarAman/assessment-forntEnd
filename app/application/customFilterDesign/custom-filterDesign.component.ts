import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { customFieldData, customFields } from 'app/shared/data/data.object';
import { environment } from 'environments/environment';
import { ReactiveFormsModule, NG_VALIDATORS, FormsModule, FormControl, FormGroup, Validators, NgForm, ValidatorFn, Validator, FormBuilder, FormArray} from '@angular/forms';
import { AppService } from 'app/shared/services/app.service';
import { AlertService } from 'app/shared/services/alerts.service';
import { passwordMatchValidator } from 'app/shared/services/customValidator.services';
@Component({
    providers: [AlertService],
    selector: 'app-customFilter',
    templateUrl: 'custom-filterDesign.component.html',
    styleUrls: ['custom-filterDesign.component.scss']
})

export class CustomFilterDesign implements OnInit, AfterViewInit{
    dataForm: FormGroup
    @Input() moduleId : number
    @Input() moduleAction : any
    //   @Input() moduleUrl : any
    @Input() params: any
    @Input() filterData: any
    @Output() getAction = new EventEmitter()
    fieldList: customFields[] = [];
    formType ="verticle"
    formColumn = 3
    formObject : any
    rowCount: number
    colCount: number = 0
    submitted = false
    //   title = ""
    action = ""
    formData: any
    fieldDisplay = false
    childTableForms: any = {}
    childObject: any = {}
    childObjectData: any = {}
    childFieldData: any = {}
    actionList = []
    buttons = []
    icons = []
    lineIcons = []

    constructor(private appService: AppService, private formBuilder : FormBuilder, private router: Router, private route: ActivatedRoute, private alertService: AlertService, private translae: TranslateService){
    }
    ngOnInit(){
        // console.log(this.params.fields)
        // this.title = this.params.moduleName
        
        console.log(this.params)
        this.actionList = JSON.parse(this.params.buttons)
        console.log(this.actionList)
        this.actionList[this.params.action].buttonList.forEach(btn => {
            console.log(btn)
            if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "btn"){
                let act = {}
                act["name"] = btn["button"]["buttonName"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                //console.log(this.actionList.filter(x=>x.moduleId == this.params.moduleId))
                this.buttons.push(act)
            }
            if(btn["button"]["purpose"] == 'form' && btn["button"]["type"] == "icon"){
                let act = {}
                act["name"] = btn["button"]["buttonName"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                this.icons.push(act)
            }            
            if(btn["button"]["purpose"] == 'lineItems' && btn["button"]["type"] == "icon"){
                let act = {}
                act["name"] = btn["button"]["buttonName"]
                act["title"] = btn["button"]["buttonName"]
                act["icon"] = btn["button"]["icon"]
                act["actionClass"] = btn["button"]["buttonClass"]
                act["type"] = btn["button"]["type"]
                this.lineIcons.push(act)
            }
        });
        console.log(this.buttons)
        switch(this.params.action){
            case 'view':
                this.fieldList = JSON.parse(this.params.fields)
                this.getCustomFields();
                break;
            case 'add' :
                // console.log(this.params.fields)
                this.fieldList = []
                // console.log(this.fieldList)
                this.fieldList = JSON.parse(this.params.fields)
                this.getCustomFields();
                break;
            case 'edit':
                this.fieldList = JSON.parse(this.params.fields)
                // this.formData = JSON.parse(this.params.formData)
                // console.log(this.formData)
                this.getCustomFields();
                break;
            case 'search' :
                // console.log(this.params.fields)
                this.fieldList = []
                // console.log(this.fieldList)
                this.fieldList = this.params.fields
                this.getCustomFields();
                break;
        }
        
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
        // console.log(this.fieldList)
        this.fieldList.forEach(field=>{
            this.hide[field.fieldName] = true
            if(field.fieldType != 'section' && field.fieldType != 'table' && field.fieldType != 'object'){
                let value: any;
                value = field.dataSource
                if(field.fieldType == 'select' || field.fieldType == 'autoCompleter' || field.fieldType == 'radio'){
                    if(field.srcModule!= null){
                        field.fieldType == 'autoCompleter' ? value = null : value = ''
                        let object = {}
                        switch(field.fieldName){
                            case 'type':
                                object['moduleId'] = parseInt(this.params.moduleId)
                                break;
                            case 'employeeId':
                                object['isERPUser'] = true
                                break;
                        }
                        
                        if(field.onChange == null){
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
                    console.log(this.action)
                    if(child.fieldType == 'select' || child.fieldType == 'autoCompleter' || child.fieldType == 'radio'){
                        if(child.srcModule!= null){
                            child.fieldType == 'autoCompleter' ? value = null : value = ""
                            if(field.onChange == null){
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
                if(field.childCustomFields.length > 0){
                    let child = {}
                    let tableWidth = 0
                    console.log(field.childCustomFields)
                    this.childFieldData[field.fieldName] = []
                    field.childCustomFields.forEach(ch=>{
                        let value: any
                        value = ch.dataSource
                        // console.log(ch.fieldName)
                        if(ch.fieldIndexing != null && ch.defaultShow){
                            tableWidth += ch.fieldIndexing["fieldWidth"]
                        }
                        
                        if(ch.fieldType == 'select' || ch.fieldType == 'autoCompleter'|| ch.fieldType == 'radio'){
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
                        if(ch.fieldType != 'spanText' && ch.fieldType != 'multipleCheck'){
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
                            if(chx.fieldType == 'select' || chx.fieldType == 'autoCompleter'|| chx.fieldType == 'radio'){
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
        // this.getValidation(this.fieldList);
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
        this.setDataValues()
       
        setTimeout(() => {
            this.fieldDisplay = true;
        }, 5000)        
    }

    getOptions(fields,value, object, parentFieldId,level){
        // console.log(object)
        // console.log(fields)
        environment.api_url = environment.login_url+"/module";
        this.appService.getById(fields.srcModule,120,15).subscribe(module=>{
            // console.log(module)
            environment.api_url = environment.login_url+"/"+module["apiPath"];
            this.appService.getAllActive(fields.srcModule, object).subscribe(data=>{
                // console.log(data)
                let source = data["data"]
                let options = []
                source.forEach(src => {
                    options.push({value: src["id"], title:src["name"], default: value == src["id"] ? 1 : 0})
                });
                console.log(options)
                if(level == 0){
                    this.fieldList.filter(x=>x.id == fields.id)[0]["options"] = options
                }else if(level == 1){
                    console.log(parentFieldId)
                    this.fieldList.filter(x=>x.id == parentFieldId)[0]["childCustomFields"].filter(y=>y.id == fields.id)[0]["options"] = options
                }else{
                    this.fieldList.filter(x=>x.id == parentFieldId)[0]["childCustomFields"].filter(y=>y.id == fields.id)[0]["childCustomFields"].filter(z=>z.id == fields.id)[0]["options"] = options
                }
                
            },error=>{
                console.log(error)
            })
        })
        // }
    }

    setDataValues(){
        this.formData = this.filterData
        this.fieldList.forEach(fields=>{
            
            if(fields.fieldType != 'table' && fields.fieldType != 'object' && fields.fieldType != 'Section' && fields.fieldType != 'multipleCheck' && fields.entryType != 'UDF'){
                // console.log(fields.fieldName+" = "+this.formData[fields.fieldName])
                if(fields.fieldName == 'cityId'){
                    environment.api_url = environment.login_url+"/city";
                    this.appService.getById(this.formData[fields.fieldName],fields.srcModule,16).subscribe(data=>{
                        console.log(data);
                        this.dataForm.get("countryId").setValue(data["state"]["country"]["id"])
                        this.dataForm.get("stateId").setValue(data["state"]["id"])
                        this.dataForm.get("cityId").setValue(this.formData[fields.fieldName])
                    })
                }else{
                    this.dataForm.get(fields.fieldName).setValue(this.formData[fields.fieldName])
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
                        console.log(fields.fieldName)
                        this.formData[fields.fieldName].forEach(childData => {
                            // console.log(childData["id"])
                            fields.childCustomFields.forEach(ch => {
                                if(ch.fieldType == 'select' || ch.fieldType == 'autoCompleter'){
                                    switch(ch.fieldName){
                                        case 'cityId':
                                            environment.api_url = environment.login_url+"/city";
                                            this.appService.getById(childData[ch.fieldName],ch.srcModule,18).subscribe(data=>{
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
                                            console.log(ch.options);
                                            console.log(childData[ch.fieldName] +"=="+ch.fieldType);
                                            console.log(ch.options.filter(x=>x.value==(childData[ch.fieldName]+"")));
                                            if(ch.options.length > 0){
                                                childData[ch.fieldName+'title'] = ch.options.filter(x=>x.value==(childData[ch.fieldName]+""))[0]['title']
                                            }
                                            
                                    }
        
                                }else {
                                    console.log(ch.fieldName +"=="+childData[ch.fieldName])
                                    childData[ch.fieldName+'title'] = childData[ch.fieldName]
                                }
                            });
                            console.log(childData)
                            this.childFieldData[fields.fieldName].push(childData)
                        });
                        break;
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
                console.log(this.formData.customFieldDatas.filter(x=>x.customFieldId == fields.id)[0])
                let value = ''
                value = this.formData.customFieldDatas.filter(x=>x.customFieldId == fields.id)[0]["fieldData"]
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

   

    getEvent(event,fieldName,fieldType,parentField,fieldId){
        let fields: any;
        let value = ""
        let object = {}
        let level = 0
        if(parentField == "" ){
            fields = this.fieldList.filter(x=>x.onChange == fieldId)[0]
            if(fields){
                this.dataForm.get(fields["fieldName"]).setValue(null)
                fields["options"] = []
            }
        }else{
            fields = this.fieldList.filter(x=>x.fieldName == parentField)[0]["childCustomFields"].filter(y=>y.onChange == fieldId)[0]
            if(fields){
                this.childTableForms[parentField].get(fields["fieldName"]).setValue(null)
                fields["options"] = []
            }
            
        }
        
        if(event != null){
            
            
            // console.log(fields)
            
            switch(fieldName){
                case "module":
                    let fieldTypeIds = []
                    object["moduleId"] = event
                    // console.log(object)
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
                    if(event == 3 || event == 4 || event == 16 || event == 21){
                        this.showOnChangeField(fieldId,true)
                    }else{
                        this.showOnChangeField(fieldId,false)
                    }
                    break;
                case "password":
                    let validations = []
                    fields = this.fieldList.filter(x=>x.fieldName == 'confimPassword')[0]
                    console.log(fields)
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
                    if(event == 'true' || event){
                        this.showOnChangeField(fieldId,true)
                    }else{
                        this.showOnChangeField(fieldId,false)
                    }
                    break;
                default:
                    if(fieldType == "table"){
                        level = 1
                    }
                    object[fieldName] = event
                    // console.log(object)
                    if(fields){
                        this.getOptions(fields,value, object, fields["parentFieldId"],level)
                    }
                    break;
            }
        }
        
    }

    showOnChangeField(event,value: boolean){
        console.log(this.hide)
        this.fieldList.filter(x=>x.showOn == event).forEach(field=>{
            console.log("Type Selected ="+ event+"=="+value)
            field.defaultShow = value
        })
        // this.fieldList.forEach(field=>{
        //     if(field.showOn == event){
        //         console.log("Type Selected ="+ event)
        //         field.defaultShow = value
        //         // this.hide[field.fieldName] = !value
        //     }
        // })
        console.log(this.fieldList)
    }
    

    onCustomAction(event){
        console.log(event)
        if(event != ""){
            switch(event){
                case 'Clear':
                    this.OnCancel();
                    break;
                case 'Apply':
                    this.OnSave();
                    break;
            }
        }
    }

    OnCancel(){
        // console.log(this.params.moduleUrl+"=="+ this.moduleId)
        this.submitted = false
        this.dataForm.reset()
        const formData = this.appService.getNewObject(this.dataForm.value)
        let event = {}
        event["formData"] = formData
        this.getAction.emit(event)
        // this.router.navigate([this.params.moduleUrl,this.params], {  relativeTo: this.route.parent, skipLocationChange: true });
    }
    OnSave(){

        // this.submitted = true
        console.log(this.appService.getNewObject(this.dataForm.value))
        // if(this.dataForm.invalid){
        //     return
        // }
        const formData = this.appService.getNewObject(this.dataForm.value)
        environment.api_url = environment.login_url+"/"+this.params.apiPath;
        switch(this.moduleAction){
            case 'search':
                console.log(formData)
                let customData = []
                console.log(formData);
                this.fieldList.filter(x=>x.fieldType== 'table').forEach(field=>{
                    if(field.fieldName != 'permissions'){
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
                this.fieldList.filter(x=>x.entryType== 'UDF').forEach(field=>{
                    let custom = {};
                    custom["id"] = null
                    custom["fieldData"] = formData[field.fieldName]
                    custom["customFieldId"] = field.id
                    customData.push(custom)
                })
                formData["customFieldDatas"] = customData;
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
                console.log(formData);
                let event = {}
                event["formData"] = formData
                this.getAction.emit(event)
                // this.appService.addData(formData,this.params.moduleId).subscribe(data=>{
                //     console.log(data)
                //     console.log(this.params.moduleUrl, this.moduleId)
                //     // this.params.moduleUrl += '/'
                //     this.router.navigate([this.params.moduleUrl+"/",this.params], {  relativeTo: this.route.parent, skipLocationChange: true });
                // },error=>{
                //     this.alertService.typeError(error["message"], error["status"]+"- "+error["error"])
                // })
                //this.router.navigate([this.moduleUrl,this.moduleId], {  relativeTo: this.route.parent, skipLocationChange: true });
                break;

            case 'edit':
                console.log(formData)
                // formData["cityId"] = 1
                // formData["billingCycle"] = 'M'
                // formData["payableamount"] = 0.00
                console.log(formData);
                this.fieldList.filter(x=>x.fieldType== 'table').forEach(field=>{
                    if(field.fieldName != 'permissions'){
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
                // let customData = []
                this.fieldList.filter(x=>x.entryType== 'UDF').forEach(field=>{
                    this.formData['customFieldDatas'].filter(x=>x.customFieldId == field.id)[0]["fieldData"] = formData[field.fieldName]
                })
                formData["customFieldDatas"] = this.formData['customFieldDatas'];
                console.log(formData);
                this.appService.addData(formData,this.params.moduleId).subscribe(data=>{
                    console.log(data)
                    console.log(this.params.moduleUrl, this.moduleId)
                    // this.params.moduleUrl += '/'
                    this.router.navigate([this.params.moduleUrl+"/",this.params], {  relativeTo: this.route.parent, skipLocationChange: true });
                },error=>{
                    this.alertService.typeError(error["message"], error["status"]+"- "+error["error"])
                })
                //this.router.navigate([this.moduleUrl,this.moduleId], {  relativeTo: this.route.parent, skipLocationChange: true });
                break;
            
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
        
        console.log(this.childFieldData[fieldName][this.childTableForms[fieldName+"editIndex"]])
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
            // this.childFieldData[fieldName][this.childTableForms[fieldName+"editIndex"]] = childObject
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
                    if(child.fieldType != 'multipleCheck' && child.fieldType != 'spanText'){
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
                    }else if(fieldName == 'permissions' && child.fieldType == 'multipleCheck'){
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

    ngAfterViewInit(){
    }

    childDelete(fieldName,index){
        console.log(fieldName+"--"+index)
        console.log(fieldName+"--"+index+"--delete")
        if(this.childFieldData[fieldName][index]["id"] == null || this.childFieldData[fieldName][index]["id"] == 0 ){
            this.childFieldData[fieldName].splice(index,1);
        }else{
            this.childFieldData[fieldName][index]["status"] = 'Inactive';
        }
    }

    childEdit(fieldName,index){
        console.log(this.childTableForms[fieldName])
        this.fieldList.forEach(field => {
            if(field.fieldName == fieldName){
                field.childCustomFields.forEach(ch => {
                    if(ch.fieldType != 'multipleCheck' && ch.fieldType != 'spanText'){
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
        console.log(fieldName+"--"+index+"--edit")
    }
}