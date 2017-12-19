import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  token: Subject<{email: string}>;
  private handleToken = (token: string) => {
    localStorage.setItem('access_token', token);
    this.token.next(this.jwt.decodeToken(token));
  }
  constructor(private http: HttpClient, private jwt: JwtHelperService) {
    const token = jwt.tokenGetter();
    let decode = undefined;
    if (token) {
      decode = jwt.decodeToken(token);
    }
    this.token = new BehaviorSubject(decode);
  }
  login(email: string, password: string) {
    return this.http.post<{token}>('http://localhost:3000/auth/login', {
      email, password
    })
      .map(v => v.token)
      .do(this.handleToken);
  }

  signOut() {
    localStorage.removeItem('access_token');
    this.token.next(undefined);
  }
}
