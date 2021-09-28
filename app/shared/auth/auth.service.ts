import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';
import * as jwt_decode from 'jwt-decode';
import { RememberMeService } from '../services/remember-me.service';
import { DataService } from '../services/data.service';
import * as dataService from '../services/data.service'
declare let subdomain: string
declare let returnUrl: string
declare let oauthToken: string
declare let verticleMenu: string

@Injectable()
export class AuthService {
  token: string;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private rememberMeService: RememberMeService, private dataService: DataService) {
  }

  signupUser(email: string, password: string) {
    //your code for signing up the new user
  }

  gotToErrorPage(params,error){
    // console.log(error)
    // console.log(params)
    this.router.navigate(['/pages/error',{ returnUrl: params, error: JSON.stringify(error) }], {  relativeTo: this.route.parent, skipLocationChange: true } )
  }

  getUserDetails(user){
    const userDetails = new User();
    console.log(userDetails)
    var token = user.token;
    var decoded = jwt_decode(token);
    console.log(decoded);
    return userDetails
  }

  signinUser(loginDetails) {
    console.log(loginDetails)
    return this.http.post<any>(environment.base_url + '/auth/login',loginDetails).pipe(
      map(user => {
      // login successful if there's a jwt token in the response
        console.log(user)
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          oauthToken = user.token
          localStorage.setItem(environment.oauth_token,user.token)
          // environment.auth_token = JSON.stringify(user.token)
          environment.current_user.currentUser = this.getUserDetails(user);
        }

        return user;
      })
    )
    //your code for checking credentials and getting tokens for for signing in user
  }

  logout() {
    environment.bearer_token_header.Authorization = "Bearer "
    environment.bearer_token_header_file.Authorization = "Bearer "
    oauthToken = ""
    verticleMenu = ""
    // localStorage.removeItem("actions")
    this.dataService.subDomainGlobal = ""
    localStorage.removeItem("subdomain")
    localStorage.removeItem("history_stack")
    localStorage.removeItem("current_page")
    localStorage.removeItem(environment.oauth_token)
    localStorage.removeItem("verticleMenu")
    returnUrl = ""
    this.rememberMeService.clearRememberMeCookie();
    // console.log(document.location.host)
    window.location.href = environment.httpPath+document.location.host
  }

  getToken() {    
    return environment.bearer_token_header.Authorization;
  }

  isAuthenticated() {
    //console.log("2 - "+localStorage.getItem(environment.oauth_token))
    if(!localStorage.getItem(environment.oauth_token) || localStorage.getItem(environment.oauth_token) == 'undefined'){
      return false
    }
    // const token = oauthToken;
    const token = localStorage.getItem(environment.oauth_token)
    // console.log(token)
    dataService.setDecodedToken(jwt_decode(token))
    if (Date.now() >= dataService.decodedToken.exp * 1000){
      // console.log(window.location.href)
      if(!window.location.href.includes('portal')){
        this.logout();
      }else{
        
      }
      
      return false;
    }
    return true;
  }
}
