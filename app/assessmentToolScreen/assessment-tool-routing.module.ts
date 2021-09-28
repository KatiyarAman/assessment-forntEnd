import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentScreenWrapperComponent } from './assessment-screens-wrapper/assessment-screen-wrapper.component';


const routes: Routes = [
    { path: '', component: AssessmentScreenWrapperComponent }
];


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AssessmentToolRoutingModule {

}