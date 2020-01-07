import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { LoginReportComponent } from './loginreport.component';
import { BackendReportComponent } from './backendreport.component';
import { DataentryReportComponent } from './dataentryreport.component';
import { ExecutiveRoutineComponent } from './executiveroutine.component';
import { LoginRoutineComponent } from './loginroutine.component';
import { DatatelelistComponent } from './datatelelist.component';
import { BackendCustomerReportComponent } from './backendcustomerreport.component';
import { BackendBankReportComponent } from './backendbankreport.component';
import { WebsiteLeadReportComponent } from './websitelead.component';




const routes: Routes = [

  
      {

        path: 'logreport',
        component: LoginReportComponent,
        data: {
          title: 'Login Report'
        }
      },

      {
        path: 'backreport',
        component: BackendReportComponent,
        data: {
          title: 'Backend Report'
        }
      },
      {
        path: 'dataentryreport',
        component: DataentryReportComponent,
        data: {
          title: 'Dataentry Report'
        }
      },
      {
        path:'exeroutine',
        component:ExecutiveRoutineComponent,
        data:{
          title:'Executive Daily Routine'
        }
      },
      {
        path:'logroutine',
        component:LoginRoutineComponent,
        data:{
          title:'Login Executive Daily Routine'
        }
      },
      
      {
        path:'datatelelist',
        component:DatatelelistComponent,
        data:{
          title:'Enquired Data List'
        }
      },
      {
        path:'backendcustomerreport',
        component:BackendCustomerReportComponent,
        data:{
          title:'Backend Customer Data List'
        }
      },
      {
        path:'backendbankreport',
        component:BackendBankReportComponent,
        data:{
          title:'Backend Add Bank List'
        }
      },
      {
        path:'websitelead',
        component:WebsiteLeadReportComponent,
        data:{
          title:'Website Lead'
        }
      },

    ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
