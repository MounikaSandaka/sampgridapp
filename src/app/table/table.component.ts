import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html'
})

export class TableComponent implements OnInit 
{    
    classname="nav nav-third-level collapse";
    arrow="fa fa-caret-left";
    
    myWelcome : [{
    id:number,
    name:String,
    age:String
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
        let url = "http://localhost:5000/table"+substr        
        this.http.get(url).subscribe(res =>{
            this.myWelcome = res.json();
            this.l = this.myWelcome.length;
        });        
    }
        
        ngOnInit(){
    }
    addElement(n, a)
    {
        var data= {name: n, age: a};
        let url = "http://localhost:5000/insert"
        this.http.post(url, data).subscribe(res =>{
        });      
        window.location.reload();
        //this.router.navigate('/'+this.userName+'/table');
    }
    
    deleteElement(x)
    {
        var data = {id: x.id};
        console.log(data);
        let url = "http://localhost:5000/delete"
        this.http.put(url, data).subscribe(res =>{});
        window.location.reload();
        //this.router.navigateByUrl('/'+this.userName+'/table');
    }
    
    editWarning(x)
    {
        if(this.button == "btn btn-warning btn-circle")
        {
            var id = x.id;
            console.log(id)
            this.router.navigateByUrl('/'+this.userName+'/table/edit/'+id);            
        }
        else
        {
            var data= {name: x.name, age: x.age};
            var num = x.id;
            let url = "http://localhost:5000/modify"+num
            this.http.put(url, data).subscribe(res => {
            });            
			this.router.navigateByUrl('/'+this.userName+'/table');            
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