import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private userData;
  private onEdit: boolean;
  private imageData;
  private imageString;
  private hasPic: boolean;
  private picId;
  private editForm: FormGroup;
  private editPass: FormGroup;
  private onPassword: boolean;
  private message;
  private messageCount = 0;
  checkCircle;

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.checkCircle = faCheckCircle;
    this.onPassword = this.onEdit = false;
    this.imageString = 'assets/profile/userImagePH.png';
    this.userData = JSON.parse(atob(localStorage.getItem('user_data')));
    this.getData();
    this.editForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email])
      
    });
    this.getPic(this.userData.username);
    this.editPass = new FormGroup({
      oldpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

    
  }

  getData() {
    this.databaseService.getJson(this.userData.id).subscribe(data => {
      this.userData = data;
      this.editForm.get('fname').setValue(this.userData.firstName);
      this.editForm.get('lname').setValue(this.userData.lastName);
      this.editForm.get('email').setValue(this.userData.email);
      console.log(this.userData);
      
      
    });
  }


  onFileUpload(event){   
    let file = event.target.files[0];
    let reader = new FileReader();
    let data;
    reader.readAsDataURL(file);
    reader.onload = () => {
      data = reader.result;
      if (this.hasPic) {
        this.updatePic(data);
        return;
      }
      this.addPic(data);
    };
  }

  addPic(file) {
    this.databaseService.addPicJson({
      data: file,
      username: this.userData.username
    }).subscribe(() =>{
      window.location.reload();
    });

  }

  updatePic(file) {
    this.databaseService.updatePicJson({
      data: file,
      username: this.userData.username
    }, this.picId).subscribe(() =>{
      window.location.reload();
    });

  }

  getPic(user) {
    this.databaseService.getPicJson().subscribe(data => {
      this.imageData = data;
      this.imageData.forEach(element => {
        if (element.username === user) {
          this.imageString = element.data;
          this.hasPic = true;
          this.picId = element.id;

        }
      });
    });
  }

  editInfo(){
    if (this.onEdit === true){
      this.databaseService.updateJson({
        lastName: this.editForm.get('lname').value,
        firstName: this.editForm.get('fname').value,
        username: this.userData.username,
        email: this.editForm.get('email').value,
        userType: this.userData.userType,
        password: this.userData.password
      }, this.userData.id).subscribe(() => {
        this.onEdit = false;
        this.getData();
      });
      return;
    }
    this.onEdit = true;
  }

  backToProfile() {
    this.onPassword = false;
  }

  changePassword() {
    if(this.onPassword === true) {
      this.databaseService.updateJson({
        lastName: this.userData.lastName,
        firstName: this.userData.firstName,
        username: this.userData.username,
        email: this.userData.email,
        userType: this.userData.userType,
        password: btoa(this.editPass.get('newpassword').value)
      }, this.userData.id).subscribe(() => {
        this.onPassword = false;
        this.getData();
      });
      return;

    }
    this.onPassword = true;
  }

  checkPassword() {
    console.log(btoa(this.editPass.get('oldpassword').value));
    console.log(this.userData.password);
    
    
    if (btoa(this.editPass.get('oldpassword').value) !== this.userData.password) {
      this.editPass.get('oldpassword').setValue('');
      this.sendErrorMessage('Incorrect Password');
    }
    
  }

  checkError(id, message) {
    if (!this.editPass.get(id).valid) {
      this.sendErrorMessage(message);
    } else {
      this.message = null;
    }
  }

  sendErrorMessage(message) {
    this.message = message;
    this.messageCount += 1;
  }

}
