import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { AuthService } from './auth.service';
import { AppService } from '../services/app.service';
declare let oauthToken: string

@Injectable({
    providedIn: "root"
})
export class Interceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private appService: AppService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const isLoggedIn = this.authService.isAuthenticated()
        const isApiUrl = request.url.startsWith(environment.login_url);
        // if(isApiUrl){
        //     request = request.clone({
        //         setHeaders: environment.client_authorization_headers
        //     })
        // }
        // console.log(request)
        if (isLoggedIn && isApiUrl) {
            // console.log(environment.auth_token)
            environment.bearer_token_header.Authorization = "Bearer "+localStorage.getItem(environment.oauth_token)
            environment.bearer_token_header_file.Authorization = "Bearer "+localStorage.getItem(environment.oauth_token)
            // this.appService.ROUTES = JSON.parse(localStorage.getItem("verticleMenu"))
            // request = request.clone({
            //     setHeaders: {
            //         Authorization: `${environment.bearer_token_header.Authorization}`
            //     }
            // });
            // console.log(request)
        }
        return next.handle(request);
    }
}