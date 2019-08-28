import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {

  private blogData;
  constructor(private modalService: NgbModal, private databaseService: DatabaseService) { }

  ngOnInit() {
    this.getBlogs();
  }

  
  openModal(content) { 
    this.modalService.open(content, {size: 'lg'});

  }

  closeModal(content) { 
    this.modalService.dismissAll(content);

  }

  getBlogs() {
    this.databaseService.getBlogJson().subscribe(data => {
      this.blogData = data;
      console.log(this.blogData);
      
    });
  }


  deleteBlog(id) {
    this.databaseService.deleteBlogJson(id).subscribe(() => {
      this.getBlogs();
    });
  }
}
