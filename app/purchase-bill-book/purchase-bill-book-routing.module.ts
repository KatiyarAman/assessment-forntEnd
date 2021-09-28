import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from "./index/index.component";
import { FormComponent } from './form/form.component';
import { PurchaseBillBookComponent } from './purchase-bill-book.component';
//import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '', 
    component: PurchaseBillBookComponent,
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
export class PurchaseBillBookRoutingModule { }
