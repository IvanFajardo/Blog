import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  baseUrl: string;
  blogBaseUrl: string;
  draftBlogBaseUrl: string;
  picUrl: string;
  config: any;

  constructor(private http: HttpClient, configService: ConfigService) { 
    this.config = configService.getConfigs();
    this.baseUrl = this.config.baseUrl;
    this.blogBaseUrl = this.config.blogBaseUrl;
    this.draftBlogBaseUrl = this.config.draftBlogBaseUrl;
    this.picUrl = this.config.picUrl;
  }

  getHeaders() {
    const headers = new HttpHeaders();
    headers.set('Content-type', 'application/json');
    return headers;
  }

  getJson(id?) {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl + (id || ''), { headers } );
  }


  addJson(data) {
    const headers = this.getHeaders();
    return this.http.post(this.baseUrl,  data  , { headers });
  }

  updateJson(data, id) {
    const headers = this.getHeaders();
    return this.http.put(this.baseUrl + id,  data  , { headers });
  }

  deleteJson(id) {
    const headers = this.getHeaders();
    return this.http.delete(this.baseUrl + id, { headers });
  }

  addBlogJson(data) {
    const headers = this.getHeaders();
    return this.http.post(this.blogBaseUrl,  data  , { headers });
  }

  updateBlogJson(data, id) {
    const headers = this.getHeaders();
    return this.http.put(this.blogBaseUrl + id,  data  , { headers });
  }

  getBlogJson() {
    const headers = this.getHeaders();
    return this.http.get(this.blogBaseUrl, { headers } );
  }

  deleteBlogJson(id) {
    const headers = this.getHeaders();
    return this.http.delete(this.blogBaseUrl + id, { headers });
  }

  addDraftBlog(data) {
    const headers = this.getHeaders();
    return this.http.post(this.draftBlogBaseUrl,  data  , { headers });
  }

  updateDraftBlog(data, id) {
    const headers = this.getHeaders();
    return this.http.put(this.draftBlogBaseUrl + id,  data  , { headers });
  }

  getDraftBlog() {
    const headers = this.getHeaders();
    return this.http.get(this.draftBlogBaseUrl, { headers } );
  }

  deleteDraftBlog(id) {
    const headers = this.getHeaders();
    return this.http.delete(this.draftBlogBaseUrl + id, { headers });
  }


  getPicJson() {
    const headers = this.getHeaders();
    return this.http.get(this.picUrl, { headers } );
  }


  addPicJson(data) {
    const headers = this.getHeaders();
    return this.http.post(this.picUrl,  data  , { headers });
  }

  updatePicJson(data, id) {
    const headers = this.getHeaders();
    return this.http.put(this.picUrl + id,  data  , { headers });
  }

}




