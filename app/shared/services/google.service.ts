
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  constructor(private _http: HttpClient) {

  }

  translate(obj: GoogleObj, key: string) {
    return this._http.post(url + key, obj);
  }
}

const url = 'https://translation.googleapis.com/language/translate/v2?key=';

export class GoogleObj {
  q: string;
  source: string;
  target: string;
  readonly format: string = "text";

  constructor() { 

  }
}