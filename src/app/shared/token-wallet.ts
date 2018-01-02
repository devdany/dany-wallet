import {User} from './user';
import {Token} from './token';

export interface TokenWallet {
  user: User;
  tokens: [
    {
      token: Token,
      balance: number
    }];
}
