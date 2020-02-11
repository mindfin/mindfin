import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CommonService } from '../../common.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'newlogin.component.html',
  // templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  registerForm: FormGroup;
  submittedError;

  constructor(private router:Router,private service:CommonService
    ,private formBuilder: FormBuilder){
      // this.toastr.setRootViewContainerRef(vcr);
    // console.log(cookie.get('loginCPSession'));
    // if(cookie.get('loginCPSession')==null||cookie.get('loginCPSession')==''||cookie.get('loginCPSession')==undefined){
    //   router.navigate(['/login']);
    // }else{
    //   router.navigate(['/validmpin']);
    // }

  }

  ngOnInit(){
    // this.load();
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
  });
  }
  // load() {
  //   this.location.reload();
  // }
  obj:any;
login(form){
  
  if (this.registerForm.invalid) {
    console.log("hii");
    this.submittedError = true;
    return;
}
this.submittedError = false;
// alert("Success");
console.log(this.registerForm.value);
  this.obj={
    username:this.registerForm.value.username,
    password:this.registerForm.value.password
  }
  // console.log(this.obj);
  this.service.login(this.obj);
  // console.log(email);

  // this.router.navigate(['/dashboard']);
}
}











//   constructor( private route: ActivatedRoute, private router:Router,private service: CommonService) { }


//   obj:any;

//   signup(email,pwd){
//   // this.obj={
//   //   company:company,country:country
  
//   // };

// 	this.obj={
// 	  email:email,
// 	  password:pwd
// 	}




//   console.log(this.obj);
  
//   this.service.login(this.obj);
  
  
  
//   }
 









//  ngOnInit() {}

// }