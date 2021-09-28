import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private toggleSidebar = new Subject<boolean>(); // small screen
  private overlaySidebarToggle = new Subject<boolean>();
  private toggleNotiSidebar = new Subject<any>();
  private toggleSettings= new Subject<any>();
  private toggleJDProfile = new Subject<any>();
  private toggleTemplate = new Subject<any>();
  private toggleCandidateApplyForm = new Subject<any>();
  // Observable
  toggleSidebar$ = this.toggleSidebar.asObservable();
  overlaySidebarToggle$ = this.overlaySidebarToggle.asObservable();
  toggleNotiSidebar$ = this.toggleNotiSidebar.asObservable();
  toggleSettings$ = this.toggleSettings.asObservable();
  toggleTemplate$ = this.toggleTemplate.asObservable();
  toggleJDProfile$ = this.toggleJDProfile.asObservable();
  toggleCandidateApplyForm$ = this.toggleCandidateApplyForm.asObservable();
  toggleSidebarSmallScreen(toggle: boolean) {
    this.toggleSidebar.next(toggle);
  }

  overlaySidebartoggle(toggle: boolean) {
    this.overlaySidebarToggle.next(toggle);
  }
  settSidebar = false
  toggleSettSidebar(toggle: boolean){
    console.log(toggle)
    this.toggleSettings.next(toggle);
  }

  toggleNotificationSidebar(toggle: boolean,event: any) {
    let param = JSON.stringify({toggle: toggle, event: event})
    this.toggleNotiSidebar.next(param);
  }
  toggleJDProfileScreen(toggle: boolean){
    this.toggleJDProfile.next(toggle);
  }
  toggleTemplateScreen(toggle: boolean){
    this.toggleTemplate.next(toggle);
  }

  toggleCandidateApplyScreen(toggle: boolean) {
    this.toggleCandidateApplyForm.next(toggle);
  }
}
