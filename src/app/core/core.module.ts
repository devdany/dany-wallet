import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NaviComponent } from './navi/navi.component';
import {SharedModule} from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import {AuthService} from './shared/auth.service';

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
  declarations: [NaviComponent, LoginComponent],
  exports: [NaviComponent, LoginComponent],
  providers: [AuthService]
})
export class CoreModule { }
