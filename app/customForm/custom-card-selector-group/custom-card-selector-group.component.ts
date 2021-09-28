import { Component, OnInit, Input, forwardRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { CustomCardSelectorComponent } from '../custom-card-selector/custom-card-selector.component';

@Component({
    selector: 'app-custom-card-selector-group',
    templateUrl: './custom-card-selector-group.component.html',
    styleUrls: ['./custom-card-selector-group.component.scss'] ,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CustomCardSelectorGroupComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: CustomCardSelectorGroupComponent,
            multi: true
        }
    ]   
})
export class CustomCardSelectorGroupComponent implements OnInit, Validator, ControlValueAccessor, AfterViewInit {
    
    validate(control: AbstractControl): ValidationErrors {
        console.log(control);
        if (!control.value) {
            return {"required": "Field is required"};
        }
        return null;
    }
    value: string;
    onChange: any = () => {}
    onTouch: any = () => {}
    disalbed: boolean;
    
    @ViewChildren(CustomCardSelectorComponent) optionCards: QueryList<CustomCardSelectorComponent>;

    @Input()
    options: any;

    @Input()
    header: string;
    
    constructor() {
        console.log('control created');
    }

    ngOnInit(): void {
        
    }    
    ngAfterViewInit(): void {
        
    }
 
    writeValue(value: any): void {
        this.value = value;
    }
    
    registerOnChange(fn: any): void {
      this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
      this.onTouch = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.disalbed = isDisabled;
        console.log("card selector " + this.disalbed);
    }

    updateValue(value) {
        this.value = value;
        this.onChange(this.value);
        this.onTouch();
    }
}