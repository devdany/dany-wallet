import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {Account} from '../../shared/account';
import {Transfer} from '../../shared/transfer';


@Injectable()
export class Web3Service {
  web3 = new Web3('http://localhost:8545');
  account: Account = {
    address: '',
    balance: 0
  };
  transfer_object: Transfer = {
    from: '',
    to: '',
    value: 0,
    gas: 50000,
    gasPrice: 30
  };
  constructor() { }

  getAddress(id: number) {
    let address: string;
    return this.web3.eth.getAccounts().then(res => {
      address = res[id];
      return address;
    });
  }
  getBalance(address: string) {
    let balance: number;
    return this.web3.eth.getBalance(address).then(res => {
      balance = this.web3.utils.fromWei(res, 'ether');
      return balance;
    });
  }
  getAccount(id: number) {
    return this.getAddress(id).then(addr => {
      this.account.address = addr;
      this.getBalance(addr).then(balance => {
        this.account.balance = balance;
      });
      return this.account;
    });
  }
  transferEther(from: string, to: string, gas: number, gasPrice: number, value: number) {
    this.transfer_object.from = from;
    this.transfer_object.to = to;
    if (gas !== undefined) {
      this.transfer_object.gas = gas;
    }
    if (gasPrice !== undefined) {
      this.transfer_object.gasPrice = gasPrice * 1000000000;
    }
    this.transfer_object.value = this.web3.utils.toWei(value, 'ether');
    return this.web3.eth.sendTransaction(this.transfer_object).then(res => {
      return res;
    });
  }
}
