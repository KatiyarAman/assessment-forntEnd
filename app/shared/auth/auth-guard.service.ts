import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
declare let returnUrl : string
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
    // console.log("subdomain")
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const pattern  = '.*/subdomain.*'
    const pattern1 = '.*/login'
    const pattern2 = '.*/portal'
    // console.log(window.location.href.split("?token=")[1])
    
    if(window.location.href.split("?error=")[1]){
      // console.log(window.location.href.split("?error=")[1])
      let token = window.location.href.split("?error=")[1]
      this.router.navigate(['/pages/subdomain',{error: token}], {queryParams: { returnUrl: returnUrl }})
    }else if(window.location.href.split("?token=")[1]){
      // console.log(window.location.href.split("?token=")[1])
      let token = window.location.href.split("?token=")[1]
      if(state.url.match(pattern1)){
        this.router.navigate(['/pages/login',{token: token}])
      }
      if(state.url.match(pattern2)){
        console.log(state.url)
        this.router.navigate(['/portal/job-description',{token: token}])
      }
    }else
    if(!state.url.match(pattern)){
      returnUrl = state.url
      // localStorage.setItem("returnUrl",state.url)
      if(this.authService.isAuthenticated()){
        return this.authService.isAuthenticated()
      }
      // this.router
      // console.log("SUBDOMAIN")
      // console.log(this.router.url)
      this.router.navigate(['/pages/subdomain'])
      return false;
    }else{
      return true;
    }
  }
}
