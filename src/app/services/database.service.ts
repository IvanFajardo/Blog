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
  config: any;

  constructor(private http: HttpClient, configService: ConfigService) { 
    this.config = configService.getConfigs();
    this.baseUrl = this.config.baseUrl;
    this.blogBaseUrl = this.config.blogBaseUrl;
  }

  getHeaders() {
    const headers = new HttpHeaders();
    headers.set('Content-type', 'application/json');
    return headers;
  }

  getJson() {
    const headers = this.getHeaders();
    return this.http.get(this.baseUrl, { headers } );
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

  addJsonBlog(data) {
    const headers = this.getHeaders();
    return this.http.post(this.blogBaseUrl,  data  , { headers });
  }

  getBlogJson() {
    const headers = this.getHeaders();
    return this.http.get(this.blogBaseUrl, { headers } );
  }

  deleteBlogJson(id) {
    const headers = this.getHeaders();
    return this.http.delete(this.blogBaseUrl + id, { headers });
  }
}




