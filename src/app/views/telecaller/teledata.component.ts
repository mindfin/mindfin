import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { SuperadminService } from '../../superadmin.service';
import { CommonService } from '../../common.service';


export interface User {
name: string;
  }
@Component({
  templateUrl:'./teledata.component.html',
})

export class TeledataComponent {
myControl = new FormControl();
val:any=[];
selectedFile:File = null;
selectedFile1:File = null;
selectedFile2:File = null;

constructor(private commonservice: CommonService){}

// options: User[] = this.val;
// filteredOptions: Observable<User[]>;
model:any={};
fetchData:any;
 fetchDataa:any;
 fetchData1:any;
 value1:any;
dob:any;
teleid:any;


ngOnInit() {
  this.commonservice.getuserlist().subscribe(res=>{
    console.log(res);
    this.fetchData = res;
  });
 
  this.commonservice.getloanlist().subscribe(res=>{
    console.log(res);
    this.fetchDataa = res;
  });
  this.commonservice.getadminexecutivelist().subscribe(res=>{
    console.log(res);
    this.fetchData1=res;
  });
  this.teleid = localStorage.getItem("id");
console.log(this.teleid);
}
// orgValueChange(date){
//   //console.log('');
//   this.dob=date;
// }


displayFn(user?: User): string | undefined {
  return user ? user.name : undefined;
  
}


submitForm(value){
console.log(value);
this.value1={value:value,teleid:this.teleid};

     this.commonservice.addenquiry(this.value1);
    //  .subscribe(res=>{
    //   window.location.reload();
    // })

}
refresh(): void {
    window.location.reload();
  }
}