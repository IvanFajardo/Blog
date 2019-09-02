import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private registerForm;
  private errmsg;
  private user;
  hasDuplicate: boolean;
  checkCircle;
  message: string;

  constructor(private databaseService: DatabaseService, private router: Router) { }

  ngOnInit() { 
    this.hasDuplicate = false;
    this.checkCircle = faCheckCircle;
    this.registerForm = new FormGroup({
      fname: new FormControl(),
      mname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userType: new FormControl('', [Validators.required])
    });

   }

  validatePass(): boolean {
    let isValidPass = false;
    if (this.registerForm.get('password').value === this.registerForm.get('repassword').value) {
      isValidPass = true;
    } else {
      this.errmsg = 'Incorrect Password';
    }
    return isValidPass;
  }


  encryptPass(pass) {
      return btoa(pass);
  }

  addUser() {
    // if (this.validatePass() ) {
      const pass = this.encryptPass(this.registerForm.get('password').value);
      this.databaseService.addJson({
        firstName: this.registerForm.get('fname').value,
        middleName: this.registerForm.get('mname').value,
        lastName: this.registerForm.get('lname').value,
        username: this.registerForm.get('username').value,
        email: this.registerForm.get('email').value,
        password: pass,
        userType: this.registerForm.get('userType').value,
      }).subscribe();
    // }
  }

  validateUser() {
    this.hasDuplicate = false;
    if (!this.registerForm.get('username').valid) {
      this.checkError('username', 'Username must be at least 6 characters!');
    }
    this.databaseService.getJson().subscribe((data: any) => {
      data.forEach(element => {
        if (this.registerForm.get('username').value === element.UserName) {
          this.hasDuplicate = true;
          this.sendErrorMessage('Username is already taken');
        }
      });
    });
    return !this.hasDuplicate;
  }

  submitUser() {
    if (this.validatePass() && this.validateUser()) {
      this.addUser();
      
      this.router.navigate(['/login']);
    }
  }

  checkError(id, message) {
    if (!this.registerForm.get(id).valid) {
      this.sendErrorMessage(message);
    } else {
      this.message = null;
    }
  }

  sendErrorMessage(message) {
    this.message = message;
  }


}
