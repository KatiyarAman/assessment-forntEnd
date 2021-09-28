import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RouterHistoryStorageService } from './router-history-storage.service';


@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private routerHistory: RouterHistoryStorageService) {

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
    let decodedURL: any = this.decodeMatrixParamURL(url);
    if (decodedURL.params)
      router.navigate([decodedURL.url, decodedURL.params], { skipLocationChange: true });
    else
      router.navigate([decodedURL.url], {skipLocationChange: true});
  }
}