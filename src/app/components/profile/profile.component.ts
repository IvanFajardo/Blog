import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private userData;
  private onEdit: boolean;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.userData = JSON.parse(atob(localStorage.getItem('user_data')));
    this.databaseService.getJson(this.userData.id).subscribe(data => {
      console.log(data);
      
    });
  }

}
