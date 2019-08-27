import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  private token;
  

  ngOnInit() {
    console.log( atob(localStorage.getItem('token')));
    this.router.navigate(['dashboard/' + atob(localStorage.getItem('token'))]);
    if (localStorage.getItem('user_data')){
      const userData = JSON.parse(atob(localStorage.getItem('user_data')));
      
    }
    
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }

}
