import { Component, OnInit, ElementRef, Renderer2, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-sidebar',
  templateUrl: './notification-sidebar.component.html',
  styleUrls: ['./notification-sidebar.component.scss']
})
export class NotificationSidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  layoutSub: Subscription;
  isOpen = false;
  params: any
  activeTabUrl : any
  referEarnimg : any
  private scrollContainer: any;
  @ViewChild('scrollFrame', {static: false}) scrollFrame: ElementRef;
  // @ViewChild('settings', {static: false}) settings: ElementRef;
  ngOnInit() {

  }

  ngAfterViewInit() {
     
    // this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());

    // Add a new item every 2 seconds
    
  }

  constructor(private layoutService: LayoutService) {
    
    this.referEarnimg = "assets/img/referEarn.png"
    this.layoutSub = layoutService.toggleNotiSidebar$.subscribe(
      open => {
        console.log(JSON.parse(open))
        this.params = JSON.parse(open)
        // this.isOpen = open;
        this.isOpen = this.params.toggle
        this.activeTabUrl = this.params.event;
        
        this.scrollContainer = this.scrollFrame.nativeElement;
        this.scrollToBottom()
      });
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  onClose() {
    if(this.params.toggle){
      this.layoutService.toggleNotificationSidebar(false,this.params.event);
    }
  }

  private scrollToBottom(): void {
    this.scrollContainer.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
