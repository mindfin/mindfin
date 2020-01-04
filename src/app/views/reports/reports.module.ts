import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule, MatNativeDateModule, MatInputModule,MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule, MatProgressSpinnerModule, MatBadgeModule, MatButtonModule, MatButtonToggleModule, MatDialogModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ReportsRoutingModule } from './reports-routing.module';
import { LoginReportComponent } from './loginreport.component';
import { BackendReportComponent } from './backendreport.component';
import { DataentryReportComponent } from './dataentryreport.component';
import { ExecutiveRoutineComponent } from './executiveroutine.component';
import { LoginRoutineComponent } from './loginroutine.component';
import { DatatelelistComponent } from './datatelelist.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BackendStatusReportComponent } from './backendstatusreport.component';
import { BackendBankReportComponent } from './backendbankreport.component';
import { BackendCustomerReportComponent } from './backendcustomerreport.component';




@NgModule({
  imports: [
    ReportsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   CommonModule,
    ChartsModule,
    BsDropdownModule,
    ReactiveFormsModule,
   CommonModule,
    ChartsModule,
    BsDropdownModule,
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
    MatTableModule,
    MatDialogModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()

  ],
  declarations: [LoginReportComponent,BackendReportComponent,DataentryReportComponent
    ,ExecutiveRoutineComponent,LoginRoutineComponent,DatatelelistComponent,BackendStatusReportComponent,
    BackendBankReportComponent,BackendCustomerReportComponent ],
  entryComponents: []
})
export class ReportsModule { }
