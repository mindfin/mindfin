import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './loantype.component.html',
//   styleUrls: ['./loantype.component.scss']
})
export class LoantypeComponent implements OnInit {

  constructor( private route: ActivatedRoute, private router:Router,private service: CommonService) { }

  
obj:any;
fetchData:any;
model: any = {};



  onSubmit(){
    this.service.loaninsert(this.model).subscribe(res=>{
      // console.log(res);
      if(this.model.idloantype!==null){ alert("Loan Type Updated Successfully")}
     
      else{alert("Loan Type Added Successfully")}
      
      this.ngOnInit();
      this.model.loantype = '';
    this.model.code = '';
    });
   }

  ngOnInit() {
     this.service.getloanlist().subscribe(res=>{
    console.log(res);
    this.fetchData = res;
  });
//   this.service.getexecutivelist().subscribe(res=>{
//     console.log(res);
//     this.fetchData = res;
//   });


  }
  refresh(): void {
    window.location.reload();
  }
  editproject(pro){
    console.log(pro);
    this.model = pro;
  }
}
