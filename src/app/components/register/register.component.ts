import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private fname;
  private mname;
  private lname;
  private username;
  private email;
  private password;
  private repassword;
  private errmsg;
  private user;



  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit() {  }

  validatePass(pass1, pass2): boolean {
    let isValid = false;
    if (pass1 === pass2) {
      isValid = true;
    } else {
      this.errmsg = 'Incorrect Password';
    }
    return isValid;
  }


  encryptPass(pass) {
      return btoa(pass);
  }

  addUser() {
    if (this.validatePass(this.password, this.repassword) ) {
      const pass = this.encryptPass(this.password);
      this.databaseService.add({
        FirstName: this.fname,
        MiddleName: this.mname,
        LastName: this.lname,
        UserName: this.username,
        Email: this.email,
        Password: pass
      });
    }
  }

  validateUser() {
    let hasDuplicate: boolean;
    this.databaseService.get().subscribe(data => {
      data.forEach(element => {
        if (this.username === element.UserName) {
          hasDuplicate = true;
        }
      }
      );
      if (!hasDuplicate) {
        this.addUser();
        this.router.navigate(['/login']);
      }
    });
  }


}
