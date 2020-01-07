import { Component, Input, Inject } from '@angular/core';
import { navItems } from './../../_nav';
import { navItems1 } from './../../_nav1';
import { navItems2 } from './../../_nav2';
import { navItems3 } from './../../_nav3';
import { navItems4 } from './../../_nav4';
import { navItems5 } from './../../_nav5';
import { navItems6 } from '../../_nav6';
import { navItems7 } from '../../_nav7';
import { Router, ActivatedRoute } from '@angular/router';
import { any } from 'bluebird';
import { CommonService } from '../../common.service';
import { navItems8 } from '../../_nav8';
import { navItems9 } from '../../_nav9';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';

class FileSnippet {
  static readonly IMAGE_SIZE = { width: 950, height: 720 };
  pending: boolean = false;
  status: string = 'INIT';

  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public abc = localStorage.getItem('role');
  public isadmin = localStorage.getItem('desc');
  public navItems = navItems;
  public navItems1 = navItems1;
  public navItems2 = navItems2;
  public navItems3 = navItems3;
  public navItems4 = navItems4;
  public navItems5 = navItems5;
  public navItems6 = navItems6;
  public navItems7 = navItems7;
  public navItems8 = navItems8;
  public navItems9 = navItems9;

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  memberid: any;
  fetchData;
  fetchData1;
  fetchData2;
  fetchData3;
  fetchData4;
  fetchData5;
  fetchData6;
  fetchData7;
  reason;
  half;
  other;
  from;
  to;
  currentPage = 1;
  postsPerPage = 5;
  pageSizeOptions = [5, 10, 20];
  comment;

  constructor(private router: Router, private service: CommonService, private dialog: MatDialog) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });
    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["login"]);
  }

  ngOnInit() {
    this.memberid = localStorage.getItem("id");
    this.service.getemployeename(this.memberid).subscribe(res => {
      // console.log(res);
      this.fetchData = res[0];
      // console.log(this.fetchData);
    });

    this.service.gettopleave(this.postsPerPage,this.currentPage,this.memberid).subscribe(res=>{
      this.fetchData1 = res;
    });
    this.service.gettopconven(this.postsPerPage,this.currentPage,this.memberid).subscribe(res=>{
      this.fetchData2 = res;
    });
    this.service.gettopsug(this.postsPerPage,this.currentPage,this.memberid).subscribe(res=>{
      this.fetchData3 = res;
    });
    this.service.getsugpending().subscribe(res=>{
      this.fetchData4 = res;
    });
    this.service.getconvpending().subscribe(res=>{
      this.fetchData5 = res;
    });
    this.service.getleaveapp().subscribe(res=>{
      this.fetchData6 = res;
    });
    this.service.getweblead().subscribe(res=>{
      this.fetchData7 = res;
    });
  }

  sugbox() {

       const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { reason: this.reason };
    this.dialog.open(SugboxDialogContent, dialogConfig
    );
    console.log(dialogConfig);

  }

  leaveapp() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {from:this.from,half:this.half, reason:this.reason};
    this.dialog.open(LeaveAppDialogContent, dialogConfig
    );
    console.log(dialogConfig);
  }
  convens() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {catgory:any, other:this.other,comment:this.comment};
    this.dialog.open(ConvenienceDialogContent, dialogConfig
    );
    console.log(dialogConfig);
  }
}

// Suggestion Box Component
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'sugbox_dialog.html',
})

export class SugboxDialogContent {


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private commonservice: CommonService, private route: ActivatedRoute, private router: Router, ) { }
  element: any;
  empid: any;
  empname: any;
  value1: any;
  model: any;
  onSubmit(data) {
    console.log(data);
    this.empid = localStorage.getItem("id");
    this.empname = localStorage.getItem("empname");
    this.value1 = { value: data, empid: this.empid, empname: this.empname };
    console.log(this.value1);
    this.commonservice.suggbox(this.value1)
      .subscribe(res => {
        alert("Suggestion / consensu / complaint sent Successfully");
        window.location.reload();
      })
  }
  refresh(): void {
    window.location.reload();
  }
}

// Leave Application component
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'leaveapp_dialog.html',
})
 
export class LeaveAppDialogContent {


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private commonservice: CommonService, private route: ActivatedRoute, private router: Router, ) { }
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
    this.commonservice.leaveapp(this.value1)
      .subscribe(res => {
        alert("Leave Application sent Successfully");
        window.location.reload();
      })
  }
  refresh(): void {
    window.location.reload();
  }
}
// Conveniences Component
@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'conven_dialog.html',
})

export class ConvenienceDialogContent {


  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private commonservice: CommonService, private route: ActivatedRoute, private router: Router, ) { }
  listing: any;
  listingData: any;
  show = false;
  hide=false;
  addListing = false;
  sendDeleteListingData: any;
  filePath: any;
  selectedFiles: any;
  currentFileUpload: any;
  imagePath: any;
  selectedFile: FileSnippet;
  imageChangedEvent: any;
  errorMessage: any = '';
  imageChangeFlag: boolean = false;
  imageURL: string;
  imageURL$: string;
  myfields:any=[];

  element: any;
  empid: any;
  empname: any;
  value1: any;

  public onFileSelect(event) {
    // this.processFile(event)
    let formData = new FormData();
    this.selectedFiles = event.target.files;
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log(this.currentFileUpload);
    formData.append('image', this.currentFileUpload,this.currentFileUpload.name);
    this.imagePath = formData;
    console.log(this.imagePath);
    this.imageChangeFlag = true;
    this.commonservice.uploadImage(this.imagePath).subscribe(
      async (data) => {
      this.filePath = await this.getImageURL(data)
      console.log(this.filePath);
    }
    )
  }
  async getImageURL(data) {
    return this.imageURL = await data.imageUrl;
  }


  onSubmit(value) {
    console.log(value);
    this.empid = localStorage.getItem("id");
    this.empname = localStorage.getItem("empname");
    this.value1 = { value: value, empid: this.empid, empname: this.empname, catimg:this.filePath };
    console.log(this.value1);
    this.commonservice.conves(this.value1)
      .subscribe(res => {
        alert("Convenience sent Successfully");
        window.location.reload();
      })
  }
  refresh(): void {
    window.location.reload();
  }
}