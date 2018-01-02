import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {BsModalRef} from 'ngx-bootstrap';
import {Token} from '../../shared/token';
import {TokenService} from '../../core/shared/token.service';
import {UserService} from '../../core/shared/user.service';
import {User} from '../../shared/user';


@Component({
  selector: 'dw-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.css']
})
export class AddTokenComponent implements OnInit {
  errorMessage: string;
  checkResult = false;
  address: string;
  set = false;
  token: Token = {
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
    issuanceCount: '',
  };
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

  constructor(public modal: BsModalRef, private http: HttpClient, private tokenService: TokenService, private userService: UserService) {
  }

  ngOnInit() {
  }
  checkAddr(address: string) {
    this.loginUser = this.userService.getLoginUser();
    for (let i = 0; i < this.loginUser.tokens.length; i++) {
      if (this.loginUser.tokens[i].token.address === address ) {
        alert('이미 저장된 토큰입니다!');
        return;
      }
    }
    const apiUrl = 'https://api.ethplorer.io/getTokenInfo/' + address + '?apiKey=freekey';
    console.log(apiUrl);
    this.http.get(apiUrl).catch(err => {
      console.error('error:' + err);
      this.errorMessage = err;
      return Observable.of({});
    }).subscribe((v: Token) => {
      this.token = v;
      console.log(this.token);
      this.checkResult = true;
      this.set = true;
    });
  }
  addToken() {
    for (let i = 0; i < this.loginUser.tokens.length; i++) {
      if (this.loginUser.tokens[i].token.address === this.token.address ) {
        alert('이미 저장된 토큰입니다!');
        return;
      }
    }
    this.tokenService.addToken(this.token).then(v => {
      v.subscribe((val: User) => {
        localStorage.setItem('tokenUser', JSON.stringify(val));
        window.location.reload();
      });
    }, error => {
      console.error(error);
    });
  }
}
