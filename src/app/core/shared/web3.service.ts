import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {Account} from '../../shared/account';
import {Transfer} from '../../shared/transfer';


@Injectable()
export class Web3Service {
  web3 = new Web3('http://52.78.181.207:8806');
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
    return this.web3.eth.getAccounts().then(res => {
      return  res[id];
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
  transferCoin(from: string, cate: string, to: string, gas: number, gasPrice: number, value: number) {
    if (cate === 'ETH') {
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
        console.log(res);
        return res;
      });
    } else {

    }
  }
  getTokenBalance(accountAddr: string, tokenAddr: string) {
    const data = '0x70a08231000000000000000000000000' + accountAddr.substring(2);
    return this.web3.eth.call({
      to: tokenAddr,
      data: data
    }).then(res => {
      console.log(res);
      return this.web3.utils.fromWei((this.web3.utils.toBN(res)), 'ether');
    });
  }
}
