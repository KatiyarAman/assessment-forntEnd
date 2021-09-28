import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
declare var MediaRecorder: any;

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit, AfterViewInit {

  // @Output() getLink = new EventEmitter();
  @Output()
  onVideoRecorded: EventEmitter<any> = new EventEmitter();

  @Input()
  params: any;
  @Input() videoTime: any; // in minutes
  @Input() fileName: any; 
  mediaStream: any;
  @Input()
  formData: any;
  videoDone: boolean = false;
  recorder: any;
  recorededVideo: Blob;
  @ViewChild("webcam") webcam: ElementRef;
  @ViewChild("picture") picture: ElementRef;
  @ViewChild("preview") preview: ElementRef;
  @ViewChild("videoLoader") videoLoader: ElementRef;
  @ViewChild("videoRecordBtn") videoRecordBtn: ElementRef;
  showLoading = true
  startbtn: boolean = false;
  private startBtnSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  subscription: Subscription
  countdown: any;
  cdwn: number = 0;
  get startBtnDisabled() {
    return this.startBtnSubject.asObservable();
  }
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
   console.log(this.videoTime);
  }

  ngAfterViewInit(): void {
   
  }
  
  startRecording() {
    console.log(this.params);
    console.log(this.fileName);
    // Request the camera and mic access from user.
    window.navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(mediaStream => {
        // disable start button
        this.startBtnSubject.next(true);

        // set media stream to video tag
        this.webcam.nativeElement.srcObject = mediaStream;
        this.mediaStream = mediaStream;
        // playing
        this.webcam.nativeElement.play();
        this.recorder = new MediaRecorder(mediaStream);
        this.recorder.start();  
        
        // start the coundown when recording is started.
        this.cdwn = Math.abs(this.videoTime);

        this.countdown = interval(this.cdwn * 1000 * 60);
        this.subscription = this.countdown.subscribe(val => {
          this.recorder.stop();
        });
        // interval(1000).subscribe(x => {
        //   this.cdwn--
        //   console.log(this.cdwn)
        // }) 
        // this.countdown.asObservable().subscribe(x => {
        //   //console.log(x);

        //   console.log(this.cdwn);
        // })      
        this.recorder.onstop = (evt) => {
          console.log(evt);
          console.log("Recorded Video : ", this.recorededVideo);
        }
        console.log("started")
        this.recorder.ondataavailable = (event) => {
          console.log(event);
          this.recorededVideo = event.data;
          this.mediaStream.getVideoTracks()[0].stop();
          this.videoDone = true;
          this.onVideoRecorded.emit(this.recorededVideo);
          // let formData = new FormData()
          // formData.append('files', this.recorededVideo, this.fileName);
          // this.getState(formData, 121).subscribe(data => {
          //   console.log(data);
          //   this.getLink.emit(data["url"]);
          // })
        };
      }).catch((err) => {
        console.log(err);
        window.alert("Please enable web cam");
      });
  }
  
  getCountdown() {

  }

  // getState(data, moduleId) {
  //   let vi: any = {}
  //   vi.moduleId = moduleId
  //   console.log(localStorage.getItem(environment.oauth_token))
  //   vi.Authorization = "Bearer " + JSON.parse(localStorage.getItem(environment.oauth_token))
  //   return this.http.post(`http://localhost:8080/assessment-questionnaires/uploadVid`, data, { headers: vi })
  // }

}
