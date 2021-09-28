import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { AppService } from 'app/shared/services/app.service';
import { environment } from 'environments/environment';
@Component({
    selector: 'master-app',
    templateUrl: './questionnaires.component.html',
    styleUrls: ['./questionnaires.component.scss']
})

export class QuestionnairesComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            // this.onCustomAction(params);
            // this.params = params;
            // console.log(params)
            environment.returnUrl = this.route.snapshot['_routerState'].url
            environment.event = JSON.stringify(params)
            // this.appService.menuId = params.id
        });
        // this.router.navigate(['/adminpanel/module/index'], { skipLocationChange: true });
    }

}