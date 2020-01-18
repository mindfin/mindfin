import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications'
    },
    children: [
      // {
      //   path: 'alerts',
      //   component:,
      //   data: {
      //     title: 'Alerts'
      //   }
      // },
      // {
      //   path: 'badges',
      //   component: ,
      //   data: {
      //     title: 'Badges'
      //   }
      // },
      // {
      //   path: 'modals',
      //   component: ,
      //   data: {
      //     title: 'Modals'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule {}
