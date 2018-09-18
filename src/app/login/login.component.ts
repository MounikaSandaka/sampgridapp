import { Component, OnInit } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    constructor(private http: Http, private router: Router) { }
  
    onClickMe(name,pass) 
    {
        if(name != "" && pass != "")
        {        
            var url = "http://localhost:5000/"+name+"/"+pass
            
            this.http.get(url).subscribe(res => {
                if(res.text() != "No data found")
                {
                    this.router.navigateByUrl('/'+name+'/index');
                }
                else
                {
                    alert("No data found");
                }
            });
        }
        else
        {
            alert("Invalid E-mail and Password");
        }
    }
  
    ngOnInit() { }
  
}
