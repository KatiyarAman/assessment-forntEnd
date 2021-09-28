import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { RouterStateSnapshot, ActivatedRoute } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private route: ActivatedRoute) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(err)
            // if ([401, 403].indexOf(err.status) !== -1) {
            //     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            //     // this.authService.logout();
            // }
            if ([401,404].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // this.authService.logout();
                // console.log(this.route.snapshot['_routerState'].url)
                //this.authService.gotToErrorPage(this.route.snapshot['_routerState'].url,err)
                // this.router.navigate(['/pages/error',{ returnUrl: this.state.url, error: err }])
            }
            if(err instanceof ErrorEvent){
                // console.log(err)
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}