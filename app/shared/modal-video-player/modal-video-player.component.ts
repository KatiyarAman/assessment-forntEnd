import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from '../services/app.service';

@Component({
    selector: 'app-modal-video-player',
    templateUrl: './modal-video-player.component.html',
    styleUrls: ['./modal-video-player.component.scss']
})
export class ModalVideoPlayerComponent implements OnInit, AfterViewInit {

    @Input()
    introVideo: any;

    @ViewChild('player') player: ElementRef;
    constructor(public activeModal: NgbActiveModal, private appService: AppService) {

    }
    ngAfterViewInit(): void {
        this.appService.getIntroVideo(this.introVideo).subscribe(res => {
            const fileType = "video/mpeg";
            const blob = new Blob([res] , {type: fileType });
            const src = URL.createObjectURL(blob);
            this.player.nativeElement.src = src;
        });
    }

    ngOnInit() {
        console.log(this.introVideo);
    }

    close() {
        this.activeModal.close();
    }
}