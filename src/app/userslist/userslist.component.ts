import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html'
})
export class UserslistComponent implements OnInit {

public searchString: string;
    
classname="nav nav-third-level collapse in";
arrow="fa fa-caret-down";
    
    myWelcome : [{
    UserKey:String,
    UserName:String,
    Password:String,       
    MobileNumber:number,
    Email:String,
    IsActive:number,
    IsDeleted:number,
    CreatedDataTime:String,
    FullName:String, 
    Photo:String
    }];        
    
    button = "btn btn-warning btn-circle";
    custom = "fa fa-edit";
    
    show = true;
    hide = false;
    
    start = 0;
    pageSizes = [5, 10, 15, 'All'];
    limit = 5;
    
    l = 0;
    limitpage = 5;
    userName:String;
    
    constructor(private http: Http, private location: Location, private router: Router, private route: ActivatedRoute)
    {
        var param = this.route.snapshot.paramMap.get('name');
        this.userName = param;
        
        var substr = this.route.snapshot.paramMap.get('id');
        
        if(substr == null)
        { 
            substr = '';
        }
        else
        {
            this.show = false;
            this.hide = true;
            this.button = "btn btn-info btn-circle";
            this.custom = "fa fa-check";
        }
            let url = "http://localhost:5000/userslist"+substr;
            this.http.get(url).subscribe(res =>{
                this.myWelcome = res.json();
                this.l = this.myWelcome.length;
            });
        }
        ngOnInit(){
    }    
    
    deleteElement(x)
    {
        var data = {UserKey: x.UserKey};
        let url = "http://localhost:5000/userslist/delete"
        this.http.put(url, data).subscribe(res =>{});
        window.location.reload();
        //this.router.navigateByUrl('/'+this.userName+'/userslist');
    }
    
    editWarning(x)
    {
        if(this.button == "btn btn-warning btn-circle")
        {
            var id = x.UserKey;
            this.router.navigateByUrl("/"+this.userName+"/userslist/edit/"+id);
        }
        else
        {
            var data= {FullName: x.FullName, MobileNumber: x.MobileNumber, Email: x.Email, Photo: x.Photo};
            var num = x.UserKey;
            let url = "http://localhost:5000/userslist/modify"+num
            this.http.put(url, data).subscribe(res => {
            });
			this.router.navigateByUrl('/'+this.userName+'/userslist');            
        }
    }
    pagination(page)
    {
        if(page == 'All')
        {
            page=this.l;
            this.limit=page;
            this.limitpage=page;
        }
        else
        {
            this.limit=Number(page);
            this.limitpage=Number(page);
            
        }
    }
    noneselected()
    {
        return this.start <= 0;
    }
    selected()
    {
        return (this.limit == this.l)?true:(0 > this.l-this.limit-1);
    }
    next()
    {
    
        this.start = this.limit+0;
        this.limit = this.start+this.limitpage;
    }
    prev()
    {
        this.limit = this.start+0;
        this.start = this.limit-this.limitpage;
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
}
