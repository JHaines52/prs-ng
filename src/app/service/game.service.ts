import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL: string = 'http://localhost:8080/api/play';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  playGame(userChoice: string): Observable<any> {
    return this.http.post(URL, userChoice );
  }
}

