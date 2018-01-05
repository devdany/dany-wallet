import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Web3Service} from '../../core/shared/web3.service';
import {User} from '../../shared/user';
import {NgForm} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {UserService} from '../../core/shared/user.service';
import {Token} from "../../shared/token";

@Component({
  selector: 'dw-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
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
  from: string;
  @ViewChild(NgForm) transferForm: NgForm;
  errorMessage: string;

  constructor(@Inject(DOCUMENT) private document: Document, private web3Service: Web3Service, private userService: UserService) {
  }

  ngOnInit() {
  }

  transferOpen() {
    const tokenUser = localStorage.getItem('tokenUser');
    if (tokenUser) {
      this.loginUser = JSON.parse(tokenUser).user;
    }else {
      this.loginUser = this.userService.getLoginUser();
    }
    this.isOpen = true;
  }

  transferClose() {
    this.isOpen = false;
  }

  transfer(receiver: string, cate: string, amount: number, gasLimit: number, gasPrice: number) {
    this.loginUser = this.userService.getLoginUser();
    if (this.transferForm.form.controls.receiver.errors) {
      this.errorMessage = '받을 주소를 입력해주세요!';
      return;
    }
    if (this.transferForm.form.controls.amount.errors) {
      this.errorMessage = '보낼 금액을 입력해주세요!';
      return;
    }
    if (this.transferForm.form.controls.cate.errors) {
      this.errorMessage = '보낼 코인을 선택하세요!';
      return;
    }
    let token: Token;
    if (cate !== 'ETH') {
      for (let i = 0; i < this.loginUser.tokens.length; i++) {
        if (this.loginUser.tokens[i].token.symbol === cate) {
          token = this.loginUser.tokens[i].token;
          break;
        }
      }
    } else {
      token = {
        address: '',
        totalSupply: '',
        name: '',
        symbol: 'ETH',
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
      };
    }
    if (this.errorMessage) {
      this.errorMessage = undefined;
    }
    this.web3Service.getAddress(this.loginUser._id).then(res => {
      this.from = res;
      this.web3Service.transferCoin(this.from, token, receiver, gasLimit, gasPrice, amount).then(result => {
        //window.location.reload();
        alert('전송 완료');
      });
    });
  }
}
