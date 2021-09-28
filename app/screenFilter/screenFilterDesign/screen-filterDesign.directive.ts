import { Directive, ElementRef, Input, Output, EventEmitter, AfterViewInit, ViewContainerRef, TemplateRef } from "@angular/core";


import { filter } from "rxjs/operators";
import { colObject } from 'app/shared/data/data.object';

@Directive({
    selector : '[customFilterDesign]'
})

export class ScreenFilterDirective {
    
    constructor(private eleRef: ElementRef) {
        this.setup();
    }
   
 

    setup(){
       
    }
}

@Directive({
    selector: '[ngVar]',
})
export class ScreenVarDirectives {
  @Input()
  set ngVar(context: any) {
    this.context.$implicit = this.context.ngVar = context;
    this.updateView();
  }

  context: any = {};

  constructor(private vcRef: ViewContainerRef, private templateRef: TemplateRef<any>) {}

  updateView() {
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
}
