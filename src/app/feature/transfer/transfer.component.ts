import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Web3Service} from '../../core/shared/web3.service';
import {User} from '../../shared/user';
import {AuthService} from '../../core/shared/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {NgForm} from '@angular/forms';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'dw-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  isOpen = false;
  loginUser: User = {
    _id: 0,
    email: ''
  };
  from: string;
  @ViewChild(NgForm) transferForm: NgForm;
  errorMessage: string;

  constructor(@Inject(DOCUMENT) private document: Document, private web3Service: Web3Service, private auth: AuthService, private jwt: JwtHelperService) {}
  ngOnInit() {}
  transferOpen() {
    this.isOpen = true;
  }
  transferClose() {
    this.isOpen = false;
  }

  transfer(receiver: string, amount: number, gasLimit: number, gasPrice: number) {
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
    if (this.transferForm.form.controls.receiver.errors) {
      this.errorMessage = '받을 주소를 입력해주세요!';
      return;
    }
    if (this.transferForm.form.controls.amount.errors) {
      this.errorMessage = '보낼 금액을 입력해주세요!';
      return;
    }
    if (this.errorMessage) {
      this.errorMessage = undefined;
    }
    this.web3Service.getAddress(this.loginUser._id).then(res => {
      this.from = res;
      this.web3Service.transferEther(this.from, receiver, gasLimit, gasPrice, amount).then(result => {
        window.location.reload();
        alert('전송 완료' + '\n' + result.transactionHash );
      });
    });
  }
}
