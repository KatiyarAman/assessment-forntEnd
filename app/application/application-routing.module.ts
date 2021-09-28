import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssessmentTestComponent } from 'app/pages/portal-pages/assessment-test/assessment-test.component';

import { ApplicationComponent } from './application.component';
import { CustomCardListComponent } from './customCardList/custom-card-list.component';
import { CustomDataTable } from './customDataTable/custom-dataTable.component';
import { CustomFormDesign } from './customFormDesign/custom-formDesign.component';
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { Dashboard4Component } from './dashboard4/dashboard4.component';
//import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '', 
    component: ApplicationComponent,
    data: {
        title: 'Index'
    },
    children: [
      {
        path: '',
        component: Dashboard3Component,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'dashboard4',
        component: Dashboard4Component,
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'customDataTable',
        component: CustomDataTable,
        data: {
          title: 'List'
        }
      },
      {
        path: 'customForm',
        component: CustomFormDesign,
        data: {
          title: 'Form'
        }
      },
      {
        path: 'customCardList',
        component: CustomCardListComponent,
        data: {
          title: 'List'
        }
      }    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule { }
