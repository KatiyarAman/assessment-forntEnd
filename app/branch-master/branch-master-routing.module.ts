import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from "./index/index.component";
import { BranchMasterComponent } from './branch-master.component';
import { FormComponent } from './form/form.component';
//import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '', 
    component: BranchMasterComponent,
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
export class BranchMasterRoutingModule { }
