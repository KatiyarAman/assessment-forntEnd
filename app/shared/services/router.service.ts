import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter } from 'rxjs/operators';
import { AppService } from './app.service';
import { RouterHistoryStorageService } from './router-history-storage.service';

/**
 * @author Sachin Kumar
 */

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private route: ActivatedRoute, private routerHistory: RouterHistoryStorageService, private router: Router, private appService: AppService, private spinner: NgxSpinnerService) {

  }

  /**
   * Function to extract url and params object from a matrix encoded URL.
   * @param encodedURL 
   */
  private decodeMatrixParamURL(encodedURL: string): any {
    // decode the URL
    let decodedURL: string = decodeURIComponent(encodedURL);

    // check if this url contains matrix params
    if (decodedURL.indexOf(';') !== -1) {
      let url: string = decodedURL.substr(0, decodedURL.indexOf(';'));
      let matrixParamString: string = decodedURL.substr(decodedURL.indexOf(';') + 1);
      let params = {};
      matrixParamString.split(';').forEach(matrixParam => {
        let paramArray = matrixParam.split('=');
        params[paramArray[0]] = paramArray[1];
      });
      return { url: url, params: params };

      //  if url does not contain matrix params simply return the url. 

    } else {
      return { url: decodedURL }
    }
  }

  /**
   * Navigates to the given url using the given router instance. decodes any matrix params
   * if assosited with the url and pass them as param object to router. this navigation will
   * not change browser history state.
   * @param url URL to navigate, may contains matrix params
   * @param router router to use for navigation
   */
  private navigateToURL(url: string, router: Router) {
    let decodedURL: any = this.decodeMatrixParamURL(url);
    if (decodedURL.params){
      console.log(decodedURL);
      router.navigate([decodedURL.url, decodedURL.params], { skipLocationChange: true });
    }
    else
      router.navigate([decodedURL.url], {skipLocationChange: true});
  }

  /**
   * Stores URL and params to Local Storage
   * @param router 
   */
  pushRouterHistory(router: Router) {
    this.routerHistory.pushUrl(router.url);
  }

  /**
   *  Loads the previous url from local storage and navigate to it.
   * @param router 
   */
  goBack(router: Router) {
    let url = this.routerHistory.popUrl();
    console.log(url)
    this.saveCurrentPageURL(url)
    this.navigateToURL(url, router);
  }

  /**
   * Saves the current URL to local storage.
   * @param url 
   */
  saveCurrentPageURL(url: string) {
    this.routerHistory.setCurrentPage(url);
  }

  navigateToCurrentPage(url,router: Router) {
    // let url: string = this.routerHistory.getCurrentPage();
    // console.log(document.location.pathname.includes(url))
    // if(!document.location.pathname.includes(url)){
      //router.navigate([url], {  relativeTo: this.route.parent, skipLocationChange: true });
      this.navigateToURL(url, router);
    // }
    
    // 
  }

  setRefreshState(state : boolean) {
    window.sessionStorage.setItem('refresh-state', JSON.stringify(state));
  }

  getRefreshState() : boolean {
    return JSON.parse(window.sessionStorage.getItem('refresh-state'));
  }

  setupRouterEvent() {
    console.log("Setting Up Router");
    this.router.events.pipe(filter(evt => evt instanceof NavigationStart)).subscribe((evt: NavigationStart) => {
      // when navigation kicked by Browser Button.
      // this.pushRouterHistory()
      let browserRefresh = false
      console.log(evt.navigationTrigger)
      browserRefresh = this.router.navigated
      console.log(evt.id)
      let url = JSON.parse(window.sessionStorage.getItem("current_page"));
      console.log(browserRefresh)
      if (evt.navigationTrigger == 'popstate') {
        // this.routerService.saveCurrentPageURL(evt.url);
        this.goBack(this.router);
      }else if(evt.id === 1 && url != null){                                                                                                                                     
        // console.log(url)
        console.log(!url.includes(null))
        if(url != "/null"){
          if(!document.location.pathname.includes(url)){
            if(!url.includes("pages")){
              this.navigateToCurrentPage(url,this.router)
            }
          }
        }
        //                                                                                                                                                  this.routerService.navigateToCurrentPage(url,this.router,this.route)
      }else{
        this.pushRouterHistory(this.router)
      }
      // this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe((evt: NavigationEnd) => {
        
      // });
    });
    this.router.events.pipe(filter(evt => evt instanceof NavigationEnd)).subscribe((evt: NavigationEnd) => {

      console.log(evt.id)
      console.log(evt.url)
      console.log(evt.urlAfterRedirects)
      this.saveCurrentPageURL(evt.urlAfterRedirects);
    }) 
  }

  goto(path,id, apiPath,title, listType, formType){
    console.log(listType);
    this.spinner.show(undefined,
    {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    // this.router.navigate([path, {moduleUrl: path,moduleId: id, apiPath: apiPath, title:title,listType: listType,formType: formType}], {  relativeTo: this.route.parent, skipLocationChange: true } );
    
    this.appService.getCutomFields(id).subscribe(data=>{
      console.log(data);
      this.spinner.hide();
      // this.pushRouterHistory(this.router);
      this.router.navigate([path, {moduleUrl: path,moduleId: id, apiPath: apiPath, title:title,listType: listType,formType: formType,headerObject: JSON.stringify(data["data"]), buttons: JSON.stringify(data["buttons"])}], {  relativeTo: this.route.parent, skipLocationChange: true } );
    },error=>{
        console.log(error);
    })
  }

}