import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable {
    return this.httpClient
      .get(this.apiURL + '/posts/')
      .pipe(catchError(this.errorHandler));
  }

  create(post: Post): Observable<T> {
    return this.httpClient
      .post(
        this.apiURL + '/posts/create',
        JSON.stringify(post),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }
}
