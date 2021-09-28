import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import { AppService } from 'app/shared/services/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AlertService } from 'app/shared/services/alerts.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Subject, interval } from 'rxjs';
import { debounceTime,map, takeUntil } from 'rxjs/operators';

import * as moment from 'moment';
import { $ } from 'protractor';
import { DatePipe } from '@angular/common';
declare var require: any;

const data: any = require('../../shared/data/chartist.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
  // plugins?: any;
}

@Component({
  selector: 'ngbd-modal-contents',
  providers: [AlertService],
  template: `
  <div class="modal-header">
    <h5 class="modal-title">Tour Guide!</h5>
    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
      <p>Tour Guide</p>
      <section id="swiper-parallax">
        <div class="row">
            <div class="col-12">
                <div class="card ">
                    <div class="card-content">
                        <div class="card-body">
                            <!-- Swiper -->
                            <div class="swiper-parallax swiper-container" [swiper]="swiperParallaxConfig">
                                <div class="parallax-bg" data-swiper-parallax="-23%"><img class="img-fluid" src="assets/img/banner/parallax-4.jpg" alt="banner" style="height: 100%"></div>
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide">
                                        <div class="title" data-swiper-parallax="-300">Slide 1</div>
                                        <div class="subtitle mb-1" data-swiper-parallax="-200">Subtitle</div>
                                        <div data-swiper-parallax="-100">
                                            <p class="font-small-2">Cake biscuit candy canes cake macaroon cheesecake gummies carrot cake. Chupa chups pastry halvah gummi bears powder. Wafer macaroon gummi bears tart soufflé chocolate cake.</p>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="title" data-swiper-parallax="-300" data-swiper-parallax-opacity="0">Slide 2
                                        </div>
                                        <div class="subtitle mb-1" data-swiper-parallax="-200">Subtitle</div>
                                        <div data-swiper-parallax="-100">
                                            <p class="font-small-2">Pie gummi bears macaroon cupcake. Dessert dragée apple pie lollipop cake gummies lemon drops chupa chups apple pie. Ice cream sugar plum sweet roll cake candy fruitcake soufflé.</p>
                                        </div>
                                    </div>
                                    <div class="swiper-slide">
                                        <div class="title" data-swiper-parallax="-300">Slide 3</div>
                                        <div class="subtitle mb-1" data-swiper-parallax="-200">Subtitle</div>
                                        <div data-swiper-parallax="-100">
                                            <p class="font-small-2">Lemon drops oat cake marzipan cheesecake sweet. Dragée chocolate bar gingerbread pudding tiramisu. Ice cream croissant chupa chups sesame snaps jujubes sesame snaps ice cream fruitcake.</p>
                                        </div>
                                    </div>
                                </div>
                                <!-- Add Pagination -->
                                <div class="swiper-pagination"></div>
                                <!-- Add Navigation -->
                                <div class="swiper-button-prev"></div>
                                <div class="swiper-button-next"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
  </div>
  
`
})

export class TourdModalContents implements OnInit {
 
  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  public swiperDefaultConfig: SwiperConfigInterface = {};
  // navigation
  public swiperNavigationConfig: SwiperConfigInterface = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  // pagination
  public swiperPaginationConfig: SwiperConfigInterface = {
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  // progress
  public swiperProgressConfig: SwiperConfigInterface = {
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  // multiple
  public swiperMultipleConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  // multi row
  public swiperMultiRowConfig: SwiperConfigInterface = {
    slidesPerView: 3,
    slidesPerColumn: 2,
    spaceBetween: 30,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  // centered slides option-1
  public swiperCenterOpt1Config: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slideToClickedSlide: true
  };

  // centered slides option-2
  public swiperCenterOpt2Config: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
  };

  // fade effect
  public swiperFadeEffectConfig: SwiperConfigInterface = {
    spaceBetween: 30,
    effect: 'fade',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  // cube effect
  public swiperCubeEffectConfig: SwiperConfigInterface = {
    effect: 'cube',
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  };

  // coverflow effect
  public swiperCoverflowEffectConfig: SwiperConfigInterface = {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  };

  // autoplay
  public swiperAutoplayConfig: SwiperConfigInterface = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  // parallax
  public swiperParallaxConfig: SwiperConfigInterface = {
    speed: 600,
    parallax: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  // lazy loading
  public swiperLazyLoadingConfig: SwiperConfigInterface = {
    // Enable lazy loading
    lazy: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };

  // Responsive Breakpoints
  public swiperResponsiveBreakpointsConfig: SwiperConfigInterface = {
    slidesPerView: 5,
    spaceBetween: 50,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      }
    }
  };




  constructor(public activeModal: NgbActiveModal) { 
    
  }

  ngOnInit(): void {
    
  }

  
}

//Interface
export interface IAlert {
  id: number;
  title: string;
  type: string;
  message: string;
}


@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})

