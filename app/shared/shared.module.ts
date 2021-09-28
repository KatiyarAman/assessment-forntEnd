import { NgModule } from '@angular/core';
import { CommonModule, Location } from "@angular/common";
import { NavigationStart, Router, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ClickOutsideModule } from 'ng-click-outside';

import { AutocompleteModule } from './components/autocomplete/autocomplete.module';
import { PipeModule } from 'app/shared/pipes/pipe.module';

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from "./vertical-menu/vertical-menu.component";
import { CustomizerComponent } from './customizer/customizer.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { AccountSettingsComponent } from './settings-sidebar/settings-sidebar.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { TopMenuDirective } from './directives/topmenu.directive';
import { TopMenuLinkDirective } from './directives/topmenu-link.directive';
import { TopMenuDropdownDirective } from './directives/topmenu-dropdown.directive';
import { TopMenuAnchorToggleDirective } from './directives/topmenu-anchor-toggle.directive';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChartistModule } from 'ng-chartist';
import { AgmCoreModule } from '@agm/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ExpandMenu, ExpandSubMenu } from './settings-sidebar/settings-sidebar.directive';
import { PromptComponent } from './prompt/prompt.component';
import { SocialShareButtons } from './components/social-share-buttons/social-share-buttons.component'
import { TruncatePipe } from './pipes/truncate.pipe';
import { NgbdModalShare } from './ngbd-modal-share/ngbd-modal-share.component';
import { NgxSpinner } from 'ngx-spinner/lib/ngx-spinner.enum';
import { ModalVideoPlayerComponent } from './modal-video-player/modal-video-player.component';
import { CandidateCommentPopup } from './candidate-comment-popup/candidate-comment-popup.component';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        AccountSettingsComponent,
        ToggleFullscreenDirective,
        ExpandMenu,
        ExpandSubMenu,
        SidebarDirective,
        TopMenuDirective,
        NgbModule,
        TranslateModule,
        NgxSpinnerModule,        
        TruncatePipe,
        SocialShareButtons,
        ModalVideoPlayerComponent,
        CandidateCommentPopup
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        TranslateModule,
        FormsModule,
        OverlayModule,
        ReactiveFormsModule ,
        PerfectScrollbarModule,
        ClickOutsideModule,
        AutocompleteModule,
        PipeModule,
        ChartistModule,
        AgmCoreModule,
        NgSelectModule,
        SwiperModule,
        NgxDatatableModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        AccountSettingsComponent,
        ToggleFullscreenDirective,
        SidebarLinkDirective,
        SidebarDropdownDirective,
        SidebarAnchorToggleDirective,
        SidebarDirective,
        ExpandMenu,
        ExpandSubMenu,
        TopMenuLinkDirective,
        TopMenuDropdownDirective,
        TopMenuAnchorToggleDirective,
        TopMenuDirective,
        PromptComponent,        
        TruncatePipe,
        SocialShareButtons,
        NgbdModalShare,
        ModalVideoPlayerComponent,
        CandidateCommentPopup,
    ]
})
export class SharedModule { 
   
}
