import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Player } from './player';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiURL = 'http://localhost:3000';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(this.apiURL + '/players/');
  }

  create(player: Player) {
    return this.httpClient.post(
      this.apiURL + '/players/create',
      JSON.stringify(player),
      this.httpOptions
    );
  }

  find(id: number) {
    return this.httpClient.get(this.apiURL + '/players/' + id);
  }

  update(id: number, player: Player) {
    return this.httpClient.put(
      this.apiURL + '/players/' + id,
      JSON.stringify(player),
      this.httpOptions
    );
  }

  delete(id: number) {
    return this.httpClient.delete(
      this.apiURL + '/players/' + id,
      this.httpOptions
    );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
