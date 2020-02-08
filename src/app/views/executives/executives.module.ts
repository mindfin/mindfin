import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule, MatNativeDateModule, MatInputModule,MatFormFieldModule, MatPaginatorModule, MatSortModule, MatTableModule, MatProgressSpinnerModule, MatBadgeModule, MatButtonModule, MatButtonToggleModule, MatDialogModule} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table'
import { ExecutiveComponent } from './executive.component';
import { ExeWiseTeledatalistComponent } from './exewiseteledatalist.component';
import { ExecutivesRoutingModule } from './executives-routing.module';
import { ExeTeledatalistComponent } from './exeteledatalist.component';
import { TeledataEditComponent } from './teledataedit.component';
import { DailyRoutineComponent } from './dailyroutine.component';
import { DailyRoutineviewComponent } from './viewdailyroutine.component';
import { DailyRoutineEditComponent } from './dailyroutineedit.component';
import { CustomerComponent, EdialogContent } from './customer.component';
import { ExecutivetopuplistComponent } from './executivetopuplist.component';
import { AdminTeledatalistComponent, AssignDialogContent } from './adminteledatalist.component';
import { AdminTeledataEditComponent } from './adminteledataedit.component';
import { AssignExeComponent } from './assignexe.component';
import { AdminTeledataRejectlistComponent } from './adminteledatarejectlist.component';
import { AdminTeledataDisburslistComponent } from './adminteledatadisbursedlist.component';
import { AdminTeledataApprovelistComponent } from './adminteledataapprovelist.component';
import { AdminTeledataWIPlistComponent } from './adminteledatawiplist.component';
import { AdminTeledataLoginlistComponent } from './adminteledataloginlist.component';
import { AdminTeledataContactedlistComponent } from './adminteledatacontactedlist.component';
import { AdminTeledataFilePickedlistComponent } from './adminteledatafilepickedlist.component';
import { AdminTeledataNotOpenedlistComponent } from './adminteledatanotopenlist.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';





@NgModule({
  imports: [
    
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
    ExecutivesRoutingModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [ExecutiveComponent,ExeWiseTeledatalistComponent,ExeTeledatalistComponent,
    TeledataEditComponent,DailyRoutineComponent,DailyRoutineviewComponent,
    DailyRoutineEditComponent,CustomerComponent,EdialogContent,ExecutivetopuplistComponent,
    AdminTeledatalistComponent,AdminTeledataEditComponent,AssignDialogContent,AssignExeComponent,
    AdminTeledataRejectlistComponent,AdminTeledataDisburslistComponent,AdminTeledataApprovelistComponent,
    AdminTeledataWIPlistComponent,AdminTeledataLoginlistComponent,AdminTeledataContactedlistComponent,
    AdminTeledataFilePickedlistComponent,AdminTeledataNotOpenedlistComponent
   ],

  entryComponents: [CustomerComponent,EdialogContent,AssignDialogContent
  ]
})
export class ExecutivesModule { }
