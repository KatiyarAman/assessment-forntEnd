import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[appPassword]'
})

export class AppPasswordDirective {
    private _shown = false;
    constructor(private el: ElementRef){
        this.setup();
    }

    toggle(div : HTMLElement){
        this._shown = !this._shown;
        if (this._shown) {
            this.el.nativeElement.setAttribute('type', 'text')
            div.innerHTML = '<i class="ft-eye-off info"></i>'
        }else{
            this.el.nativeElement.setAttribute('type', 'password')
            div.innerHTML = '<i class="ft-eye info"></i>'
        }
    }

    setup(){
        const parent = this.el.nativeElement.parentNode;
        const div = document.createElement('div');
        div.innerHTML = '<i class="ft-eye info"></i>'
        div.setAttribute('class','form-control-position')
        div.addEventListener('click',(event) => {
            this.toggle(div);
        })
        parent.appendChild(div)
    }
}