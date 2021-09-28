import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(val: string) : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>{
        console.log(val)
        let v = control.value
        console.log(v)
        if(v != val){
            return {'passwordMatchValidator': true, 'requiredValue': val}
        }
        return null
    }
    // let value = control.value
}

export function dateValidation(type: any) : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>{
        let compVal = new Date(type.value)
        let setDate = new Date(control.value)
        console.log(setDate)
        console.log(compVal)
        switch (type.case) {
            case "lessthan":
                
                if(setDate > compVal){
                    console.log(setDate)
                    return {'dateValidation': true, 'requiredValue': setDate}
                }
                break;

                case "greaterthan":
                    if(setDate < compVal){
                        console.log(setDate)
                        return {'dateValidation': true, 'requiredValue': setDate}
                    }
                    break;
        
            default:
                break;
        }
        return null
    }
    // Explain Functionality
    
    
}