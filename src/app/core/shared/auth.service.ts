import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Subject} from 'rxjs/Subject';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {User} from '../../shared/user';




@Injectable()
export class AuthService {
  token: Subject<{email: string}>;
  public loginUser: User;
  private handleToken = (token: string) => {
    localStorage.setItem('access_token', token);
    const decoded = this.jwt.decodeToken(token);
    this.loginUser = {
      _id: decoded._id,
      email: decoded.email,
    };
    this.token.next(this.jwt.decodeToken(token));
  }
  constructor(private http: HttpClient, private jwt: JwtHelperService) {
    const token = jwt.tokenGetter();
    let decode = undefined;
    if (token ) {
      decode = jwt.decodeToken(token);
    }
    this.token = new BehaviorSubject(decode);
  }
  login(email: string, password: string): Observable<string> {
    return this.http.post<{token: string}>('http://localhost:3000/api/auth/login', {
      email, password
    })
      .map(v => v.token)
      .do(this.handleToken);
  }

  signOut() {
    localStorage.removeItem('access_token');
    this.token.next(undefined);
  }
  signUp(email, password) {
    return this.http.post('http://localhost:3000/api/auth/register', {
      email, password
    })
      .do(console.log);
  }
  getLoginUser() {
    return this.loginUser;
  }
}
