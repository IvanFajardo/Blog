import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  baseURL = 'http://localhost:5000/users/';
  constructor(private http: HttpClient) { }

  config(methodStr, id = '', data) {
    let options = {
      method: methodStr ,
      headers: {
        'Content-Type': 'application/json'
      },
        body: ((methodStr === 'DELETE') ? null : JSON.stringify(data) ) // DELETE request must have a body of null
    };
    const result = from(fetch(this.baseURL + id, options));
    return result.subscribe((response) => response.json);

  }

  add(data) {
    const method = 'POST';
    const add = this.config(method, '', data);
  }

  get() {
    return this.http.get<any>(this.baseURL);
  }
}




  

