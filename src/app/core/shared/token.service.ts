import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Token} from '../../shared/token';
import {User} from '../../shared/user';
import {UserService} from './user.service';
import {Web3Service} from './web3.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TokenService {
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
  tokenProp: Token;
  email: string;
  balance;

  constructor(private http: HttpClient, private userService: UserService, private web3Service: Web3Service) { }

  addToken(token: Token) {
    this.loginUser = this.userService.getLoginUser();
    const email = this.loginUser.email;
    this.tokenProp = token;
    return this.web3Service.getAddress(this.loginUser._id).then(addr => {
      return this.web3Service.getTokenBalance(addr, token.address).then(balance => {
        return this.http.post('http://localhost:3000/api/token/add', {
          email, token, balance
        });
      });
    });
  }
}
