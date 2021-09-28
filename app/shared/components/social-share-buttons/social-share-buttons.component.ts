import { Component, Input, OnInit } from '@angular/core';

// https://api.whatsapp.com/send?text=[title]&url=[share-url]
const WHATSAPP_SHARE_URL = "https://api.whatsapp.com/send";
// https://www.facebook.com/sharer.php?u=[url]
const FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer.php"
// https://www.twitter.com/Share?url=[]
const TWITTER_SHARE_URL = "https://www.twitter.com/Share"

const LINKEDIN_SHARE_URL = "http://www.linkedin.com/shareArticle";
@Component({
    selector: 'app-social-share-buttons',
    templateUrl: './social-share-buttons.component.html',
    styleUrls: ['./social-share-buttons.component.scss']
})
export class SocialShareButtons implements OnInit {
    @Input() shareURL: string;
    @Input() shareTitle: string;
    show: boolean = false;
    // urls 
    facebookShare: string;
    whatsappShare: string;
    twitterShare: string;
    linkedInShare: string;

    ngOnInit() {
        this.shareURL = encodeURIComponent(this.shareURL);
        this.facebookShare = `${FACEBOOK_SHARE_URL}?u=${this.shareURL}&social=facebook`;
        this.whatsappShare = `${WHATSAPP_SHARE_URL}?text=${this.shareURL}&social=whatsapp%20${this.shareTitle}`;
        this.twitterShare = `${TWITTER_SHARE_URL}?url=${this.shareURL}&social=twitter`;
        this.linkedInShare = `${LINKEDIN_SHARE_URL}?url=${this.shareURL}&title=${this.shareTitle}&social=linkedin`
        this.show = true;
    }
}