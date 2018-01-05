import { Injectable } from '@angular/core';
import Web3 from 'web3';
import {Account} from '../../shared/account';
import {Transfer} from '../../shared/transfer';
import {Token} from "../../shared/token";


@Injectable()
export class Web3Service {
  web3 = new Web3('http://52.78.181.207:8806');
  //web3 = new Web3('http://localhost:8545');
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
  transferCoin(from: string, token: Token, to: string, gas: number, gasPrice: number, value: number) {
    if (token.symbol === 'ETH') {
      this.transfer_object.from = from;
      this.transfer_object.to = to;
      if (gas !== undefined) {
        this.transfer_object.gas = gas;
      }
      if (gasPrice !== undefined) {
        this.transfer_object.gasPrice = gasPrice * 1000000000;
      }
      this.transfer_object.value = value * 1000000000000000000;
      console.log(this.transfer_object);
      return this.web3.eth.sendTransaction(this.transfer_object).then(res => {
        console.log(res);
        return res;
      });
      //토큰의 경우
    } else {
      const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":false,"stateMutability":"nonpayable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_owner","type":"address"},{"indexed":true,"name":"_spender","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Approval","type":"event"}];
      console.log(gas, gasPrice);
      const decimal = Number(token.decimals);
      const contract = new this.web3.eth.Contract(abi, token.address, {from: from, gas: gas, gasPrice: gasPrice * 1000000000});
      return contract.methods.transfer(to, value * Math.pow(10, decimal)).send().then(res => {
        console.log(res);
        return res;
      });
      /*console.log(this.web3.utils.toWei(value, 'ether'));
      return this.web3.eth.sendTransaction({
        to: token.address,
        data: '0xcae9ca51000000000000000000000000' + from.substring(2) + to.substring(2) + value
      }).then(res => {
        return this.web3.utils.toBN(res).toString();
      });*/
    }
  }
  getTokenBalance(accountAddr: string, tokenAddr: string) {
    const data = '0x70a08231000000000000000000000000' + accountAddr.substring(2);
    return this.web3.eth.call({
      to: tokenAddr,
      data: data
    }).then(res => {
      return this.web3.utils.fromWei((this.web3.utils.toBN(res)), 'ether');
    });
  }
}
