import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
const commonurl = 'https://bank.mindfin.co.in';
@Injectable({
    providedIn:'root'
})

export class MemberService{
    constructor(private http:HttpClient,private router:Router){}
    login(loginvalue){
        console.log(loginvalue);
        const uri = "https://bank.mindfin.co.in/member/memberlogin/";
        // return this.http.post(uri,obj);
        this.http.post(uri,loginvalue).subscribe(res=>{
          console.log(res);
          if(res==null)
          {
            
            alert("Invalid Email Or Password");
        
            window.location.reload();
            

          }
  else{
    
    localStorage.setItem('id',res[0]['idmember']);
    localStorage.setItem('role','member');
    this.router.navigate(["/member/home"]);
  
     
    
  }
        });
      }

  
      getsinglemember(id){
        console.log(id);
        const uri='https://bank.mindfin.co.in/member/getsinglemember/' + id;
         return this.http.get(uri);
      }     

  
      homememberlist(memberid){
        console.log(memberid);
        const uri='https://bank.mindfin.co.in/member/homememberlist/' +memberid;
        return this.http.get(uri);
      }
      
      
      
      
      myprojectlist(memberid){
        console.log(memberid);
        const uri='https://bank.mindfin.co.in/member/myprojectlist/' +memberid;
        return this.http.get(uri);
      }



      changepwd(obj){
        console.log(obj);
        const uri='https://bank.mindfin.co.in/member/changepwd/';
        this.http.post(uri,obj).subscribe(res=>{
          console.log(res);
          if (res['status']==true ) {
            alert("PASSWORD CHANGED!!!");
            this.router.navigate(["/login"]);
          }
            else{
              alert("SORRY SOMETHING WENT WRONG!!!");
            }
        });  
      }
  
      checkcurrentpwd(obj){
        console.log(obj);
        const uri="https://bank.mindfin.co.in/member/checkcurrentpwd";
      return  this.http.post(uri,obj);
  
      }
      public uploadImage(file) {
        console.log(file)
        return this.http.post(`https://bank.mindfin.co.in/member/image-upload`, file);
      }
      bankstatementcam(value) {
        console.log(value);
        return this.http.post( "https://bank.mindfin.co.in/member/bankstatementcam",value);
        // return this.http.post(uri, value)
      }
      itrcam(value) {
        console.log(value);
        const uri = "https://bank.mindfin.co.in/callapi/itrcam";
        return this.http.post(uri, value)
      }
}
 