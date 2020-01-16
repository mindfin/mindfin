import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SuperadminService } from '../../superadmin.service';
import { CommonService } from '../../common.service';


export interface User { 
  name: string;
}
@Component({
  templateUrl: './earlygo.component.html',
})

export class EarlyGoComponent {
  myControl = new FormControl();
  val: any = [];
  selectedFile: File = null;
  selectedFile1: File = null;
  selectedFile2: File = null;

  tempval: any;
  tempval1: any;
  array: any = [];
  array1: any = [];
  empid: any;
  empname:any;
  value1:any;
  constructor(private service: SuperadminService, private router: Router, private commonservice: CommonService) { }

  model: any = {};
  fetchData: any;
  fetchData1: any;


  ngOnInit() {
    this.empid = localStorage.getItem("id");
    this.empname = localStorage.getItem("empname");
    this.commonservice.getEarlygo(this.empid).subscribe(res => {
      console.log(res);
      this.fetchData1 = res;
    })
  }
  refresh() {
    window.location.reload();
  }
  onSubmit(obj) {
    console.log(obj);
    this.value1 = { value: obj, empid: this.empid, empname: this.empname };
    this.commonservice.earlygo(this.value1).subscribe(res => {
      console.log(res);
      this.commonservice.getEarlygo(this.empid).subscribe(res => {
        console.log(res);
        this.fetchData1 = res;
      })
    })
        // this.commonservice.getbackendviewbanklist(this.custid).subscribe(res => {
    //   console.log(res);
    //   this.fetchData1 = res;
    // })
  }
 
}