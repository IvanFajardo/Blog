import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, RequiredValidator } from '@angular/forms';
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
  @Output() messageOutput = new EventEmitter<string>();
  @Input() data;
  @Input() onPage;
  private userData;
  private userId;
  
  private blogForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    remarks: new FormControl('')
  });

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    if (localStorage.getItem('user_data')){
      this.userData = JSON.parse(atob(localStorage.getItem('user_data')));
    }
    console.log(this.onPage);

    
    if (this.data) {
      // Set Textbox and Content Area data
      this.blogForm.get('title').setValue(this.data.title);
      this.blogForm.get('content').setValue(this.data.content);
      this.blogForm.get('remarks').setValue(this.data.remarks);
      this.userId = this.data.id;
      console.log(this.data);

      switch (this.onPage) {
        case 'Admin':
          this.blogForm.get('title').disable();
          this.blogForm.get('content').disable();
          break;

        case 'User':
          if (this.data.status != 'Returned'){
            this.blogForm.get('title').disable();
            this.blogForm.get('content').disable();
          }
          this.blogForm.get('remarks').disable();
          break;

        case 'Draft':
          this.blogForm.get('remarks').disable();
          break;

      }
  
    }


  }

  addBlog() {
    
    if (this.data.status === 'Returned' && this.onPage === 'User') {
      this.sendMessage(this.blogForm.get('title').value + ' is sent for re-approval');
      this.databaseService.updateBlogJson({
        author: this.userData.username,
        title: this.blogForm.get('title').value,
        content: this.blogForm.get('content').value,
        date: formatDate(Date(), 'MMM dd h:MM a', 'en-US'),
        dateApproved: '',
        status: 'For Approval',
        remarks: this.blogForm.get('remarks').value
      }, this.data.id).subscribe(() => {
        this.getBlogs.next();
        this.close();
      }
      );

    } else {
      this.sendMessage(this.blogForm.get('title').value + ' is sent for approval');
      this.databaseService.addBlogJson({
        author: this.userData.username,
        title: this.blogForm.get('title').value,
        content: this.blogForm.get('content').value,
        date: formatDate(Date(), 'MMM dd h:MM a', 'en-US'),
        dateApproved: '',
        status: 'For Approval',
        remarks: this.blogForm.get('remarks').value
      }).subscribe(() => {
        if (this.onPage === 'Draft' && this.data) {
      this.databaseService.deleteDraftBlog(this.data.id).subscribe();
        }
        this.getBlogs.next();
        this.close();
      }
      );
    }
  }

  saveToDraft() {
    
    if (this.onPage === 'Draft' && this.data){
      this.sendMessage(this.blogForm.get('title').value + ' has been updated');
      this.databaseService.updateDraftBlog({
        author: this.userData.username,
        title: this.blogForm.get('title').value,
        content: this.blogForm.get('content').value,
        date: formatDate(Date(), 'MMM dd h:MM a', 'en-US'),
        remarks: this.blogForm.get('remarks').value || null,
        status: this.data.status || null,
      }, this.data.id).subscribe(() => {
        this.getBlogs.next();
        this.close();        
        }
        );
    } else {
      this.sendMessage(this.blogForm.get('title').value + ' has been added to draft');
      this.databaseService.addDraftBlog({
        author: this.userData.username,
        title: this.blogForm.get('title').value,
        content: this.blogForm.get('content').value,
        date: formatDate(Date(), 'MMM dd h:MM a', 'en-US'),
        remarks: this.blogForm.get('remarks').value || null,
        status: this.data.status || null,
      }).subscribe(() => {
        this.getBlogs.next();
        this.close();
        }
        );
    }
    
  }

  close() {
    this.closeModal.next('content');
  }

  acceptBlog() {
    this.sendMessage(this.blogForm.get('title').value + ' has been accepted');
    this.databaseService.updateBlogJson({
      author: this.data.author,
      title: this.data.title,
      content: this.data.content,
      date: this.data.date,
      dateApproved: formatDate(Date(), 'MMM dd h:MM a', 'en-US'),
      status: 'Approved',
      remarks: this.blogForm.get('remarks').value
    }, this.data.id).subscribe(() => {
      this.getBlogs.next();
      this.close();
      });
  }

  rejectBlog() {
    this.sendMessage(this.blogForm.get('title').value + ' has been rejected');
    this.databaseService.updateBlogJson({
      author: this.data.author,
      title: this.data.title,
      content: this.data.content,
      date: this.data.date,
      dateApproved: '',
      status: 'Returned',
      remarks: this.blogForm.get('remarks').value
    }, this.data.id).subscribe(() => {
      this.getBlogs.next();
      this.close();
      });
  }

  sendMessage(msg) {
    this.messageOutput.emit(msg);

  }

}
