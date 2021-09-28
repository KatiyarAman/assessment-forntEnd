import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class AssessmentToolService {
    constructor(private http: HttpClient) {
        
    }

    getJDInformation(token: string, jobPostingId: number) {
        let header = new HttpHeaders({"Authorization": `Bearer ${token}`});
        return this.http.get(`${environment.login_url}/jobPosting/getJDInfo/${jobPostingId}`, {headers: header});
    }

    registerCandidate(payload: any, token: string) {
        let header = new HttpHeaders({"Authorization": `Bearer ${token}`});
        return this.http.post(`${environment.login_url}/candidates/add`,payload, {headers: header});    
    }

    verifyCandidateEmail(verificationToken: string, token: string) {
        let header = new HttpHeaders({"Authorization": `Bearer ${token}`});
        let param = new HttpParams({fromObject: {verificationToken: verificationToken}});
        return this.http.post(`${environment.login_url}/candidates/verifyEmail`, {}, {headers: header, params: param});
    }

    getCustomFields(moduleId, token) {
        let header = new HttpHeaders({"Authorization": `Bearer ${token}`});
        return this.http.get(`${environment.login_url}/customfield/get/${moduleId}`,{headers: header});  
    }

    getModuleById(moduleId,token) {
        let header = new HttpHeaders({"Authorization": `Bearer ${token}`, "moduleId": '192'});
        return this.http.get(`${environment.login_url}/module/getById/${moduleId}`,{headers: header});
    }
}