import { Injectable } from '@angular/core';
import {Token} from "../../shared/token";

@Injectable()
export class RpcService {

  constructor() { }

  transfer(from: string, token: Token, to: string, gas: number, gasPrice: number, value: number) {
    let params : [{
      'from': '',
      'to': '',
      'gas': '',
      'gasPrice': '',
      'value': '',
      'data': ''
    }];
  }

}
