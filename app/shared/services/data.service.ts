import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';
import { pagehistory } from '../data/data.object';

export let decodedToken: any


export function setDecodedToken(value){
  decodedToken = value
}

@Injectable({
    providedIn: 'root'
})
export class DataService  {
  returnUrl: any;
  event: any;
  ROUTES: RouteInfo[];
  HROUTES: RouteInfo[];
  pageHistory: pagehistory
  subDomainGlobal: any = ""
}
