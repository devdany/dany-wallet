import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/shared/auth.service';
import {Web3Service} from '../../core/shared/web3.service';
import {User} from '../../shared/user';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Account} from '../../shared/account';


@Component({
  selector: 'dw-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  isOpen = false;
  loginUser: User = {
    _id: 0,
    email: ''
  };
  account: Account = {
    address: '',
    balance: 0
  };


  constructor(private auth: AuthService, private web3Service: Web3Service, private jwt: JwtHelperService) {}

  ngOnInit() {}

  infoOpen() {
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
      this.account = res;
    });

    this.isOpen = true;
  }

  infoClose() {
    this.isOpen = false;
  }
}


