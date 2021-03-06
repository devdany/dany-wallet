import {Token} from './token';

export interface User {
  _id: number;
  email: string;
  tokens: [
    {
      token: Token,
      balance: number
    }
    ];
}
