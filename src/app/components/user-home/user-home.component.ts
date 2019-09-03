import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/services/database.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  private isDraftPage;
  private blogData;
  private blogObject;
  private onPage;
  private filterId: string;
  private searchInput: string;
  private userData;
  private user;
  private childMessage: string;
  private messageCount = 0;
  constructor(private modalService: NgbModal, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.filterId = 'All';
    this.searchInput = '';
    
    if (localStorage.getItem('user_data')){
      this.userData = JSON.parse(atob(localStorage.getItem('user_data')));
      this.user = this.userData.username;
      console.log(this.user);
    }

    this.getBlogs();


  }

  
  openModal(content, data?) {
    this.modalService.open(content, {size: 'lg'});
    this.blogObject = data;

  }

  closeModal(content) {
    this.modalService.dismissAll(content);

  }

 

  getBlogs() {
    this.isDraftPage = false;
    this.databaseService.getBlogJson().subscribe(data => {
      this.blogData = data;
      this.onPage = 'User';
      console.log(this.blogData);
      
    });
  }

  getBlogDraft() {
    this.isDraftPage = true;
    this.databaseService.getDraftBlog().subscribe(data => {
      this.blogData = data;
      this.onPage = 'Draft';
      console.log(this.blogData);
      
    });

  }


  deleteBlog(id) {
    if(confirm('Are you sure you want to delete this Blog?')){
      if (!this.isDraftPage) {
        this.databaseService.deleteBlogJson(id).subscribe(() => {
          this.getBlogs();
        });
      } else {
        this.databaseService.deleteDraftBlog(id).subscribe(() => {
          this.getBlogDraft();
        });
      }
    }

  }


  getChildMessage($event){
    this.childMessage = $event;
    this.messageCount += 1;
    
  }

  
}


