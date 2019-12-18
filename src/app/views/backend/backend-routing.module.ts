import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { BackendComponent } from './backend.component';
import { BackendViewComponent } from './backendview.component';
import { BackendBankapplyComponent } from './backendbankapply.component';
import { ViewBankStatusComponent } from './viewbankstatus.component';
import { StatusComponent } from './status.component';
import { EditBackendComponent } from './editbackend.component';
import { CheckCaseComponent } from './checkcase.component';

const routes: Routes = [
  {
    path: 'document',
    component: BackendComponent,
    data: {
      title: 'upload customer document'
    }
  },
  {
    path: 'viewdocument',
    component: BackendViewComponent,
    data: {
      title: 'view customer document '
    }
  },
  {
    path: 'applybank/:id',
    component: BackendBankapplyComponent,
    data: {
      title: 'add bank to customer'
    }
  },
  {
    path: 'viewbank',
    component: ViewBankStatusComponent,
    data: {
      title: 'view bank to customer'
    }
  },
  {
    path: 'checkcase',
    component: CheckCaseComponent,
    data: {
      title: 'Check Case'
    }
  },
  {
    path: 'status/:id',
    component: StatusComponent,
    data: {
      title: 'add bank to customer'
    }
  },
  {
    path: 'edit/:id',
    component: EditBackendComponent,
    data: {
      title: 'Edit customer Document'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule {}