export class Dashboard1Component implements OnInit {
  public alerts: Array<IAlert> = [];
  public alert: IAlert
  isShow = true
  private backup: Array<IAlert>;
  pickDate = new Date().setMonth(new Date().getMonth() + 2);
  datePipe = new DatePipe('en-US');
  launchDate = this.datePipe.transform(this.pickDate, 'yyyy-MM-dd');

  countdown: any;

  private _unsubscribeAll: Subject<any>;
  constructor(private appService: AppService, private cdr: ChangeDetectorRef, private router: Router, private route: ActivatedRoute,private modalService: NgbModal){
    // Set the defaults
    this.countdown = {
      weeks: '',
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
  };

  // Set the private defaults
  this._unsubscribeAll = new Subject();
    this.alert = {
      id: 1,
      title: "Success Alert",
        type: 'success',
        message: 'Well done! You successfully read this important alert message.',
    }
    this.alerts.push(
      {
        id: 1,
        title: "Success Alert",
        type: 'success',
        message: 'Well done! You successfully read this important alert message.',
      },
      {
        id: 2,
        title: "Secondary Alert",
        type: 'secondary',
        message: 'Hello! This is secondary alert - check it out.',
      },
      {
        id: 3,
        title: "Primary Alert",
        type: 'primary',
        message: 'Good Morning! Start your day with some alerts.',
      },
      {
        id: 4,
        title: "Danger Alert",
        type: 'danger',
        message: 'Oh snap! Change a few things up and submit again.',
      },
      // {
      //   id: 5,
      //   title: "Info Alert",
      //   type: 'info',
      //   message: "Heads up! This alert needs your attention, but it's not super important.",
      // },
      // {
      //   id: 6,
      //   title: "Warning Alert",
      //   type: 'warning',
      //   message: "Warning! Better check yourself, you're not looking too good.",
      // },
      // {
      //   id: 7,
      //   title: "Light Alert",
      //   type: 'light',
      //   message: 'Hello! This is light alert - check it out.',
      // },
      // {
      //   id: 8,
      //   title: "Dark Alert",
      //   type: 'dark',
      //   message: 'Hello! This is dark alert - check it out.',
      // }
    );
    this.backup = this.alerts.map((alert: IAlert) => Object.assign({}, alert));
  }
  ngOnInit(){
    const currDate = moment();
        const launchDate = moment(this.launchDate);
        let diff = launchDate.diff(currDate, 'seconds');
        this.countdown = this.calculateRemainingTime(diff);

        // Create a subscribable interval
        const countDown = interval(1000)
            .pipe(
                map(value => {
                    return diff = diff - 1;
                }),
                map(value => {
                    return this.calculateRemainingTime(value);
                })
            );

        // Subscribe to the countdown interval
        countDown
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(value => {
                this.countdown = value;
                this.cdr.detectChanges();
            });
    this.route.params.subscribe(params => {
      // this.onCustomAction(params);
      // this.params = params;
      // console.log(params)
      environment.returnUrl = this.route.snapshot['_routerState'].url
      environment.event = JSON.stringify(params)
      // console.log(environment.returnUrl+'=='+environment.event)
      // this.appService
    });
    this.openContent();
  }

  public closeAlert(alert: IAlert) {
    console.log(alert)
    let id = alert.id + 1
    console.log(id <= this.alerts.length)
    if(id <= this.alerts.length){
      this.alert.id = id
      this.alert.title = this.alerts[id-1].title
      this.alert.message = this.alerts[id-1].message
      this.alert.type = this.alerts[id-1].type
    }else{
      this.isShow = false;
    }
  }

  openContent() {
      const modalRef = this.modalService.open(TourdModalContents);
  }
  // Line area chart configuration Starts
  lineArea: Chart = {
    type: 'Line',
    data: data['lineAreaDashboard'],
    options: {
      low: 0,
      showArea: true,
      fullWidth: true,
      onlyInteger: true,
      axisY: {
        low: 0,
        scaleMinSpace: 50,
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          pointClass: 'ct-point-regular'
        })
      ],
      axisX: {
        showGrid: false
      }
    },
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(0, 201, 255, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(146, 254, 157, 1)'
        });

        defs.elem('linearGradient', {
          id: 'gradient1',
          x1: 0,
          y1: 1,
          x2: 1,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': 'rgba(132, 60, 247, 1)'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': 'rgba(56, 184, 242, 1)'
        });
      },
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    },
  };
  // Line area chart configuration Ends

  // Stacked Bar chart configuration Starts
  Stackbarchart: Chart = {
    type: 'Bar',
    data: data['Stackbarchart'],
    options: {
      stackBars: true,
      fullWidth: true,
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      chartPadding: 30
    },
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'linear',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#7441DB'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#C89CFF'
        });
      },
      draw(data: any): void {
        if (data.type === 'bar') {
          data.element.attr({
            style: 'stroke-width: 5px',
            x1: data.x1 + 0.001
          });

        }
        else if (data.type === 'label') {
          data.element.attr({
            y: 270
          })
        }
      }
    },
  };
  // Stacked Bar chart configuration Ends

  // Line area chart 2 configuration Starts
  lineArea2: Chart = {
    type: 'Line',
    data: data['lineArea2'],
    options: {
      showArea: true,
      fullWidth: true,
      lineSmooth: Chartist.Interpolation.none(),
      axisX: {
        showGrid: false,
      },
      axisY: {
        low: 0,
        scaleMinSpace: 50
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          pointClass: 'ct-point-circle'
        })
      ],
    },
    responsiveOptions: [
      ['screen and (max-width: 640px) and (min-width: 381px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 2 === 0 ? value : null;
          }
        }
      }],
      ['screen and (max-width: 380px)', {
        axisX: {
          labelInterpolationFnc: function (value, index) {
            return index % 3 === 0 ? value : null;
          }
        }
      }]
    ],
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient2',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-opacity': '0.2',
          'stop-color': 'transparent'
        }).parent().elem('stop', {
          offset: 1,
          'stop-opacity': '0.2',
          'stop-color': '#60AFF0'
        });

        defs.elem('linearGradient', {
          id: 'gradient3',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0.3,
          'stop-opacity': '0.2',
          'stop-color': 'transparent'
        }).parent().elem('stop', {
          offset: 1,
          'stop-opacity': '0.2',
          'stop-color': '#6CD975'
        });
      },
      draw(data: any): void {
        var circleRadius = 4;
        if (data.type === 'point') {

          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-circle'
          });
          data.element.replace(circle);
        }
        else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width)
          data.element.attr({ x: data.element.attr('x') - dX })
        }
      }
    },
  };
  // Line area chart 2 configuration Ends

  // Line chart configuration Starts
  lineChart: Chart = {
    type: 'Line', data: data['LineDashboard'],
    options: {
      axisX: {
        showGrid: false
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        low: 0,
        high: 100,
        offset: 0,
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-circle'
        })
      ],
      fullWidth: true,
      offset: 0,
    },
    events: {
      draw(data: any): void {
        var circleRadius = 4;
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: circleRadius,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-circle'
          });

          data.element.replace(circle);
        }
        else if (data.type === 'label') {
          // adjust label position for rotation
          const dX = data.width / 2 + (30 - data.width)
          data.element.attr({ x: data.element.attr('x') - dX })
        }
      }
    },

  };
  // Line chart configuration Ends

  // Donut chart configuration Starts
  DonutChart: Chart = {
    type: 'Pie',
    data: data['donutDashboard'],
    options: {
      donut: true,
      startAngle: 0,
      labelInterpolationFnc: function (value) {
        var total = data['donutDashboard'].series.reduce(function (prev, series) {
          return prev + series.value;
        }, 0);
        return total + '%';
      }
    },
    events: {
      draw(data: any): void {
        if (data.type === 'label') {
          if (data.index === 0) {
            data.element.attr({
              dx: data.element.root().width() / 2,
              dy: data.element.root().height() / 2
            });
          } else {
            data.element.remove();
          }
        }

      }
    }
  };
  // Donut chart configuration Ends

  //  Bar chart configuration Starts
  BarChart: Chart = {
    type: 'Bar', data: data['DashboardBar'], options: {
      axisX: {
        showGrid: false,
      },
      axisY: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      low: 0,
      high: 60, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    },
    responsiveOptions: [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ],
    events: {
      created(data: any): void {
        var defs = data.svg.elem('defs');
        defs.elem('linearGradient', {
          id: 'gradient4',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#8E1A38'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#FAA750'
        });
        defs.elem('linearGradient', {
          id: 'gradient5',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#1750A5'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#40C057'
        });

        defs.elem('linearGradient', {
          id: 'gradient6',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#3B1C93'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#60AFF0'
        });
        defs.elem('linearGradient', {
          id: 'gradient7',
          x1: 0,
          y1: 1,
          x2: 0,
          y2: 0
        }).elem('stop', {
          offset: 0,
          'stop-color': '#562DB7'
        }).parent().elem('stop', {
          offset: 1,
          'stop-color': '#F55252'
        });

      },
      draw(data: any): void {
        var barHorizontalCenter, barVerticalCenter, label, value;
        if (data.type === 'bar') {

          data.element.attr({
            y1: 195,
            x1: data.x1 + 0.001
          });

        }
      }
    },

  };
  // Bar chart configuration Ends

  // line chart configuration Starts
  WidgetlineChart: Chart = {
    type: 'Line', data: data['Dashboard1_WidgetlineChart'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-regular'
        })
      ],
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true
    },
    events: {
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    }
  };
  // Line chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart1: Chart = {
      type: 'Line', data: data['Dashboard1_WidgetlineChart1'],
      options: {
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisY: {
          showGrid: false,
          low: 40,
          showLabel: false,
          offset: 0
        },
        plugins: [
          ChartistTooltip({
            appendToBody: true,
            currency: '$',
            pointClass: 'ct-point-regular'
          })
        ],
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        fullWidth: true
      },
      events: {
        draw(data: any): void {
          if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: 4,
              'ct:value': data.value.y,
              'ct:meta': data.meta,
              style: 'pointer-events: all !important',
              class: 'ct-point-regular'
            });
            data.element.replace(circle);
          }
        }
      }
    };
    // Line chart configuration Ends

      // line chart configuration Starts
  WidgetlineChart2: Chart = {
    type: 'Line', data: data['Dashboard1_WidgetlineChart2'],
    options: {
      axisX: {
        showGrid: false,
        showLabel: false,
        offset: 0
      },
      axisY: {
        showGrid: false,
        low: 40,
        showLabel: false,
        offset: 0
      },
      plugins: [
        ChartistTooltip({
          appendToBody: true,
          currency: '$',
          pointClass: 'ct-point-regular'
        })
      ],
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      fullWidth: true
    },
    events: {
      draw(data: any): void {
        if (data.type === 'point') {
          var circle = new Chartist.Svg('circle', {
            cx: data.x,
            cy: data.y,
            r: 4,
            'ct:value': data.value.y,
            'ct:meta': data.meta,
            style: 'pointer-events: all !important',
            class: 'ct-point-regular'
          });
          data.element.replace(circle);
        }
      }
    }
  };
  // Line chart configuration Ends

    // line chart configuration Starts
    WidgetlineChart3: Chart = {
      type: 'Line', data: data['Dashboard1_WidgetlineChart3'],
      options: {
        axisX: {
          showGrid: false,
          showLabel: false,
          offset: 0
        },
        axisY: {
          showGrid: false,
          low: 40,
          showLabel: false,
          offset: 0
        },
        plugins: [
          ChartistTooltip({
            appendToBody: true,
            currency: '$',
            pointClass: 'ct-point-regular'
          })
        ],
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        fullWidth: true
      },
      events: {
        draw(data: any): void {
          if (data.type === 'point') {
            var circle = new Chartist.Svg('circle', {
              cx: data.x,
              cy: data.y,
              r: 4,
              'ct:value': data.value.y,
              'ct:meta': data.meta,
              style: 'pointer-events: all !important',
              class: 'ct-point-regular'
            });
            data.element.replace(circle);
          }
        }
      }
    };
    // Line chart configuration Ends

  onResized(event: any) {
    setTimeout(() => {
      this.fireRefreshEventOnWindow();
    }, 300);
  }

  fireRefreshEventOnWindow = function () {
    var evt = document.createEvent("HTMLEvents");
    evt.initEvent("resize", true, false);
    window.dispatchEvent(evt);
  };
  ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

  private calculateRemainingTime(seconds): any {
    const timeLeft = moment.duration(seconds, 'seconds');

    return {
        weeks: timeLeft.asWeeks().toFixed(0),
        days: timeLeft.asDays().toFixed(0),
        hours: timeLeft.hours(),
        minutes: timeLeft.minutes(),
        seconds: timeLeft.seconds()
    };
}  

}
