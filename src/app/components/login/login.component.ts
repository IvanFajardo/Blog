import { Component, OnInit, ɵConsole } from '@angular/core';
import { Observable, from } from 'rxjs';
import {Router} from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username;
  private password;
  private data;

  private errmsg;
  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit() { }

  encryptPass(pass) {
    return atob(pass);
  }

  validate(username, password): boolean {
    let isRegistered = false;
    let isValid = false;
    this.databaseService.get().subscribe(data => {
      data.forEach(element => {
        if (username === element.UserName) {
          isRegistered = true;

          const decpass = this.encryptPass(element.Password);
          if ( password === decpass) {
            isValid = true;
          } else {
            this.errmsg = 'Wrong Password';
            //this.messages.sendMessage(this.errmsg);
          }
        }
      });
      if (!isRegistered) {
        this.errmsg = 'Username not found';
        //this.messages.sendMessage(this.errmsg);
      }
      if (isValid) {
        this.setToken(username);
        this.router.navigate(['/home']);
      }
      // console.log(isValid);
      // console.log(this.errmsg);
      return isValid;
    });
    return null;

   }

   setToken(user) {
    const token = btoa(btoa(user));
    localStorage.setItem('token', token);
   }

   createAccount() {
    this.router.navigate(['/register']);
   }

}
