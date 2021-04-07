import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontAngular';
  result: boolean = true;

  ngOnInit(){
    var url = "";
    url = window.location.href;
    const link1 = "http://localhost:4200/login";
    const link2 = "http://localhost:4200/";   
    if (url == link2) {
      this.result = true;
    } else if(url == link1) {
      this.result = true;
    }
    else{
      this.result = false;
    }  
  }
}
