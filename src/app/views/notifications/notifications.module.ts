import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatNativeDateModule, MatDatepickerModule, MatFormFieldModule, MatBadgeModule, MatButtonModule, MatButtonToggleModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ProfileSettingComponent } from './profilesettings.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { NgxPrintModule } from 'ngx-print';
import { AddNotificationComponent } from './addnotification.component';
import { AssignToDoComponent, CreateToDoDialogContent } from './assigntodo.component';
import { ViewNotificationComponent, DeleteNotificationDialogContent } from './viewnotification.component';
import { EmpNotificationComponent } from './empnotification.component';
import { SeenByComponent } from './seenby_dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { EventCalendarComponent } from './eventcalendar.component';
import { DemoUtilsModule } from '../demo-utils/module';

@NgModule({
  imports: [
    CommonModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatButtonModule,
    MatButtonToggleModule,
    CdkTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    CommonModule,
    NotificationsRoutingModule,
    CollapseModule,
    TabsModule,
    NgxPrintModule,
    BsDatepickerModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    DemoUtilsModule
  ],
  declarations: [ProfileSettingComponent,AddNotificationComponent,AssignToDoComponent,ViewNotificationComponent,
    EmpNotificationComponent,DeleteNotificationDialogContent,SeenByComponent,CreateToDoDialogContent,
    EventCalendarComponent],
    entryComponents: [DeleteNotificationDialogContent,CreateToDoDialogContent
    ]
})
export class NotificationsModule { }
