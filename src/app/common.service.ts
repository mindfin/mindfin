import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import * as XLSX from 'xlsx';

// import * as FileSaver from 'file-saver';
import { saveAs } from 'file-saver';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
// import { Booking } from '../../models/booking.model';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { TabHeadingDirective } from 'ngx-bootstrap/tabs';
const commonurl = 'https://bank.mindfin.co.in';

@Injectable({
  providedIn: 'root'
})

export class CommonService {
  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  constructor(private http: HttpClient, private router: Router, private idle: Idle, private keepalive: Keepalive) {
    // sets an idle timeout of 5 seconds, for testing purposes.

    idle.setIdle(86400);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(32400);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      localStorage.clear();
      window.location.reload();
    });
    idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');

    // sets the ping interval to 15 seconds
    keepalive.interval(32400);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }
  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
  private posts = [];
  private postsUpdated = new Subject<{ posts: any[]; postCount: number }>();




  logininsert(obj) {
    const uri = 'https://bank.mindfin.co.in/callapi/logininsert';
    return this.http.post(uri, obj)
      .subscribe(res => {
      });
  }
  getMacAddress() {
    const uri = 'https://bank.mindfin.co.in/callapi/getMacAddress';
    return this.http.get(uri) 
  }
  //login select

  login(loginvalue) {
    // console.log(loginvalue);
    const uri = "https://bank.mindfin.co.in/callapi/adminlogin/";
    this.http.post(uri, loginvalue).subscribe(res => {
      console.log(res);
      // console.log(res[0].user);
      if (res == null || res == undefined || res == 0) {
        alert("Invalid Username Or Password");
        window.location.reload();
      }
      else if (res[0].user == 'SUPERADMIN') {
        console.log('superadmin')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);

        localStorage.setItem('role', 'SUPERADMIN');
        this.router.navigate(["/dashboard"]);

      }
      else if (res[0].user == 'ADMIN') {
        console.log('admin')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('role', 'ADMIN');
        this.router.navigate(["/notification/profilesettings"]);
      }
      else if (res[0].user == 'EXECUTIVE' && res[0].designation == 'Admin') {
        console.log('EXECUTIVE')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('desc', res[0]['designation']);
        localStorage.setItem('role', 'EXECUTIVE');
        this.router.navigate(["/notification/profilesettings"]);
      }
      else if (res[0].user == 'EXECUTIVE' && res[0].designation != 'Admin') {
        console.log('exec')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('role', 'EXECUTIVE');
        localStorage.setItem('desc', res[0]['designation']);
        this.router.navigate(["/dashboard/executive"]);
      }
      else if (res[0].user == 'BACKEND') {
        console.log('back')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('role', 'BACKEND');
        this.router.navigate(["/dashboard/backend"]);
      }
      else if (res[0].user == 'DATAENTRY') {
        console.log('data')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('role', 'DATA ENTRY');
        this.router.navigate(["/dashboard/dataentry"]);
      }
      else if (res[0].user == 'TELECALLER') {
        console.log('tel')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('role', 'TELECALLER');
        this.router.navigate(["/dashboard/telecaller"]);
      }
      else if (res[0].user == 'LOGIN') {
        console.log('login')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('desc', res[0]['designation']);
        localStorage.setItem('role', 'LOGIN');
        this.router.navigate(["/dashboard/login"]);
      }
      else if (res[0].user == 'ACCOUNTANT') {
        console.log('account')
        localStorage.setItem('id', res[0]['idemployee']);
        localStorage.setItem('empname', res[0]['name']);
        localStorage.setItem('role', 'ACCOUNTANT');
        this.router.navigate(["/notification/profilesettings"]);
      }
      else if (res[0].user == 'SUB VENDOR') {
        console.log('account')
        // localStorage.setItem('id',res[0]['idemployee']);
        // localStorage.setItem('role','ACCOUNTANT');
        // this.router.navigate(["/account/subvendor"]);
      }
      else if (res[0].user == 'SUB CHANNEL') {
        console.log('account')
        // localStorage.setItem('id',res[0]['idemployee']);
        // localStorage.setItem('role','ACCOUNTANT');
        // this.router.navigate(["/account/subvendor"]);
      }
      else {
        // console.log('tele')
        console.log('custo')
        localStorage.setItem('id', res[0]['idcustomer']);
        localStorage.setItem('custname', res[0]['name']);
        localStorage.setItem('role', 'CUSTOMER');
        this.router.navigate(["/member/customerprofile"]);
       
      }
    });
  }
 



  getadminlist() {

    const uri = "https://bank.mindfin.co.in/callapi/getadminlist/";
    return this.http.get(uri);
  }


  //pie chart in gettotalbooking

  totalmember() {
    const uri = "https://bank.mindfin.co.in/callapi/gettotalbooking";
    return this.http.get(uri);
  }

  //total project

  employeecount() {
    const uri = "https://bank.mindfin.co.in/callapi/employeecount";
    return this.http.get(uri);
  }


  membercount() {
    const uri = "https://bank.mindfin.co.in/callapi/membercount";
    return this.http.get(uri);
  }
  piechart() {
    const uri = "https://bank.mindfin.co.in/callapi/piechart";
    return this.http.get(uri);
  }

  pendingcount() {
    const uri = "https://bank.mindfin.co.in/callapi/pendingcount";
    return this.http.get(uri);
  }

  rejectcount() {
    const uri = "https://bank.mindfin.co.in/callapi/rejectcount";
    return this.http.get(uri);
  }



  customeradd(fd) {
    console.log(fd);
    const uri = "https://bank.mindfin.co.in/callapi/customeradd";
    return this.http.post(uri, fd)

  }



  loaninsert(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/loaninsert";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  getloanlist() {
    const uri = "https://bank.mindfin.co.in/callapi/getloanlist/";
    return this.http.get(uri);
  }


  getexecutivelist() {

    const uri = "https://bank.mindfin.co.in/callapi/getexecutivelist/";
    return this.http.get(uri);
  }



  bankinsert(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/bankinsert";
    this.http.post(uri, obj).subscribe(res => {
    })
  }

  getbanklist() {

    const uri = "https://bank.mindfin.co.in/callapi/getbanklist/";
    return this.http.get(uri);
  }

  getnames(obj) {
    console.log(obj)
    const uri = "https://bank.mindfin.co.in/callapi/getnames/";
    return this.http.post(uri, obj);
  }
  // checkcurrentpwd(obj){
  //   console.log(obj);
  //   const uri="https://bank.mindfin.co.in/member/checkcurrentpwd";
  // return  this.http.post(uri,obj);

  // }


  approvecustomer(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/approvecustomer";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  approve(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/approve";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  pdapprove(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/pdapprove";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  loginapprove(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/loginapprove";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  getCustomerlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/approvedlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getCustomerlistDetails() {
    return this.postsUpdated.asObservable();
  }

  // rejectcustomer(obj){
  // console.log(obj);
  // const uri = "https://bank.mindfin.co.in/callapi/rejectcustomer";
  // this.http.post(uri,obj).subscribe(res=>{
  // //console.log('');
  // })
  // }
  rejectcustomer(obj, obj1) {
    console.log(obj);
    const queryParams = `/${obj}/${obj1}`;
    const uri = "https://bank.mindfin.co.in/callapi/rejectcustomer" + queryParams;
    this.http.get(uri).subscribe(res => {

    })
  }
  rejectbank(obj, obj1) {
    console.log(obj);
    const queryParams = `/${obj}/${obj1}`;
    const uri = "https://bank.mindfin.co.in/callapi/rejectbank" + queryParams;
    this.http.get(uri).subscribe(res => {

    })
  }
  employeeadd(fd) {
    console.log(fd);
    const uri = "https://bank.mindfin.co.in/callapi/addemployee";
    return this.http.post(uri, fd)

  }

  userinsert(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/userinsert";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  getuserlist() {
    const uri = "https://bank.mindfin.co.in/callapi/getuserlist/";
    return this.http.get(uri);
  }

  employeetypeinsert(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/employeetypeinsert";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  getemployeetypelist() {
    const uri = "https://bank.mindfin.co.in/callapi/getemployeetypelist/";
    return this.http.get(uri);
  }



  getemployeelist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getemployeelist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getemployeeDetails() {
    return this.postsUpdated.asObservable();
  }

  editmember(id) {
    console.log(id);
    this.router.navigate(["/member/editemployee/" + id]);
  }

  editemp(id) {

    const uri = 'https://bank.mindfin.co.in/callapi/editemp/' + id;
    return this.http.get(uri);
  }


  editemployee(fd) {
    console.log(fd);
    const uri = 'https://bank.mindfin.co.in/callapi/editemployee/';
    this.http.post(uri, fd).subscribe(res => {
      console.log(res);
    });
  }


  memlogin(loginvalue) {
    console.log(loginvalue);
    const uri = "https://bank.mindfin.co.in/callapi/memberlogin/";
    // return this.http.post(uri,obj);
    this.http.post(uri, loginvalue).subscribe(res => {
      console.log(res);
      if (res['status'] == false) {
        alert("Invalid Email Or Password");
        window.location.reload();
      }
      else {
        localStorage.setItem('id', res[0]['idcustomer']);
        localStorage.setItem('role', 'CUSTOMER');
        this.router.navigate(["/member/customerprofile"]);
      }
    });
  }

  homememberlist(memberid) {
    console.log(memberid);
    const uri = 'https://bank.mindfin.co.in/callapi/homememberlist/' + memberid;
    return this.http.get(uri);
  }

  memberviewdetails(memberid) {
    console.log(memberid);
    const uri = 'https://bank.mindfin.co.in/callapi/memberviewdetails/' + memberid;
    return this.http.get(uri);
  }

  getexecutiveelist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getexecutiveelist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  viewcustomerid(postsPerPage: number, currentPage: number, idvalue: String) {
   
    const queryParams = `/${postsPerPage}/${currentPage}/${idvalue}`;
    console.log(queryParams);
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/viewcustomerid" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }




  viewcustomeridDetails() {
    return this.postsUpdated.asObservable();
  }




  getexecutiveDetails() {
    return this.postsUpdated.asObservable();
  }

  editcustomer(id) {
    console.log(id);
    this.router.navigate(["/members/editcustomer/" + id]);
  }
  viewbank(id) {
    // this.router.navigate(["/members/viewbank/" +id]);
    this.router.navigate(["/members/bankapply/" + id]);

  }
  viewbank1(id) {
    this.router.navigate(["/members/viewbank/" + id]);
    // this.router.navigate(["/members/bankapply/" +id]);

  }
  viewbankk(id) {
    console.log("bye");
    this.router.navigate(["/members/bankdisburse/" + id]);
    // this.router.navigate(["/members/bankapply/" +id]);

  }
  // viewcustomerid(id){
  // console.log(id);
  // const uri='https://bank.mindfin.co.in/callapi/viewcustomerid/' + id;
  //  return this.http.get(uri);
  // }



  viewcustomer(id) {
    console.log(id);
    this.router.navigate(["/members/viewcustomer/" + id]);
  }



  editcust(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/editcust/' + id;
    return this.http.get(uri);
  }

  getextradetails(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/getextradetails/' + id;
    return this.http.get(uri);
  }
  customerupdate(fd) {
    console.log(fd);
    const uri = 'https://bank.mindfin.co.in/callapi/customerupdate/';
    return this.http.post(uri, fd);

  }

  getaging(date) {
    console.log(date)
    const uri = "https://bank.mindfin.co.in/callapi/getaging/ " + date;
    return this.http.get(uri);
  }

  deleteemp(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/deleteemp/ ";
    return this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }
  addbank(id) {
    console.log(id);
    this.router.navigate(["/members/custstatus/" + id]);

  }

  // checktrack(id)
  // {
  // console.log(id);
  // const uri='https://bank.mindfin.co.in/callapi/checktrack' + id;
  // return  this.http.get(uri);
  // //  .subscribe(res=>{
  // //   console.log(res);
  // //   })
  // // this.router.navigate(["/members/track/" +id]);
  // }



  checktrack(id) {
    console.log(id);
    // const uri='https://bank.mindfin.co.in/callapi/checktrack/' + id;
    //   this.http.get(uri)
    //     .subscribe(res=>{
    //    console.log(res);
    this.router.navigate(["/member/track/" + id]);

    //  })
    //  this.router.navigate(["/members/track/" +id]);
  }

  applybank(obj) {
    console.log(obj);
    const uri = 'https://bank.mindfin.co.in/callapi/applybank/';
    this.http.post(uri, obj).subscribe(res => {
      console.log(res);
    })
  }


  trackcheck(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/checktrack/' + id;
    return this.http.get(uri, id)
    //  .subscribe(res=>{
    //   console.log(res);
    //   })

  }


  hotCustomers(postsPerPage: number, currentPage: number) {
    console.log("service");
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/hotCustomers" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  hotCustomersDetails() {
    return this.postsUpdated.asObservable();
  }

  businesslistinsert(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/businesslistinsert";
    this.http.post(uri, obj).subscribe(res => {
    })
  }


  onChange(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/onChange";
    return this.http.post(uri, obj);
  }

  // addtopup(obj){
  //   console.log(obj);
  //   const uri="https://bank.mindfin.co.in/callapi/addtopup";
  //  return this.http.post(uri,obj);
  // }

  getbusinesslist() {
    const uri = "https://bank.mindfin.co.in/callapi/getbusinesslist/";
    return this.http.get(uri);
  }
  getApprovedBankList(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getApprovedBankList/" + id;
    return this.http.get(uri);
  }

  getApprovedBankListt(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getApprovedBankListt/" + id;
    return this.http.get(uri, id);
  }
  getRejectBankListt(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getRejectBankListt/" + id;
    return this.http.get(uri, id);
  }
  getviewbanklist(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getviewbanklist/" + id;
    return this.http.get(uri);
  }

  getviewbanklistt(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getviewbanklistt/" + id;
    return this.http.get(uri);
  }

  getViewPrevBankList(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getViewPrevBankList/" + id;
    return this.http.get(uri);
  }

  addenquiry(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/addenquiry";
    return this.http.post(uri, obj)
  }
  getEnquirylist(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getenquirylist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getEnquirylistDetails() {
    return this.postsUpdated.asObservable();
  }


  enquirycount(id) {
    const uri = "https://bank.mindfin.co.in/callapi/enquirycount/" + id;
    return this.http.get(uri);
  }




  getPdlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getPdlist" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getPdlistDetails() {
    return this.postsUpdated.asObservable();
  }


  getApprovallist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getApprovallist" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getApprovallistDetails() {
    return this.postsUpdated.asObservable();
  }


  getDisburstlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getDisburstlist" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getDisburstlistDetails() {
    return this.postsUpdated.asObservable();
  }

  dataentrycount() {
    const uri = "https://bank.mindfin.co.in/callapi/dataentrycount/";
    return this.http.get(uri);
  }


  pdcount() {
    const uri = "https://bank.mindfin.co.in/callapi/pdcount/";
    return this.http.get(uri);
  }

  approvecount() {
    const uri = "https://bank.mindfin.co.in/callapi/approvcount/";
    return this.http.get(uri);
  }

  disbursecount() {
    const uri = "https://bank.mindfin.co.in/callapi/disbursecount/";
    return this.http.get(uri);
  }

  enqcount() {
    const uri = "https://bank.mindfin.co.in/callapi/enqcount/";
    return this.http.get(uri);
  }
  bankapply(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/bankapply";
    this.http.post(uri, obj).subscribe(res => {
    })
  }

  singleCustomer(id) {
    const uri = "https://bank.mindfin.co.in/callapi/singleCustomer/" + id;
    return this.http.get(uri, id);
  }

  gettopuplist(id) {
    console.log(id);
    const uri = "https://bank.mindfin.co.in/callapi/gettopuplist/" + id;
    return this.http.get(uri, id);
  }

  topupcustomer(id) {
    console.log(id);
    this.router.navigate(["/members/topuplist/" + id]);
  }
  topupnotifycustomer(id) {
    console.log(id);
    this.router.navigate(["/members/topupnotifylist/" + id]);
  }
  getPeriod() {
    const uri = "https://bank.mindfin.co.in/callapi/getPeriod";
    return this.http.get(uri);
    // .subscribe(res=>{
    // })
  }
  checkcurrent(id) {
    console.log(id);
    const uri = "https://bank.mindfin.co.in/callapi/checkcurrent/" + id;
    return this.http.get(uri, id);
  }

  addPeriod(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/addPeriod";
    return this.http.post(uri, obj)
  }

  getperiodlist() {

    const uri = "https://bank.mindfin.co.in/callapi/getperiodlist/";
    return this.http.get(uri);
  }

  addtopup(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/addtopup";
    return this.http.post(uri, obj);
  }
  getrejectlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/rejectlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getrejectDetails() {
    return this.postsUpdated.asObservable();
  }


  settings(values) {
    console.log(values);
    const uri = 'https://bank.mindfin.co.in/callapi/settings';

    this.http.post(uri, values).subscribe(res => {
      console.log(res);

    });
  }
  settingslist() {
    const uri = "https://bank.mindfin.co.in/callapi/settinglist";
    return this.http.get(uri);
  }



  programinsert(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/programinsert";
    this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  getprogramlist() {

    const uri = "https://bank.mindfin.co.in/callapi/getprogramlist/";
    return this.http.get(uri);
  }

  // gettopupnotifylist(postsPerPage: number, currentPage: number){
  //   const queryParams = `/${postsPerPage}/${currentPage}`;
  // this.http
  // .get<{ message: string; posts: any; maxPosts: number }>(
  //   "https://bank.mindfin.co.in/callapi/gettopupnotifylist" + queryParams
  // )
  // .pipe(
  //   map(postData => {
  //     return {
  //       posts: postData.posts,
  //       maxPosts: postData.maxPosts
  //     };
  //   })
  // )
  // .subscribe(transformedPostData => {
  //   this.posts = transformedPostData.posts;
  //   this.postsUpdated.next({
  //     posts: [...this.posts],
  //     postCount: transformedPostData.maxPosts
  //   });
  // });
  // }

  // gettopupnotifylistDetails(){
  // return this.postsUpdated.asObservable();
  // }
  gettopupnotifylist(obj) {
    // console.log(id);
    const uri = "https://bank.mindfin.co.in/callapi/gettopupnotifylist/" + obj;
    return this.http.get(uri);
  }

  getexecutivetopuplist(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getexecutivetopuplist/" + id;
    return this.http.get(uri, id)
  }

  topUpSucess(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/topUpSucess";
    return this.http.post(uri, obj);
  }
  // getsuccesstopuplist(){
  //   const uri = "https://bank.mindfin.co.in/callapi/getsuccesstopuplist/" ;
  //   return this.http.get(uri)
  // }
  getSubVendor() {
    const uri = "https://bank.mindfin.co.in/callapi/getSubVendor";
    return this.http.get(uri)
  }
  CustomerList(id) {
    this.router.navigate(["/account/customerlist/" + id]);

    // const uri="https://bank.mindfin.co.in/callapi/customerList";
    // return this.http.post(uri,obj);
  }
  getSubvendorCustomerList(id) {
    console.log(id);
    const uri = "https://bank.mindfin.co.in/callapi/customerList/" + id;
    return this.http.get(uri);
  }

  savePayout(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/savePayout";
    return this.http.post(uri, obj);
  }
  addPayOut(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/addPayOut";
    return this.http.post(uri, obj);
  }
  getDisburseCustomerList() {
    const uri = "https://bank.mindfin.co.in/callapi/getDisburseCustomerList";
    return this.http.get(uri);
  }
  checknumber(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/checknumber";
    return this.http.post(uri, obj);
  }
  getvendornames() {
    const uri = "https://bank.mindfin.co.in/callapi/getvendornames";
    return this.http.get(uri);
  }
  gettranscationdata(id) {
    console.log(id);
    const uri = "https://bank.mindfin.co.in/callapi/gettranscationdata/" + id;
    return this.http.get(uri);
  }

  getApproveBankList(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getApproveBankList/" + id;
    return this.http.get(uri);
  }

  applyLoan(id) {
    // console.log(obj);
    // const uri="https://bank.mindfin.co.in/callapi/applyLoan";
    // return this.http.post(uri,obj);
    this.router.navigate(["/account/reloan/" + id]);
  }
  reloanapply(fd) {
    console.log(fd);
    const uri = "https://bank.mindfin.co.in/callapi/reloanapply";
    return this.http.post(uri, fd);

  }
  bulkSms(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/bulkSms";
    return this.http.post(uri, obj);
  }

  getDetails(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/getDetails";
    return this.http.post(uri, obj);
  }

  getPreviousBankDetails(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/getPreviousBankDetails";
    return this.http.post(uri, obj);
  }
  getApprovedBankDetails(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/getApprovedBankDetails";
    return this.http.post(uri, obj);
  }
  accountdetails(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/accountdetails";
    return this.http.post(uri, obj);
  }



  getsuccesstopuplist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getsuccesstopuplist" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getsuccesstopuplistDetails() {
    return this.postsUpdated.asObservable();
  }
  checkaadharnumber(obj) {
    // console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/checkaadharnumber";
    return this.http.post(uri, obj);
  }
  checkpannumber(obj) {
    // console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/checkpannumber";
    return this.http.post(uri, obj);
  }
  checkdlnumber(obj) {
    // console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/checkdlnumber";
    return this.http.post(uri, obj);
  }
  checkvoternumber(obj) {
    // console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/checkvoternumber";
    return this.http.post(uri, obj);
  }
  getemployeename(id) {
    console.log(id);
    const url = "https://bank.mindfin.co.in/callapi/getemployeename/" + id;
    return this.http.get(url);
  }

  // getemployeetypelist(){
  //   const url="https://bank.mindfin.co.in/callapi/getemployeetypelist";
  //   return this.http.get(url);
  // }
  getCompanyname() {
    var empid = localStorage.getItem("id");
    const uri = "https://bank.mindfin.co.in/callapi/getCompanyname/" + empid;
    return this.http.get(uri);

  }
  getbankname() {
    const uri = "https://bank.mindfin.co.in/callapi/getbankname";
    return this.http.get(uri);

  }
  // addroutine(obj, empid) {
  //   console.log(obj);
  //   const uri = "https://bank.mindfin.co.in/callapi/addroutine/" + empid;
  //   return this.http.post(uri, obj);
  // }

  editData(id) {
    console.log(id);
    this.router.navigate(["/executives/editenquiry/" + id]);
  }
  editdataa(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/editdataa/' + id;
    return this.http.get(uri);
  }

  updateenquiry(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/updateenquiry";
    this.http.post(uri, obj).subscribe(res => {
    })
  }
  enquirycount1() {
    const uri = "https://bank.mindfin.co.in/callapi/enquirycount1";
    return this.http.get(uri);
  }
  // viewroutine(obj) {
  //   console.log(obj);
  //   const uri = "https://bank.mindfin.co.in/callapi/viewroutine/" + obj;
  //   return this.http.get(uri);
  // }

  getEnquirylistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquirylistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getEnquirylistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  enquirycount2(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/enquirycount2/" + obj;
    return this.http.get(uri);
  }

  viewroutine(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/viewroutine" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  viewroutineDetails() {
    return this.postsUpdated.asObservable();
  }
  editData1(id) {
    console.log(id);
    this.router.navigate(["/executives/editroutine/" + id]);
  }
  editdata1(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/editdata1/' + id;
    return this.http.get(uri);
  }
  editroutine(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/editroutine";
    return this.http.post(uri, obj);
  }
  dataentrypiechart() {
    const uri = "https://bank.mindfin.co.in/callapi/dataentrypiechart";
    return this.http.get(uri);
  }
  getbankrejectlist(postsPerPage: number, currentPage: number, id: number) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getbankrejectlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getbankrejectDetails() {
    return this.postsUpdated.asObservable();
  }
  approvalmember(obj, obj1) {
    console.log(obj);
    const queryParams = `/${obj}/${obj1}`;
    const uri = "https://bank.mindfin.co.in/callapi/approvalmember" + queryParams;
    this.http.get(uri).subscribe(res => {

    })
  }
  casecount(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/casecount/" + obj;
    return this.http.get(uri);
  }
  topupcount(obj) {
    const uri = "https://bank.mindfin.co.in/callapi/topupcount/" + obj;
    return this.http.get(uri);
  }
  custdocument(fd) {
    console.log(fd);
    const uri = "https://bank.mindfin.co.in/callapi/custdocument";
    return this.http.post(uri, fd)
  }
  getdocument(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getdocument" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getdocumentDetails() {
    return this.postsUpdated.asObservable();
  }
  getdocument3(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getdocument3" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getdocument3Details() {
    return this.postsUpdated.asObservable();
  }
  backendaddbank(id) {
    console.log(id);
    this.router.navigate(["/backend/applybank/" + id]);

  }
  backendviewbank(id) {
    console.log(id);
    this.router.navigate(["/backend/status/" + id]);

  }
  backendedit(id) {
    console.log(id);
    this.router.navigate(["/backend/edit/" + id]);
  }
  backendeditemp(id) {

    const uri = 'https://bank.mindfin.co.in/callapi/backendedit/' + id;
    return this.http.get(uri);
  }
  editcustdoc(fd) {
    console.log(fd);
    const uri = "https://bank.mindfin.co.in/callapi/editcustdoc";
    return this.http.post(uri, fd)
  }

  backendbankinsert(obj) {
    console.log(obj);
    const uri = 'https://bank.mindfin.co.in/callapi/backendbankinsert';
    this.http.post(uri, obj).subscribe(res => {
      console.log(res);
    })
  }
  getdocument1(postsPerPage: number, currentPage: number, obj) {
    const queryParams = `/${postsPerPage}/${currentPage}/${obj}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getdocument1" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getdocument1Details() {
    return this.postsUpdated.asObservable();
  }
  getbackendviewbanklist(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getbackendviewbanklist/" + id;
    return this.http.get(uri);
  }
  editstatus(obj) {
    console.log(obj);
    // const queryParams = `/${obj}/${obj1}`;
    const uri = "https://bank.mindfin.co.in/callapi/editstatus";
    this.http.post(uri, obj).subscribe(res => {

    })
  }
  addroutine(obj) {
    console.log(obj);
    const uri = 'https://bank.mindfin.co.in/callapi/addroutine';
    this.http.post(uri, obj).subscribe(res => {
      console.log(res);
    })
  }
  loginviewbank(id) {
    console.log(id);
    this.router.navigate(["/loginoperation/loginstatus/" + id]);

  }
  getloginexecutivelist() {

    const uri = "https://bank.mindfin.co.in/callapi/getloginexecutivelist/";
    return this.http.get(uri);
  }
  sentlogexe(obj, obj1, obj2) {
    console.log(obj);
    const queryParams = `/${obj1}/${obj2}`;
    const uri = "https://bank.mindfin.co.in/callapi/sentlogexe" + queryParams;
    return this.http.post(uri, obj);
  }
  sentlogexeedit(id) {
    console.log(id);
    this.router.navigate(["/loginoperation/sentexelogedit/" + id]);
  }
  sentexelogedit1(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/sentexelogedit1/' + id;
    return this.http.get(uri);
  }

  getloginlist(postsPerPage: number, currentPage: number, obj) {
    const queryParams = `/${postsPerPage}/${currentPage}/${obj}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getloginlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getloginlistDetails() {
    return this.postsUpdated.asObservable();
  }
  addloginroutine(obj) {
    console.log(obj);
    const uri = 'https://bank.mindfin.co.in/callapi/addloginroutine';
    this.http.post(uri, obj).subscribe(res => {
      console.log(res);
    })
  }
  logineditData(id) {
    console.log(id);
    this.router.navigate(["/loginoperation/logineditroutine/" + id]);
  }
  editloginroutine(obj, empid) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/editloginroutine/" + empid;
    return this.http.post(uri, obj);
  }
  viewtele(id) {
    console.log(id);
    this.router.navigate(["/executives/exeteledatalist1/" + id]);
  }
  checkcustomer(obj) {
    // console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/checkcustomer";
    return this.http.post(uri, obj).subscribe(res => {
      console.log(res);
      // console.log(res[0].user);
      if (res == null || res == undefined || res == 0) {
        alert("CUSTOMER NOT EXIST!!!");
        this.router.navigate(["/members/add"]);
      }
      else {
        const id = res[0].idcustomer;
        alert("CUSTOMER EXISTS!!!!");
        this.router.navigate(["/account/reloan/" + id]);
      }
    })
  }
  logincount(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/logincount/" + obj;
    return this.http.get(uri);
  }
  completlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/completlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  completlistDetails() {
    return this.postsUpdated.asObservable();
  }
  banklist(id) {
    console.log(id);
    this.router.navigate(["/members/bankreject/" + id]);
  }
  getDataEnquirylist(postsPerPage: number, currentPage: number, sdate, edate) {
    console.log(sdate)
    console.log(edate)
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getDataEnquirylist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getDataEnquirylistDetails() {
    return this.postsUpdated.asObservable();
  }
  getBackendlist(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getBackendlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getBackendlistDetails() {
    return this.postsUpdated.asObservable();
  }
  getLoginreportlist(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getLoginreportlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getLoginreportlistDetails() {
    return this.postsUpdated.asObservable();
  }
  getLoginroutinelist(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getLoginroutinelist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getLoginroutinelistDetails() {
    return this.postsUpdated.asObservable();
  }
  getExecutiveroutinelist(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getExecutiveroutinelist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getExecutiveroutinelistDetails() {
    return this.postsUpdated.asObservable();
  }
  getDataentryReportlist(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getDataentryReportlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getDataentryReportlistDetails() {
    return this.postsUpdated.asObservable();
  }

  geEnquiryDatalist(postsPerPage: number, currentPage: number, sdate, exeid) {
    console.log(sdate)
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${exeid}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/geEnquiryDatalist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getEnquiryDatalistDetails() {
    return this.postsUpdated.asObservable();
  }

  casedoccount() {
    const uri = "https://bank.mindfin.co.in/callapi/casedoccount";
    return this.http.get(uri);
  }

  caselogin() {
    const uri = "https://bank.mindfin.co.in/callapi/caselogin";
    return this.http.get(uri);
  }

  casepd() {
    const uri = "https://bank.mindfin.co.in/callapi/casepd";
    return this.http.get(uri);
  }

  caseapproval() {
    const uri = "https://bank.mindfin.co.in/callapi/caseapproval";
    return this.http.get(uri);
  }

  casereject() {
    const uri = "https://bank.mindfin.co.in/callapi/casereject";
    return this.http.get(uri);
  }

  casedisburse() {
    const uri = "https://bank.mindfin.co.in/callapi/casedisburse";
    return this.http.get(uri);
  }

  casewip() {
    const uri = "https://bank.mindfin.co.in/callapi/casewip";
    return this.http.get(uri);
  }
  getdocument2(postsPerPage: number, currentPage: number, sdate, obj) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${obj}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getdocument2" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getdocument2Details() {
    return this.postsUpdated.asObservable();
  }
  getloginlist1(postsPerPage: number, currentPage: number, sdate, obj) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${obj}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getloginlist1" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getloginlist1Details() {
    return this.postsUpdated.asObservable();
  }
  checkcase(obj) {

    const uri = "https://bank.mindfin.co.in/callapi/checkcase";
    return this.http.post(uri, obj)

  }

  getdocument4(postsPerPage: number, currentPage: number, sdate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getdocument4" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getdocument4Details() {
    return this.postsUpdated.asObservable();
  }
  getdocument5(postsPerPage: number, currentPage: number, sdate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getdocument5" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getdocument5Details() {
    return this.postsUpdated.asObservable();
  }
  topuplist(obj) {
    console.log(obj);
    this.router.navigate(["/executives/topuplist/" + obj]);

  }
  editcocust(obj) {
    console.log(obj);
    const uri = 'https://bank.mindfin.co.in/callapi/editcocust';
    return this.http.post(uri, obj);
  }
  getcocustomer(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/getcocustomer/' + id;
    return this.http.get(uri);

  }
  getadminexecutivelist() {

    const uri = "https://bank.mindfin.co.in/callapi/getadminexecutivelist/";
    return this.http.get(uri);
  }
  getEnquirylistexe1(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquirylistexe1" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquirylistexeDetails1() {
    return this.postsUpdated.asObservable();
  }
  teleeditData(id) {
    console.log(id);
    this.router.navigate(["/executives/admineditenquiry/" + id]);
  }
  teleeditDataa(id) {
    console.log(id);
    const uri = 'https://bank.mindfin.co.in/callapi/teleeditData/' + id;
    return this.http.get(uri);
  }
  getDataEnquirylist1(postsPerPage: number, currentPage: number, sdate, edate, exeid) {
    console.log(sdate)
    console.log(edate)
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}/${exeid}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getDataEnquirylist1" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getDataEnquirylistDetails1() {
    return this.postsUpdated.asObservable();
  }
  assignexe(obj) {
    console.log(obj);
    // const queryParams = `/${obj}/${obj1}`;
    const uri = "https://bank.mindfin.co.in/callapi/assignexe";
    return this.http.post(uri, obj)
  }

  getContactformlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getContactformlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getContactformlistDetails() {
    return this.postsUpdated.asObservable();
  }

  getcareerformlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getcareerformlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getcareerformlistDetails() {
    return this.postsUpdated.asObservable();
  }
  getCallbackformlist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getCallbackformlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getCallbackformlistDetails() {
    return this.postsUpdated.asObservable();
  }

  public uploadImage(file) {
    console.log(file)
    return this.http.post(`https://bank.mindfin.co.in/callapi/image-upload`, file);
  }
  public suggbox(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/suggbox`, value);
  }
  public leaveapp(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/leaveapp`, value);
  }
  public conves(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/conves`, value);
  }
  activeemp(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/activeemp/ ";
    return this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }

  getinactiveemployeelist(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getinactiveemployeelist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getinactiveemployeeDetails() {
    return this.postsUpdated.asObservable();
  }

  gettopleave(postsPerPage: number, currentPage: number, empid: number) {

    const queryParams = `/${postsPerPage}/${currentPage}/${empid}`;
    console.log(queryParams);
    const uri = "https://bank.mindfin.co.in/callapi/gettopleave" + queryParams;
    return this.http.get(uri);
  }
  gettopconven(postsPerPage: number, currentPage: number, empid: number) {

    const queryParams = `/${postsPerPage}/${currentPage}/${empid}`;
    console.log(queryParams);
    const uri = "https://bank.mindfin.co.in/callapi/gettopconven" + queryParams;
    return this.http.get(uri);
  }
  gettopsug(postsPerPage: number, currentPage: number, empid: number) {

    const queryParams = `/${postsPerPage}/${currentPage}/${empid}`;
    console.log(queryParams);
    const uri = "https://bank.mindfin.co.in/callapi/gettopsug" + queryParams;
    return this.http.get(uri);
  }
  getconven(postsPerPage: number, currentPage: number, empid: number) {
    const queryParams = `/${postsPerPage}/${currentPage}/${empid}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getconven" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getconvenDetails() {
    return this.postsUpdated.asObservable();
  }
  getleavapp(postsPerPage: number, currentPage: number, empid: number) {
    const queryParams = `/${postsPerPage}/${currentPage}/${empid}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getleavapp" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getleavappDetails() {
    return this.postsUpdated.asObservable();
  }
  getsug(postsPerPage: number, currentPage: number, empid: number) {
    const queryParams = `/${postsPerPage}/${currentPage}/${empid}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getsug" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getsugDetails() {
    return this.postsUpdated.asObservable();
  }
  getsugpending() {
    const uri = "https://bank.mindfin.co.in/callapi/getsugpending";
    return this.http.get(uri);
  }
  getconvpending() {
    const uri = "https://bank.mindfin.co.in/callapi/getconvpending";
    return this.http.get(uri);
  }
  getleaveapp() {
    const uri = "https://bank.mindfin.co.in/callapi/getleaveapp";
    return this.http.get(uri);
  }

  getallconven(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getallconven" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getallconvenDetails() {
    return this.postsUpdated.asObservable();
  }
  getallleavapp(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getallleavapp" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getallleavappDetails() {
    return this.postsUpdated.asObservable();
  }
  getallsug(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getallsug" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getallsugDetails() {
    return this.postsUpdated.asObservable();
  }
  public editconves(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/editconves`, value);
  }
  public editleavapp(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/editleavapp`, value);
  }
  public editsug(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/editsug`, value);
  }
  public conveopenstatus(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/conveopenstatus`, value);
  }
  public leavappeopenstatus(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/leavappeopenstatus`, value);
  }
  public sugopenstatus(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/sugopenstatus`, value);
  }
  public getpasswords() {
    const uri = "https://bank.mindfin.co.in/callapi/getpasswords";
    return this.http.get(uri);
  }
  getwhosecase() {
    const uri = "https://bank.mindfin.co.in/callapi/getwhosecase";
    return this.http.get(uri);

  }
  getBackendCustomerlist(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getBackendCustomerlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getBackendCustomerlistDetails() {
    return this.postsUpdated.asObservable();
  }
  getBackendBanklist(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getBackendBanklist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getBackendBanklistDetails() {
    return this.postsUpdated.asObservable();
  }
  getWebsiteLead(postsPerPage: number, currentPage: number, sdate, edate) {
    const queryParams = `/${postsPerPage}/${currentPage}/${sdate}/${edate}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getWebsiteLead" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }


  getWebsiteLeadDetails() {
    return this.postsUpdated.asObservable();
  }
  savecomment(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/savecomment ";
    return this.http.post(uri, obj)
  }
  getweblead() {
    const uri = "https://bank.mindfin.co.in/callapi/getweblead";
    return this.http.get(uri);
  }
  public webleadopenstatus(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/webleadopenstatus`, value);
  }
  downloadall(obj) {
    console.log(obj);
    const uri = "https://bank.mindfin.co.in/callapi/downloadall/ ";
    return this.http.post(uri, obj).subscribe(res => {
      //console.log('');
    })
  }
  public earlygo(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/earlygo`, value);
  }
  getEarlygo(id) {
    const uri = "https://bank.mindfin.co.in/callapi/getEarlygo/" + id;
    return this.http.get(uri);
  }
  getearlygocount() {
    const uri = "https://bank.mindfin.co.in/callapi/getearlygocount";
    return this.http.get(uri);
  }
  public earlygoopenstatus(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/earlygoopenstatus`, value);
  }
  getallearlygo(postsPerPage: number, currentPage: number) {
    const queryParams = `/${postsPerPage}/${currentPage}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getallearlygo" + queryParams
      )
      .pipe(
        map(postData => {
          return {
            posts: postData.posts,
            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }

  getallearlygoDetails() {
    return this.postsUpdated.asObservable();
  }
  getnewtelcount() {
    const uri = "https://bank.mindfin.co.in/callapi/getnewtelcount";
    return this.http.get(uri);
  }
  getnewappocount(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/getnewappocount";
    return this.http.post(uri, value);
  }
  public teldataopenstatus(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/teldataopenstatus`, value);
  }
  public appointmentopenstatus(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/appointmentopenstatus`, value);
  }
  downloadCount(value) {
    const uri = "https://bank.mindfin.co.in/callapi/downloadCount";
    return this.http.post(uri, value);
  }
  cimageUpload(value) {
    const uri = "https://bank.mindfin.co.in/callapi/cimageUpload";
    return this.http.post(uri, value);
  }
  getemployee() {
    const uri = "https://bank.mindfin.co.in/callapi/getemployee/";
    return this.http.get(uri);
  }
  individualNotification(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/individualNotification`, value);
  }


  getteleemp() {
    const uri = "https://bank.mindfin.co.in/callapi/getteleemp/";
    return this.http.get(uri);
  }
  getbackendemp() {
    const uri = "https://bank.mindfin.co.in/callapi/getbackendemp/";
    return this.http.get(uri);
  }
  getaccemp() {
    const uri = "https://bank.mindfin.co.in/callapi/getaccemp/";
    return this.http.get(uri);
  }

  getdataentrtemp() {
    const uri = "https://bank.mindfin.co.in/callapi/getdataentrtemp/";
    return this.http.get(uri);
  }
  generalNotification(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/generalNotification`, value);
  }
  getGroupNotification() {
    const uri = "https://bank.mindfin.co.in/callapi/getGroupNotification/";
    return this.http.get(uri);
  }
  getEmployeeNotification(value) {
    const uri = "https://bank.mindfin.co.in/callapi/getEmployeeNotification/" + value;
    return this.http.get(uri);
  }
  getnewnotification(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/getnewnotification";
    return this.http.post(uri, value);
  }
  opennotification(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/opennotification";
    return this.http.post(uri, value);
  }
  deleteNotification(value) {
    console.log(value);
    return this.http.post(`https://bank.mindfin.co.in/callapi/deleteNotification`, value);
  }
  getSeenBy(value) {
    console.log(value)
    const uri = "https://bank.mindfin.co.in/callapi/getSeenBy/" + value;
    return this.http.get(uri);
  }
  openSeenByDialog(id) {
    console.log(id);
    this.router.navigate(["/notification/seenby/" + id]);
  }
  gettodolist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/gettodolist";
    return this.http.post(uri, value);
  }

  addToDo(value){
    console.log(value)
    const uri="https://bank.mindfin.co.in/callapi/addToDo";
    return this.http.post(uri,value);
  }
  getToDo(value){
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/gettodo";
    return this.http.post(uri, value);
  }
  closetodo(value){
    console.log(value)
    const uri = "https://bank.mindfin.co.in/callapi/closetodo/" + value;
    return this.http.get(uri);
    
  }
  public getemailSettings() {
    const uri = "https://bank.mindfin.co.in/callapi/getemailSettings";
    return this.http.get(uri);
  }
  addEvent(value){
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/addEvent";
    return this.http.post(uri, value);
  }
  getEvent(){
      const uri = "https://bank.mindfin.co.in/callapi/getEvent";
  const res= this.http.get(uri);
   console.log(res);
    return res;
  }
  deleteEvent(value){
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/deleteEvent";
    return this.http.post(uri, value);
  }
  enquiryapprovecount(id) {
    const uri = "https://bank.mindfin.co.in/callapi/enquiryapprovecount/" + id;
    return this.http.get(uri);
  }
  enquirydisbursecount(id) {
    const uri = "https://bank.mindfin.co.in/callapi/enquirydisbursecount/" + id;
    return this.http.get(uri);
  }
  enquiryrejectcount(id) {
    const uri = "https://bank.mindfin.co.in/callapi/enquiryrejectcount/" + id;
    return this.http.get(uri);
  }
  getEnquiryDisburslistDetails(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquiryDisburslistDetailsDetails" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquiryDisburslistDetailsDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquiryApprovedlist(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquiryApprovedlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquiryApprovedlistDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquiryRejectlist(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquiryRejectlist" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquiryRejectlistDetails() {
    return this.postsUpdated.asObservable();
  }
  notopenedlist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/notopenedlist";
    return this.http.post(uri, value);
  }
  filepickedlist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/filepickedlist";
    return this.http.post(uri, value);
  }
  contactedlist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/contactedlist";
    return this.http.post(uri, value);
  }
  loginlist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/loginlist";
    return this.http.post(uri, value);
  }
  wiplist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/wiplist";
    return this.http.post(uri, value);
  }
  approvedlist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/approvedlist";
    return this.http.post(uri, value);
  }
  disbursedlist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/disbursedlist";
    return this.http.post(uri, value);
  }
  rejectlist(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/rejectlist";
    return this.http.post(uri, value);
  }

  getEnquiryApprovelistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquiryApprovelistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquiryApprovelistexeDetails() {
    return this.postsUpdated.asObservable();
  }

  getEnquirycontactedlistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquirycontactedlistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquirycontactedlistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquirydisburselistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquirydisburselistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquirydisburselistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquiryfilepicklistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquiryfilepicklistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquiryfilepicklistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquiryloginlistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquiryloginlistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquiryloginlistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquirynotopenlistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquirynotopenlistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquirynotopenlistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquiryrejectlistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquiryrejectlistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquiryrejectlistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  getEnquirywiplistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquirywiplistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquirywiplistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  notify(obj) {
    console.log(obj);
    // const queryParams = `/${obj}/${obj1}`;
    const uri = "https://bank.mindfin.co.in/callapi/notify";
    return this.http.post(uri, obj)
  }
  removeCase(obj) {
    console.log(obj);
    // const queryParams = `/${obj}/${obj1}`;
    const uri = "https://bank.mindfin.co.in/callapi/removeCase";
    return this.http.post(uri, obj)
  }
  nofallowup(value) {
    console.log(value);
    const uri = "https://bank.mindfin.co.in/callapi/nofallowup";
    return this.http.post(uri, value);
  }
  getEnquirynofollowuplistexe(postsPerPage: number, currentPage: number, id) {
    const queryParams = `/${postsPerPage}/${currentPage}/${id}`;
    this.http
      .get<{ message: string; posts: any; maxPosts: number }>(
        "https://bank.mindfin.co.in/callapi/getEnquirynofollowuplistexe" + queryParams
      )
      .pipe(
        map(postData => {
          //console.log('');
          return {
            posts: postData.posts,

            maxPosts: postData.maxPosts
          };
        })
      )
      .subscribe(transformedPostData => {
        this.posts = transformedPostData.posts;
        this.postsUpdated.next({
          posts: [...this.posts],
          postCount: transformedPostData.maxPosts
        });
      });
  }
  getEnquirynofollowuplistexeDetails() {
    return this.postsUpdated.asObservable();
  }
  mappedgetEvent(){
    const uri = "https://bank.mindfin.co.in/callapi/mappedgetEvent";
const res= this.http.get(uri);
 console.log(res);
  return res;
}
mappedgetEventDetails() {
  return this.postsUpdated.asObservable();
}
}
