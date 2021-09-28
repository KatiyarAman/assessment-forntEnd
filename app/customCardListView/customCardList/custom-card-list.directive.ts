import { Directive, ElementRef, Input, Output, EventEmitter, AfterViewInit } from "@angular/core";


import { filter } from "rxjs/operators";
import { colObject } from 'app/shared/data/data.object';

@Directive({
    selector : '[tableColHead]'
})

export class CustomDataTableDirective {
    
    constructor(private eleRef: ElementRef) {
        this.setup();
    }
    @Input('[width]') width?: number
    @Input('[sortable]') sortable: boolean
    @Input('[dataFieldName]') dataFieldName: string
    @Output() event = new EventEmitter()

    setup(){
        // console.log(this.sortable +"=="+this.dataFieldName +"=="+this.width)
        // const parent = this.eleRef.nativeElement;
        this.eleRef.nativeElement.style.width = this.width+"px";
        // console.log(this.eleRef.nativeElement.style.width)
        const el :HTMLElement = this.eleRef.nativeElement;
        const $dataFieldName = this.dataFieldName;
        el.addEventListener('click',(eventx)=>{
            // console.log(this.sortable)
            if(this.sortable){
                this.event.emit($dataFieldName)
            }
        })
        
    }
}

@Directive({
    selector : '[customDataTable]'
})

export class CustomTableProperty {
    
    constructor(private eleRef: ElementRef) {
        this.setup();
    }
    @Input('[width]') width?: number
    
 

    setup(){
        const parent = this.eleRef.nativeElement;
        this.eleRef.nativeElement.style.width = this.width+"px";
    }
}

@Directive({
    selector : '[customAction]'
})

export class CustomActions implements AfterViewInit {

    constructor(private eleRef: ElementRef) {
        
    }
    @Output() event = new EventEmitter()
    ngAfterViewInit(){
        this.setup();
    }
    object = {}
    setup(){
        const el :HTMLElement = this.eleRef.nativeElement;
        // console.log(el)

        const $action = el.getAttribute("action")
        if($action != "add"){
            const $id = el.getAttribute("data-id")
            
            const $status = el.getAttribute("status")
            const $subType = el.getAttribute("subscriptionType")
            const $trialPeriod = el.getAttribute("trialPeriod")
            // console.log($id+"=="+$acti on)
            this.object = {id: $id,action: $action,status : $status, subscriptionType: $subType, trialPeriod: $trialPeriod}
        }else{
            this.object = {action: $action}
        }
        // const Object = {data: id, action: this.clickEvent["name"]}
        el.addEventListener('click',(eventx)=>{
            this.event.emit(this.object)
        })
        
    }

}