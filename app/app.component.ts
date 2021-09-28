import { Component, ViewContainerRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart, Navigation } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { RouterService } from './shared/services/router.service';
import { AppService } from './shared/services/app.service';
import { environment } from 'environments/environment';
import * as CryptoJS from 'crypto-js';
import { Meta, Title } from '@angular/platform-browser';
declare let oauthToken: string

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  subdomain = ""
  token = ""

  constructor(private router: Router, private location: Location, private route: ActivatedRoute, private routerService: RouterService, private appService : AppService,private titleService: Title,private metaTagService: Meta) {
    // console.log(document.location.search.split("?")[1])
    // if(document.location.search.split("?")[1]){
    //   let token = document.location.search.split("?")[1]
    //   console.log(token)
    // }
    
    if(window.location.href.split("?error=")[1]){
      // console.log(window.location.href.split("?error=")[1])
      let token = window.location.href.split("?error=")[1]
      localStorage.setItem("error",JSON.stringify(token))
      this.router.navigate(['/pages/login'])
    }else if(window.location.href.split("?token=")[1]){
      
      
      console.log(window.location.href.split("?token=")[1])
      let token = window.location.href.split("?token=")[1].split("&")[0]
      oauthToken = token
      //localStorage.setItem(environment.oauth_token,JSON.parse(token));
      localStorage.setItem(environment.oauth_token,token);
      if(!window.location.href.includes('portal') ){
        this.router.navigate(['/pages/login'])
      }
    } else
    if(!localStorage.getItem("subdomain") && window.location.href.split("/")[3] != ""){
      // this.subdomain = localStorage.getItem("subdomain")
      if(window.location.href.split("/")[3] == "pages"){
        window.location.href = environment.httpPath+document.location.host
      }else{
        
      localStorage.setItem("subdomain",window.location.href.split("/")[3])  
        window.location.href = environment.httpPath+document.location.host+"/"+localStorage.getItem("subdomain")
      }
      // console.log(window.location.href)    
    }
    this.route.params.subscribe(params => {
      // console.log(params)
      // console.log(this.route.snapshot.params.subdomain)
    })
    console.log("1 - "+localStorage.getItem(environment.oauth_token))
    if((!localStorage.getItem(environment.oauth_token) || localStorage.getItem(environment.oauth_token) == 'undefined' ) && localStorage.getItem("subdomain")){
      console.log("3 - "+localStorage.getItem(environment.oauth_token))
      this.appService.subdomain(localStorage.getItem("subdomain")).subscribe(data => {
        // console.log(data)
        // this.spinner.hide();
       
        // this.subdomain = window.location.href.split("/")[3]
        localStorage.setItem("tenantId",data.toString())
        this.router.navigate(['/pages/login']);
        
      },error=>{
        console.log(error)
      })
    }
    // console.log(document.location.pathname)
    
  }

  ngOnInit() {
    // this.titleService.setTitle("Shivit Technologies Pvt. Ltd. - Careers - http://shivit.com");
  
    // this.metaTagService.addTags([
    //   { name: 'keywords', content: 'Shivit Technologies Pvt. Ltd. - Careers - http://shivit.com' },
    //   { name: 'robots', content: 'index, follow' },
    //   { name: 'author', content: 'Shivit Technologies Pvt. Ltd.' },
    //   { charset: 'UTF-8' },
    //   { property: 'og:title', content: 'Hiring for Shivit Technologies ' },
    //   { property:"og:url", content:"http://shivit.com"},
    //   { property:"og:type", content:"website"},
    //   { property:"og:description", content:"Lets Join Us for your future"},
    //   { property:"og:image", content:"http://www.shivit.com/img/logo.png"}
    // ]);
    // console.log(this.document.Location.)
    // console.log(this.route.snapshot.params.id)
    this.route.params.subscribe(params => {
      // console.log(params)
      // console.log(this.route.snapshot.params.subdomain)
    });
    this.subscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => window.scrollTo(0, 0));

      // Testing Encryption Library

      // let str = {username: 'sachin', password: '1234'};
      // let pwd = "1234";
      // let encrypted = CryptoJS.AES.encrypt(JSON.stringify(str), pwd);
      // console.log("encrypted : " + encrypted.toString());
      // let decrypted = CryptoJS.AES.decrypt(encrypted.toString(), pwd);
      // console.log("decrypted : ", JSON.parse(decrypted.toString(CryptoJS.enc.Utf8)));
      // this.routerService.setupRouterEvent();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  deferredPrompt: any;
  showButton = true;
  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: { preventDefault: () => void; }) {
    console.log(e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showButton = true;
  }

  addToHomeScreen() {
    // hide our user interface that shows our A2HS button

    this.showButton = false;
    // Show the prompt
    this.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    this.deferredPrompt.userChoice
      .then((choiceResult: { outcome: string; }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.deferredPrompt = null;
      });
  }


}