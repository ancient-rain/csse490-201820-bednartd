import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Comment } from '../models/comment';
import 'rxjs/add/operator/catch';

@Injectable()
export class CommentService {
  private commentsUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) { }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl)
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error'));
  }

  removeComment(id: String): Observable<Comment[]> {
    return this.http.delete<Comment[]>(
      `${this.commentsUrl}/${id}`)
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server error'));
  }

  addComment(body: Object): Observable<Comment[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    // ...using post request
    return this.http.post<Comment[]>(this.commentsUrl, body, { headers })
      // ...errors if any
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  updateComment(body: Object): Observable<Comment[]> {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put<Comment[]>(
      `${this.commentsUrl}/${body['id']}`, body, { headers })
      .catch((error: any) =>
        Observable.throw(error.json().error || 'Server Error'));
  }
}
