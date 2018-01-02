import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Web3Service} from '../../core/shared/web3.service';
import {User} from '../../shared/user';
import {Account} from '../../shared/account';
import {UserService} from '../../core/shared/user.service';

@Component({
  selector: 'dw-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  isOpen = false;
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
  account: Account = {
    address: '',
    balance: 0
  };

  @Output()
  onAddToken = new EventEmitter();

  constructor(private web3Service: Web3Service, private userService: UserService) {
  }

  ngOnInit() {}

  infoOpen() {
    const tokenUser = localStorage.getItem('tokenUser');
    if (tokenUser) {
      this.loginUser = JSON.parse(tokenUser).user;
    }else {
      this.loginUser = this.userService.getLoginUser();
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


