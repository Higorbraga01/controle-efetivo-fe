import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private _user: User;

  get user(): User {
    return this._user;
  }

  set user(user: User) {
    this._user = user;
  }

  constructor(
    protected http: HttpClient,
    @Inject('API_ENDPOINT') private endpoint: string
  ) {}

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.endpoint}/user`);
  }
}
