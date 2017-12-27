import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';
import {FeatureModule} from './feature/feature.module';
import {SignupComponent} from "./core/signup/signup.component";
import {AddTokenComponent} from "./feature/add-token/add-token.component";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    FeatureModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, AddTokenComponent]
})
export class AppModule { }
