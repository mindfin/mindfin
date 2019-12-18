import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestComponent } from './test.component';

const routes: Routes = [

  {
    path: 'addaccount',
    component: TestComponent,
    data: {
      title: 'Testing Pdf Upload'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentCamRoutingModule { }
