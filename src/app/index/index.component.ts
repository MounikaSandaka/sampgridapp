import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html'
})
export class IndexComponent implements OnInit {

userName:String;
classname="nav nav-third-level collapse";
arrow="fa fa-caret-left";

  constructor(private location: Location, private route: ActivatedRoute, private router: Router) 
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
    
  ngOnInit() {
  }

}
