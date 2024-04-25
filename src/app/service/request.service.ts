import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request';

const URL: string = 'http://localhost:8080/api/requests';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {
  }

  getAllRequests(): Observable<Request[]> {
    return this.http.get(URL + "/") as Observable<Request[]>;
  }

  getRequestInReview(userid: number): Observable<Request[]> {
    return this.http.get(URL + "/reviews/" + userid) as Observable<Request[]>;
  }

  getRequestById(id: number): Observable<Request> {
    return this.http.get(URL + '/' + id) as Observable<Request>;
  }

  getRequestsByUserId(id: number): Observable<Request[]>{
    return this.http.get(URL+ "/user/"+ id) as Observable<Request[]>;
  }

  approveRequest(id: number): Observable<Request>{
    return this.http.post(URL+"/approve/"+id, null) as Observable<Request>;
  }

  rejectRequest(id: number): Observable<Request>{
    return this.http.post(URL+"/reject/"+id, null) as Observable<Request>;
  }

  createRequest(request: Request): Observable<Request> {

    return this.http.post(URL, request) as Observable<Request>;
  }

  updateRequest(request: Request): Observable<Request> {
    return this.http.put(URL + "/" + request.id, request) as Observable<Request>;
  }

  deleteRequest(id: number): Observable<boolean> {
    return this.http.delete(URL+"/"+ id) as Observable<boolean>;
  }

  submitRequestForReview(id: number): Observable<Request> {
    return this.http.post(URL + '/review/' + id, null) as Observable<Request>;
  }
  
}



