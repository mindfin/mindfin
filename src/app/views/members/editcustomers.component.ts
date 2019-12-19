import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SuperadminService } from '../../superadmin.service';
import { CommonService } from '../../common.service';


export interface User {
name: string;
  }
@Component({
  templateUrl:'./editcustomers.component.html',
})

export class EditcustomersComponent {
myControl = new FormControl();
val:any=[];
selectedFile:File = null;
selectedFile1:File = null;
selectedFile2:File = null;
tempval:any;
array:any=[];
array1:any=[];
constructor(private route: ActivatedRoute,private router:Router,private service:SuperadminService,private commonservice: CommonService){}

// options: User[] = this.val;
// filteredOptions: Observable<User[]>;
model:any={};
fetchData:any;
fetchData1:any;
fetchData2:any;
fetchData5:any;
fetchData6:any;

dob:any;
idvalue;
tempval1:any;
tempval2:any;
vvv:any;


ngOnInit() {
  this.commonservice.getcocustomer(this.idvalue ).subscribe(res=>{
    console.log(res);
    this.tempval2=res;
    });
  this.commonservice.getloanlist().subscribe(res=>{
    console.log(res);
    this.fetchData = res;
  });
  this.commonservice.getemployeetypelist().subscribe(res=>{
    this.fetchData6=res;
  });

  this.commonservice.getexecutivelist().subscribe(res=>{
    this.fetchData1 = [];
    console.log(res);
    for(var i=0;i<Object.keys(res).length;i++){
      if(res[i].iduser!=null){
      this.fetchData1.push(res[i]);
      }
    }
  });

  this.route.params.subscribe(params=>{
    console.log(params['id']);
    this.idvalue = params['id'];
    this.commonservice.editcust(params['id']).subscribe(res => {
      console.log(res);
      this.model=res[0];
    });
  })
  this.commonservice.getvendornames()
  .subscribe(res=>{
    // console.log(this.array);
    console.log(res);
    this.fetchData5=res;
  })
  // this.route.params.subscribe(params=>{
  //   console.log(params['id']);
  //   this.idvalue = params['id'];
  //   this.commonservice.getextradetails(params['id']).subscribe(res => {
  //     console.log(res);
  //     this.tempval=res
  //   });
  // })

  this.commonservice.getbanklist().subscribe(res=>{
    console.log(res);
    this.fetchData2 = res;
  });

}


removevalue(pro,index)
  {
    console.log(index);
    this.array.splice(index,1);

  }
  editcocust(pro){
    console.log(pro);
  this.commonservice.editcocust(pro)
  .subscribe(res=>{
    // console.log(res);
    this.refresh();
  })
  }
orgValueChange(date){
  //console.log('');
  this.dob=date;
}


displayFn(user?: User): string | undefined {
  return user ? user.name : undefined;
  
}

onFileSelected(event){
    console.log(event);
    this.selectedFile = <File>event.target.files[0];
  }
  onFileSelected1(event){
    console.log(event);
    this.selectedFile1 = <File>event.target.files[0];
  }
  onFileSelected2(event){
    console.log(event);
    this.selectedFile2 = <File>event.target.files[0];
  }
submitForm(value){
console.log(value);
this.vvv = {
  arr: this.array1,value:value,id:this.idvalue
}
this.commonservice.customerupdate(this.vvv).subscribe(res=>{
  this.router.navigate(["/members/viewcustomer"]);
})
  

}


refresh(){
    window.location.reload();
  }
  checknumber(obj){
    console.log(obj);
    // var idno=obj.idno;
  this.commonservice.checknumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.status = res['status']; 
     
  });
  }
  checkaadharnumber(obj){
    console.log(obj);
    // var idno=obj.idno;
  this.commonservice.checkaadharnumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.aadharstatus = res['status']; 
     
  });
  }
  checkpannumber(obj){
    console.log(obj);
  this.commonservice.checkpannumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.panstatus = res['status']; 
     
  });
  }
  checkdlnumber(obj){
    console.log(obj);
  this.commonservice.checkdlnumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.dlstatus = res['status']; 
     
  });
  }
  checkvoternumber(obj){
    console.log(obj);
  this.commonservice.checkvoternumber(obj).subscribe(res=>{
  console.log(res['status']);
  this.model.voterstatus = res['status']; 
     
  });
  }
  clearFilters()
  {
    this.model.previousapplytype='';
    this.model.previousbankname='';
    this.model.previousamounttaken='';
    this.model.roi='';
    this.model.pf='';
    this.model.pl='';
    this.model.insurance='';
    this.model.startdate='';
    this.model.maturity='';
this.model.coname='';
this.model.copaddress='';
this.model.coraddress='';

  }
  addvalues1()
  {
this.array1.push({
  coname:this.model.coname,
  copaddress:this.model.copaddress,
  coraddress:this.model.coraddress


})
console.log(this.array1);
this.tempval1=this.array1;

  }
//   clearFilters()
//   {
//     this.model.previousapplytype='';
//     this.model.previousbankname='';
//     this.model.previousamounttaken='';
//   }

//   addvalues()
//   {
// console.log(this.model.previousbankname);
// console.log(this.fetchData);
// var abc = this.model.previousbankname.split(",",2);
// var def = this.model.previousapplytype.split(",",2);

// this.array.push({
//   previousamounttaken:this.model.previousamounttaken,
//   previousbankname:abc[1],
//   bankid:abc[0],
//   previousapplytype:def[1],
//   loanid:def[0]
// })
// console.log(this.array);
// this.tempval=this.array;

//   }
//   removevalue(pro,index)
//   {
//     console.log(index);
//     this.array.splice(index,1);

//   }
}