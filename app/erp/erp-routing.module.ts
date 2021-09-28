import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ERP } from './erp.component';
import { LoginPageComponent } from './login/login-page.component';
//import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '', 
    component: ERP,
    data: {
        title: 'Shivit ERP'
    },
    children: [
      {
        path: '',
        component: LoginPageComponent,
        data: {
          title: 'Login'
        }
      },
            
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ERPRoutingModule { }
