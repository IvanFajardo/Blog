import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  private blogObject;
  private blogData;
  private onPage;
  private searchInput = '';

  constructor(private modalService: NgbModal, private databaseService: DatabaseService) { }

  ngOnInit() {
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
    this.databaseService.getBlogJson().subscribe(data => {
      this.blogData = data;
      this.onPage = 'Admin';
      console.log(this.blogData);
      
    });
  }

}
