import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../common.service';
import { DefaultLayoutComponent } from '../../containers';

@Component({
  selector: 'app-backend',
  templateUrl: './empnotification.component.html',
})
export class EmpNotificationComponent implements OnInit {
  model: any = {};
  model1: any = {};
  empid: any;
  empname: any;
  fetchData: any;
  fetchData1: any;
  value:any;

  constructor(private route: ActivatedRoute, private router: Router,
    private commonservice: CommonService, public defaultlayout: DefaultLayoutComponent,
  ) { }
  isCollapsed: boolean = false;


  ngOnInit() {
    this.empid = localStorage.getItem("id");
    this.empname = localStorage.getItem("empname");
this.value={empid:this.empid}
    this.commonservice.opennotification(this.value).subscribe(res => {
      this.defaultlayout.ngOnInit();
      this.commonservice.getEmployeeNotification(this.empid).subscribe(res => {
        console.log(res);
        this.fetchData = res;
      });
    });
  }


  refresh(): void {
    window.location.reload();
  }

}
