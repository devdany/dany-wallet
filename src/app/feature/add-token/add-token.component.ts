import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../core/shared/auth.service';
import {User} from '../../shared/user';
import {Account} from '../../shared/account';
import {Web3Service} from '../../core/shared/web3.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs/Observable';
import {BsModalRef} from 'ngx-bootstrap';
import {Jsonp} from '@angular/http';


@Component({
  selector: 'dw-add-token',
  templateUrl: './add-token.component.html',
  styleUrls: ['./add-token.component.css']
})
export class AddTokenComponent implements OnInit {
  errorMessage: string
  checkResult = false;
  address: string;
  loginUser: User = {
    _id: 0,
    email: ''
  };
  account: Account = {
    address: '',
    balance: 0
  };

  constructor(public modal: BsModalRef, private http: HttpClient, private auth: AuthService, private web3Service: Web3Service, private jwt: JwtHelperService, private jsonp: Jsonp) {
  }

  ngOnInit() {
  }

  checkAddr(address: string) {
    if (this.auth.getLoginUser() === undefined) {
      const token = localStorage.getItem('access_token');
      const decoded = this.jwt.decodeToken(token);
      this.loginUser = {
        _id: decoded._id,
        email: decoded.email,
      };
    } else {
      this.loginUser = this.auth.getLoginUser();
    }
    this.web3Service.getAccount(this.loginUser._id).then(res => {
      const apiUrl = 'https://api.tokenbalance.com/token/' + address + '/' + res.address;
      console.log(apiUrl);
      this.jsonp.request(apiUrl).catch(err => {
        console.error('error:' + err);
        this.errorMessage = err;
        return Observable.of({});
      }).do(console.log).subscribe(v => {
        console.log(v);
      });
    });

  }


  addToken() {

  }

}
