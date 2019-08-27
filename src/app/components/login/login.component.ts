import { Component, OnInit, ɵConsole } from '@angular/core';
import { Observable, from } from 'rxjs';
import {Router} from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';
import { element } from 'protractor';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //Icons
  faUser = faUser;
  faKey = faKey;

  loginForm = new FormGroup( {
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rememberMe: new FormControl(false)
  });
  private data;
  private errmsg;
  constructor(private databaseService: DatabaseService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (localStorage.getItem('remember_me')) {
      let rememberMe = JSON.parse(atob(localStorage.getItem('remember_me')));
      this.loginForm.get('username').setValue(rememberMe.username);
      this.loginForm.get('password').setValue(rememberMe.password);
      this.loginForm.get('rememberMe').setValue(true);

    }

  }

  encryptPass(pass) {
    return atob(pass);
  }

  getData(id) {
    this.databaseService.getJson().subscribe(data => {
      data.forEach(element => {
        if (element.id === id) {
         localStorage.setItem('user_data', btoa(JSON.stringify(element)));
         console.log('set');
        }
      });
    });
  }

  validate() {
    let isRegistered = false;
    let isValid = false;
    let userType;
    let id;
    //console.log(isValid);
    
    this.setRememberMe();
    if (this.loginForm.get('username').invalid) {
      this.errmsg = 'Username is required!';
     } else if (this.loginForm.get('password').invalid) { this.errmsg = 'Invalid Password'; 
      } else {
        console.log(isValid);
        this.databaseService.getJson().subscribe((data: any) => {
          console.log(isValid);
          data.forEach(element => {
            if (this.loginForm.get('username').value === element.username) {
              isRegistered = true;
              userType = element.userType;

              const decPass = this.encryptPass(element.password);
              if ( this.loginForm.get('password').value === decPass) {
                isValid = true;
                id = element.id;
              } else {
                this.errmsg = 'Invalid Username/Password';

              }
            }
          });
          if (!isRegistered) {
            this.errmsg = 'Username not found';
          }
          if (isValid) {
           // this.setToken(this.loginForm.get('username').value);
            //this.router.navigate(['/home']);
            console.log(isValid);
            this.getData(id);
            this.authService.loginAuthentication(userType);

          }
        });
     }

   }


   setRememberMe() {
    if (this.loginForm.get('rememberMe').value) {
      let rememberMe = {
        username: this.loginForm.get('username').value,
        password: this.loginForm.get('password').value
      };
      localStorage.setItem('remember_me', btoa(JSON.stringify(rememberMe)));
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }

   }



}
