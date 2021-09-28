import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'app-intro-video-recorder',
    templateUrl: './intro-video-recorder.component.html',
    styleUrls: ['./intro-video-recorder.component.html']
})
export class IntroVideoRecorder implements OnInit, AfterViewInit {
    
    @ViewChild('webcamPlayer')
    webcamPlayer: ElementRef

    mediaStream: MediaStream;
    private showWebcamSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    permissionDenied: boolean = false;
    get showWebcam() {
        return this.showWebcamSubject.asObservable();
    }
    
    constructor() {

    }
    
    ngAfterViewInit(): void {
        
    }
    
    startRecording() {
        this.webcamPlayer.nativeElement.onloadedmetadata = (evt) => {
            console.log("metadata loaded");
            this.showWebcamSubject.next(true);
            this.webcamPlayer.nativeElement.play();
        }
        const constraint = {video: true, audio: true };
        window.navigator.mediaDevices.getUserMedia(constraint).then(mediaStream => {
            this.mediaStream = mediaStream;
            if (this.permissionDenied) {
                this.permissionDenied = false;
            }
        }).catch(error => {
            this.permissionDenied = true;
        });
    }

    ngOnInit(): void {
        console.log("Hello world");
    }

}