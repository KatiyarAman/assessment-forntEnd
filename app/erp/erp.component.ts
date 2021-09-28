import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AppService } from 'app/shared/services/app.service';
@Component({
    selector: 'erp-app',
    templateUrl: './erp.component.html',
    styleUrls: ['./erp.component.scss']
})

export class ERP implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private appService: AppService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            // this.onCustomAction(params);
            // this.params = params;
            console.log(params)
            // this.appService.menuId = params.id
        });
        // this.router.navigate(['/adminpanel/module/index'], { skipLocationChange: true });
    }

}