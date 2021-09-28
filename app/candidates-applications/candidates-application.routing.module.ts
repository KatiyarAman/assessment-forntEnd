import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from "./index/index.component";
import { FormComponent } from './form/form.component';
import { CandidateApplicationComponent } from './candidates-application.component';
//import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '', 
    component: CandidateApplicationComponent,
    data: {
        title: 'Index'
    },
    children: [
      {
        path: '',
        component: IndexComponent,
        data: {
          title: 'Index'
        }
      },
      {
        path: 'form',
        component: FormComponent,
        data: {
          title: 'Form'
        }
      },
            
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CandidatesApplicationRoutingModule { }
