import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { TeledataComponent } from './teledata.component';
import { TeledatalistComponent } from './teledatalist.component';





const routes: Routes = [
  
     
  {
    path: 'addenquiry',
    component: TeledataComponent,
    data: {
      title: 'Add Enquiry'
    }
  },
  {
    path:'teledatalist',
    component:TeledatalistComponent,
    data:{
      title:' Enquiry Data List'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TelecallerRoutingModule { }
