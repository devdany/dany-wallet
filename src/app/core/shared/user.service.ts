import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {User} from '../../shared/user';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class UserService {
  loginUser: User = {
      _id: 0,
      email: '',
      tokens: [
        {
          token: {
            address: '',
            totalSupply: '',
            name: '',
            symbol: '',
            decimals: '',
            price: {
              rate: '',
              currency: '',
              diff: '',
              ts: '',
            },
            owner: '',
            countOps: '',
            totalIn: '',
            totalOut: '',
            holdersCount: '',
            issuanceCount: ''
          },
          balance: 0
        }]
  };
  constructor(private auth: AuthService, private jwt: JwtHelperService) { }
  getLoginUser(): User {
    if (this.auth.getLoginUser() === undefined) {
      const token = localStorage.getItem('access_token');
      const decoded = this.jwt.decodeToken(token);
      this.loginUser = {
        _id: decoded._id,
        email: decoded.email,
        tokens: decoded.tokens
      };
    } else {
      this.loginUser = this.auth.getLoginUser();
    }
    return this.loginUser;
  }
}
