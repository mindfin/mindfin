import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import {BackendRoutingModule } from './backend-routing.module';
import { CommonModule } from '@angular/common';
import { BackendComponent } from './backend.component';
import { BackendViewComponent, ViewDialogContent } from './backendview.component';
import {MatDatepickerModule, MatNativeDateModule, MatInputModule,MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule, MatProgressSpinnerModule, MatBadgeModule, MatButtonModule, MatButtonToggleModule, MatDialogModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { BackendBankapplyComponent } from './backendbankapply.component';
import { ViewBankStatusComponent } from './viewbankstatus.component';
import { StatusComponent, EditDialogContent } from './status.component';
import { EditBackendComponent } from './editbackend.component';
import { CheckCaseComponent } from './checkcase.component';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
   CommonModule,
    BackendRoutingModule,
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
    ModalModule.forRoot()
  ],
  declarations: [ BackendComponent,BackendViewComponent,ViewDialogContent,
    BackendBankapplyComponent, ViewBankStatusComponent,StatusComponent,EditBackendComponent,
    EditDialogContent,CheckCaseComponent

  ],
  entryComponents: [ViewDialogContent,EditDialogContent
  ]
})
export class BackendModule { }
