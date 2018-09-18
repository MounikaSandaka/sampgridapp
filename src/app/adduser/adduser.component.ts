import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html'
})
export class AdduserComponent implements OnInit {

userName:String;
classname="nav nav-third-level collapse in";
arrow="fa fa-caret-down";
values='';

  constructor(private http: Http, private location: Location, private router: Router, private route: ActivatedRoute) 
  {
    var param = this.route.snapshot.paramMap.get('name');
    this.userName = param;
    
  }

  username(){
    this.router.navigateByUrl('/'+this.userName+'/index');
  }
    
  logout(){
    this.router.navigateByUrl('');
  }
  
  dashboard(){
    this.router.navigateByUrl('/'+this.userName+'/index');
  }
  
  gridview(){
    this.router.navigateByUrl('/'+this.userName+'/table');
  }

  user()
  {
    this.classname = this.classname == "nav nav-third-level collapse" ? "nav nav-third-level collapse in" : "nav nav-third-level collapse";   
    this.arrow = this.arrow == "fa fa-caret-left" ? "fa fa-caret-down" : "fa fa-caret-left";
  }
    
  adduser(){
    this.router.navigateByUrl('/'+this.userName+'/adduser');
  }
    
  userslist(){
    this.router.navigateByUrl('/'+this.userName+'/userslist');
  }

    submit(fnm,unm,pass,cpass,mnumb,eml)
    {
    if(fnm.value != "" && unm.value != "" && pass.value != null && cpass.value != "")
    {
        if(pass.value == cpass.value)
        {
            var data= {FullName:fnm.value, UserName:unm.value, Password:pass.value, MobileNumber:mnumb.value, Email:eml.value};
            let url = "http://localhost:5000/adduser"
            this.http.post(url, data).subscribe(res =>{
            });
            window.location.reload();
            //this.router.navigateByUrl('/'+this.userName+'/adduser');
        }
        else
        {
            alert("Password and Confirm Password must be same!");
        }
    }
    }
    
    cancel()
    {
        window.location.reload();
        //this.router.navigateByUrl('/'+this.userName+'/adduser');
    }
    
  ngOnInit() {
  }

}
