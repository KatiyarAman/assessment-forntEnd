import { Injectable } from "@angular/core";
import { CookieStorage } from 'cookie-storage';
import * as CryptoJS from 'crypto-js';

const REMEMBER_ME_COOKIE_NAME = "_vbrs_";
const ENCRYPTION_KEY = "@123@";

@Injectable({
    providedIn: 'root'
})
export class RememberMeService {
    private cookieStorage: CookieStorage = new CookieStorage();

    isRememberMeCookieAvailable() : boolean {
        let cookie = this.cookieStorage.getItem(REMEMBER_ME_COOKIE_NAME);
        return cookie != null;
    }

    saveCredentialsToCookie(credentials: any) {
        let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(credentials), ENCRYPTION_KEY);
        let expiryDate = new Date();
        expiryDate.setFullYear(expiryDate.getFullYear() + 1); // this cookie will expire after 1 year
        this.cookieStorage.setItem(REMEMBER_ME_COOKIE_NAME, encryptedData.toString(),{expires: expiryDate});
    }

    getCredentialsFromCookie() : any {
        let cookie = this.cookieStorage.getItem(REMEMBER_ME_COOKIE_NAME);
        return JSON.parse(CryptoJS.AES.decrypt(cookie, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8));
    }

    clearRememberMeCookie() {
        this.cookieStorage.removeItem(REMEMBER_ME_COOKIE_NAME);
    }
}