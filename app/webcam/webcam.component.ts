import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import WebCam from 'webcam-easy';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.scss']
})
export class WebcamComponent implements OnInit, AfterViewInit {

  stream: MediaStream;
  recorder: MediaRecorder;
  recorededVideo: Blob;
  @ViewChild("webcam") webcam : ElementRef;
  @ViewChild("picture") picture: ElementRef;
  @ViewChild("preview") preview: ElementRef;

  constructor() { }
  ngAfterViewInit(): void {
    console.log(this.webcam);
    console.log(this.picture);
    this.webcam.nativeElement.onloadedmetadata = (evt) => {
      this.webcam.nativeElement.play();
    }
  }

  ngOnInit(): void {
    
  }
  startRecording() {
    this.recorder = new MediaRecorder(this.stream);
    this.recorder.onstop = (evt) => {
      console.log(evt);
      console.log("Recorded Video : ", this.recorededVideo);
    }
    console.log(this.recorder);
    this.recorder.start();
    this.recorder.ondataavailable = (event) => {
      console.log(event);
      this.recorededVideo = event.data;
      this.preview.nativeElement.src = URL.createObjectURL(this.recorededVideo);
      this.preview.nativeElement.play();
    };
  }

  endRecording() {
    this.recorder.stop();
  }
  startVideo() {
    window.navigator.mediaDevices.getUserMedia({video: true, audio: true}).then((ms => {
      console.log(ms);
      this.stream = ms;
      let s = ms.getVideoTracks()[0];
      console.log(ms.getVideoTracks()[0]);
    })).catch((err) => {
      window.alert("Please enable web cam");
    });
  }

  endVideo() {
    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
  }

  takePicture() {
    const canvas = <HTMLCanvasElement> this.picture.nativeElement;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(this.webcam.nativeElement,0,0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      console.log('image blob is ready', blob);
    });
    console.log(canvas.toDataURL());
  }
}
