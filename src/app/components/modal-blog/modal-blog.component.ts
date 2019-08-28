import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-modal-blog',
  templateUrl: './modal-blog.component.html',
  styleUrls: ['./modal-blog.component.css']
})
export class ModalBlogComponent implements OnInit {

  @Output() closeModal = new EventEmitter<string>();
  @Output() getBlogs = new EventEmitter<string>();
  private userData;
  private blogForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    if (localStorage.getItem('user_data')){
      this.userData = JSON.parse(atob(localStorage.getItem('user_data')));
    }

  }

  addBlog() {
    this.databaseService.addJsonBlog({
      author: this.userData.username,
      title: this.blogForm.get('title').value,
      content: this.blogForm.get('content').value,
      date: formatDate(Date(), 'MMM dd h:MM a', 'en-US'),
      dateApproved: '',
      status: 'For Approval'
    }).subscribe(() => {
    this.getBlogs.next();
    this.close();
    }
    );
    
  }

  close() {
    this.closeModal.next('content');
  }

}
