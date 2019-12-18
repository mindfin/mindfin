import { NgModule } from '@angular/core';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { LoginOperationComponent } from './loginoperation.component';
import { LoginDailyRoutineComponent } from './logindailyroutine.component';
import { LoginStatusComponent } from './loginstatus.component';
import { AddLogexeSatausComponent } from './addlogexestatus.component';
import { LoginOperationViewComponent } from './loginoperationview.component';
import { LoginDailyRoutineviewComponent } from './loginviewdailyroutine.component';
import { LoginDailyRoutineEditComponent } from './logindailyroutineedit.component';




const routes: Routes = [
  {
    path: 'loginoperation',
    component: LoginOperationComponent,
    data: {
      title: 'Login Operatiom'
    }
  },
  {
    path: 'logindailyroutine',
    component: LoginDailyRoutineComponent,
    data: {
      title: 'Login Daily Routine'
    }
  },
  {
    path: 'loginstatus/:id',
    component: LoginStatusComponent,
    data: {
      title: 'login sent form'
    }
  },
  {
    path: 'sentexelogedit/:id',
    component: AddLogexeSatausComponent,
    data: {
      title: 'Sent Login Executive'
    }
  },
  {
    path: 'loginview',
    component: LoginOperationViewComponent,
    data: {
      title: 'VIEW LOGIN'
    }
  },
  {
    path: 'logindailyview',
    component: LoginDailyRoutineviewComponent,
    data: {
      title: 'VIEW DAILY ROUTINE LOGIN '
    }
  },
  {
    path: 'logineditroutine/:id',
    component: LoginDailyRoutineEditComponent,
    data: {
      title: 'Sent Login Executive'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginoperationRoutingModule { }
