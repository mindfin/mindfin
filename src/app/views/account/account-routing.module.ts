import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

// import { MembersComponent } from './omponent';
import { SubvendorComponent} from './subvendor.component';
import { CustomerlistComponent } from './customerlist.component';
import { DisburselistComponent } from './disburselist.component';
import { ReloanComponent } from './reloan.component';
import { ConveniencslistComponent } from './viewconve.component';
import { LeaveApplistComponent } from './viewleaveapp.component';
import { SuggestionlistComponent } from './viewsugge.component';

// import { BankComponent } from './bank.component';





const routes: Routes = [
  {
   
    path: '',
    data: {
      title: 'Account'
    },
    children:[
      {
        path:'subvendor',
        component:SubvendorComponent,
        data:{
          title:'Sub Vendor'
        }
      },
      {
        path:'customerlist/:id',
        component:CustomerlistComponent,
        data:{
          title:'Customer list'
        }
      },
  
      {
        path:'disburselist',
        component:DisburselistComponent,
        data:{
          title:'Disburse list'
        }
      },
 
      {
        path:'reloan/:id',
        component:ReloanComponent,
        data:{
          title:'Apply Loan'
        }
      },
            {
        path:'conveniencs',
        component:ConveniencslistComponent,
        data:{
          title:'Conveniencs'
        }
      },
      {
        path:'leaveapp',
        component:LeaveApplistComponent,
        data:{
          title:'Leave Applications'
        }
      },
      {
        path:'suggestion',
        component:SuggestionlistComponent,
        data:{
          title:'Suggestions'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {}
