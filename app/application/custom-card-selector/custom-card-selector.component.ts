import { Component, OnInit, Input, forwardRef, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-custom-card-selector',
    templateUrl: './custom-card-selector.component.html',
    styleUrls: ['./custom-card-selector.component.scss'],
    
})
export class CustomCardSelectorComponent implements OnInit, OnChanges {
    
    
    @Input()
    formCurrentValue: string;

    @Input()
    option: any;
    
    @Output()
    clicked: EventEmitter<string> = new EventEmitter();

    selected: boolean;
    ngOnInit(): void {
     
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (changes.formCurrentValue && changes.formCurrentValue.currentValue == this.option.value)
            this.selected = true;
        else
            this.selected = false;
    }
   selectMe() {
    this.clicked.emit(this.option.value);
   }
}