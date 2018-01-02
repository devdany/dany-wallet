import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaviComponent } from './navi/navi.component';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthService} from './shared/auth.service';
import { SignupComponent } from './signup/signup.component';
import {Web3Service} from './shared/web3.service';
import {UserService} from './shared/user.service';
import {TokenService} from './shared/token.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JwtModule.forRoot({
      config : {
        tokenGetter : () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:3000']
      }
    })
  ],
  declarations: [NaviComponent, LoginComponent, SignupComponent],
  exports: [NaviComponent, LoginComponent, SignupComponent],
  providers: [AuthService, Web3Service, UserService, TokenService]
})
export class CoreModule { }
