import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';

import { MemberloginComponent } from './views/login/memberlogin.component';

import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'member/login',
    component: MemberloginComponent,
    data: {
      title: 'Login Page'
    }
  },
  // {
  //   path: 'register',
  //   component: RegisterComponent,
  //   data: {
  //     title: 'Register Page'
  //   }
  // },
  // {
  //   path: 'superadmin/login',
  //   component: SuperadminComponent,
  //   data: {
  //     title: 'Login Page'
  //   }
  // },

  // {
  //   path: 'product',
  //   component: ProductComponent,
  //   data: {
  //     title: 'Product Page'
  //   }
  // },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      // {
      //   path: 'base',
      //   loadChildren: './views/base/base.module#BaseModule'
      // },
      // {
      //   path: 'buttons',
      //   loadChildren: './views/buttons/buttons.module#ButtonsModule'
      // },
      // {
      //   path: 'project',
      //   canActivate:[AuthGuard],
      //   loadChildren: './views/project/project.module#ProjectModule'
      // },
    //   {
    //     path: 'charts',
    //     loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
    //   },
      {
        path: 'dashboard',
        canActivate:[AuthGuard],
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
    //   {
    //     path: 'icons',
    //     loadChildren: './views/icons/icons.module#IconsModule'
    //   },
    //   {
    //     path: 'notifications',
    //     loadChildren: './views/notifications/notifications.module#NotificationsModule'
    //   },
    //   {
    //     path: 'theme',
    //     loadChildren: './views/theme/theme.module#ThemeModule'
    //   },
    //   {
    //     path: 'widgets',
    //     loadChildren: './views/widgets/widgets.module#WidgetsModule'
    //   },
    //   {
    //     path: 'product',
    //     loadChildren: './views/product/product.module#ProductModule'
    //   }
      // {
      //   path: 'receipt',
      //   canActivate:[AuthGuard],
      //   loadChildren: './views/receipt/receipt.module#ReceiptModule'
      // },
     {
        path: 'addadmin',
        canActivate:[AuthGuard],
        loadChildren: './views/addadmin/addadmin.module#AddadminModule'
      },
      {
        path: 'member',
        canActivate:[AuthGuard],
        loadChildren: './views/member/member.module#MemberModule'
      },
      {
        path: 'members',
        canActivate:[AuthGuard],
        loadChildren: './views/members/members.module#MembersModule'
      },
      {
        path: 'account',
        canActivate:[AuthGuard],
        loadChildren: './views/account/account.module#AccountModule'
      },
      {
        path: 'backend',
        canActivate:[AuthGuard],
        loadChildren: './views/backend/backend.module#BackendModule'
      },
      {
        path: 'loginoperation',
        canActivate:[AuthGuard],
        loadChildren: './views/loginoperation/loginoperation.module#LoginoperationModule'
      },
      {
        path: 'reports',
        canActivate:[AuthGuard],
        loadChildren: './views/reports/reports.module#ReportsModule'
      },
      {
        path: 'executives',
        canActivate:[AuthGuard],
        loadChildren: './views/executives/executives.module#ExecutivesModule'
      },
      {
        path: 'telcaller',
        canActivate:[AuthGuard],
        loadChildren: './views/telecaller/telecaller.module#TelecallerModule'
      },
      {
        path: 'documentcam',
        canActivate:[AuthGuard],
        loadChildren: './views/documentcam/documentcam.module#DocumentCamModule'
      },
      // {
      //   path: 'productlist',
      //   loadChildren: './views/productlist/productlist.module#ProductlistModule'
      // },
  
      // {
      //   path:'viewreceipt/:id',
      //   canActivate:[AuthGuard],
      //   component:ViewreceiptComponent,
      //   data:{
      //     title:'Receipt'
      //   }
      // },
      // {
      //   path: 'affidivate/:id',
      //   canActivate:[AuthGuard],
      //   component: AffidivateComponent,
      //   data: {
      //     title: 'Affidivate Information'
      //   }
      // },
      // {
      //   path: 'certificate/:id',
      //   canActivate:[AuthGuard],
      //   component: CertificateComponent,
      //   data: {
      //     title: 'Certificate Information'
      //   }
      // },
      // {
      //   path: 'president',
      //   canActivate:[AuthGuard],
      //   component: PresidentComponent,
      //   data: {
      //     title: 'President Information'
      //   }
      // },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
