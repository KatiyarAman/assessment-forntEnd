import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from '../services/router.service';

@Injectable()
export class DoNotRefreshGuard implements CanActivate {
    
    private router: Router;
    private routerService: RouterService;
    constructor(router: Router, routerService: RouterService) {
        this.router = router;
        this.routerService = routerService;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        // console.log("Do Not Refresh Guard");
        // console.log(route.url);
        // console.log(state.url);
        if (this.isPageRefresh()) {
            // console.log('Page Refresh Request');
            //this.routerService.navigateToCurrentPage(this.router);
            return true;
        }
        return true;
    }
    
    private isPageRefresh() : boolean {
        return !this.router.navigated;
    }
}