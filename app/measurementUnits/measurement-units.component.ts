import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from "@angular/router";
import { AppService } from 'app/shared/services/app.service';
import { environment } from 'environments/environment';
@Component({
    selector: 'master-app',
    templateUrl: './measurement-units.component.html',
    styleUrls: ['./measurement-units.component.scss']
})

export class MeasurementUnitsComponent implements OnInit {
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