import { Component, Input } from '@angular/core';
import { navItems } from './../../_nav';
import { navItems1 } from './../../_nav1';
import { navItems2 } from './../../_nav2';
import { navItems3 } from './../../_nav3';
import { navItems4 } from './../../_nav4';
import { navItems5 } from './../../_nav5';
import { navItems6 } from '../../_nav6';
import { navItems7 } from '../../_nav7';

import { Router } from '@angular/router';
import { any } from 'bluebird';
import { CommonService } from '../../common.service';
import { navItems8 } from '../../_nav8';
import { navItems9 } from '../../_nav9';


@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public abc = localStorage.getItem('role');
  public isadmin=localStorage.getItem('desc');
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
  memberid:any;
  fetchData;
  constructor(private router:Router,private service: CommonService) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
  logout(){
    localStorage.clear();
    // window.location.reload();
    this.router.navigate(["login"]);
  }
 

 
  ngOnInit() {
    this.memberid = localStorage.getItem("id");
  
    this.service.getemployeename(this.memberid).subscribe(res=>{
      console.log(res);
      this.fetchData = res[0];
      console.log(this.fetchData);
    });
  }

}
