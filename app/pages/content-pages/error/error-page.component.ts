import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { DataService } from 'app/shared/services/data.service';
import { environment } from 'environments/environment';
declare let subdomain: string
declare let returnUrl: string


@Component({
    selector: 'app-error-page',
    templateUrl: './error-page.component.html',
    styleUrls: ['./error-page.component.scss']
})

export class ErrorPageComponent implements OnInit {
    returnUrl: any
    error: any
    errorStatus: any
    errorTitle: any
    errorMessage: any
    buttonClass: any
    buttonTitle: any
    buttonUrl: any = ""

    constructor(private router: Router,private route: ActivatedRoute, private modalService: NgbModal, private dataService: DataService,private authService: AuthService){}
    ngOnInit(){
        this.route.params.subscribe(params => {
            // this.onCustomAction(params);
            // this.params = params;
            console.log(params)
            this.returnUrl = params.returnUrl
            
            if(params.error){
                this.error = JSON.parse(params.error).error.message;
                
                console.log(this.error)
                this.errorStatus = this.error.status
                this.errorTitle = this.error.error
                this.errorMessage = this.error.message
                switch(this.errorStatus){
                    default:
                        this.buttonClass = "btn btn-danger my-2"
                        this.buttonTitle = "Click Here to Relogin"
                        // this.buttonUrl = "/pages/login"
                        break;
                    case 404:
                        // this.errorTitle = params.error
                        this.buttonClass = "btn btn-warning my-2"
                        this.buttonTitle = "Back To Main Login"
                        returnUrl = ""
                        subdomain = ""
                        this.dataService.subDomainGlobal = ""
                        this.buttonUrl = environment.httpPath+document.location.host
                        break;
                }
            }else{
                this.buttonClass = "btn btn-warning my-2"
                this.errorStatus = 404
                this.errorTitle = "PAGE NOT FOUND"
                this.buttonTitle = "Back To Home"
                this.errorMessage = "Requested was not available or Temporarly Down"
                
            }
            // console.log()
        });
    }

    redirect(){
        switch(this.errorStatus){
            default:
                this.authService.logout()
                break;
            case 404:
                if(this.buttonUrl != ""){
                    window.location.href = this.buttonUrl
                }else{
                    this.router.navigate(['/'])
                }
                
        }
    }

}