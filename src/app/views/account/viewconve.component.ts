import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../common.service';
import { SuperadminService } from '../../superadmin.service';
// import { CommonService } from '../../superadmin.service';

import { PageEvent, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
// import { Memberlist } from '../../../../models/booking.model';
import { SampleService } from '../../sample.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

// export interface DialogData {
// this.model;
// }


@Component({
  selector: 'app-home',
  templateUrl: './viewconve.component.html',
})
export class ConveniencslistComponent {

  displayedColumns: string[] = ['name', 'mobile', 'email', 'bankname', 'view','status','download','Edit'];
  samples: any;
  dataSource;

  constructor(private route: ActivatedRoute, private router: Router,
    private commonservice: CommonService, private service: SuperadminService, private excelservice: SampleService, public dialog: MatDialog) { }
  coins: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  fetchdata: any;
  model: any = {};
  aa: any;
  // posts:Memberlist[] = [];
  totalPosts = 0;
  postsPerPage = 100;
  currentPage = 1;
  pageSizeOptions = [100, 300, 500];
  isLoading = false;
  emp = 2;
  empid;
  empname;
  ngOnInit() {
    
    this.empid = localStorage.getItem("id");
    this.empname = localStorage.getItem("empname");
    var emp= {empid: this.empid, empname: this.empname };
    this.commonservice.conveopenstatus(emp).subscribe(res=>{
      console.log(res);
     });

    this.isLoading = true;
    this.commonservice.getallconven(this.postsPerPage, this.currentPage);
    this.commonservice
      .getallconvenDetails()
      .subscribe((postData: { posts: SuperadminService[], postCount: number }) => {
        this.totalPosts = postData.postCount;
        this.dataSource = new MatTableDataSource(postData.posts);
        // this.dataSource = new (postData.posts);
        this.samples = postData.posts;
        this.isLoading = false;
        console.log(postData.posts);
        console.log(postData.postCount);
        this.dataSource.sort = this.sort;
        console.log(this.dataSource.sort);
      });
  }
  applyFilter(filterValue: string) {
    console.log(filterValue);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    console.log(this.postsPerPage);
    this.commonservice.getallconven(this.postsPerPage, this.currentPage);
  }

  data: any;

  demo: any;
  array = [];
  abc: any;


  refresh(): void {
    window.location.reload();
  }
  openDialog(element) {
    this.model=element;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = {element};
      this.dialog.open(EditConvContent,dialogConfig
    );
    console.log(dialogConfig );
    
    }
}
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'editconven_dialog.html',
}) 

export class EditConvContent{ 


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private commonservice: CommonService, private route: ActivatedRoute, private router: Router,) {}
  element: any;
  empid: any;
  empname: any;
  value1: any;
  onSubmit(value) {
    console.log(value);
    this.empid = localStorage.getItem("id");
    this.empname = localStorage.getItem("empname");
    this.value1 = { value: value, empid: this.empid, empname: this.empname };
    console.log(this.value1);
    this.commonservice.editconves(this.value1)
      .subscribe(res => {
        alert("Convenience "+value.element.status+" Successfully");
        window.location.reload();
      })
  }
  refresh(): void {
    window.location.reload();
  }
}
