import { Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private databaseService: DatabaseService) { }

  private token;
  private message;
  onProfile: boolean;
  userType;
  userName;
  userData;



  ngOnInit() {
    this.router.navigate(['dashboard/' + atob(localStorage.getItem('token'))]);
    
    if (localStorage.getItem('user_data')) {
      this.userData = JSON.parse(atob(localStorage.getItem('user_data')));
      this.userName = this.userData.username;
      this.userType = this.userData.userType;
    }
  }



    logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    this.router.navigate(['/login']);
  }

  navProfile() {
    if (this.onProfile === true) {
      this.onProfile = false;
      this.router.navigate(['dashboard/' + atob(localStorage.getItem('token'))]);
      return;
    }
    this.onProfile = true;
    this.router.navigate(['dashboard/profile']);
  }




}
